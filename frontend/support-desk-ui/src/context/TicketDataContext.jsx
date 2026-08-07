import { createContext, useCallback, useContext, useMemo, useReducer } from 'react';
import { fetchPagedTickets, updateTicket } from '../services/api.js';
import { useAuth } from './AuthContext.jsx';

const TicketDataContext = createContext(null);

const initialState = {
  items: [],
  selectedTicketId: '',
  loading: false,
  error: '',
  cacheMessage: 'No cached page loaded yet.',
  updatingId: '',
  cache: {},
  pageInfo: {
    page: 0,
    size: 5,
    sortBy: 'createdAt',
    direction: 'desc',
    totalPages: 0,
    totalElements: 0
  },
  filters: {
    searchText: '',
    statusFilter: 'ALL'
  }
};

function makeCacheKey(params) {
  return `${params.page}|${params.size}|${params.sortBy}|${params.direction}`;
}

function replaceTicket(items, updatedTicket) {
  const updatedId = updatedTicket.id || updatedTicket._id;
  return items.map((ticket) => {
    const currentId = ticket.id || ticket._id;
    return currentId === updatedId ? updatedTicket : ticket;
  });
}

function replaceTicketInCache(cache, updatedTicket) {
  const nextCache = {};

  Object.entries(cache).forEach(([key, pageData]) => {
    nextCache[key] = {
      ...pageData,
      content: replaceTicket(pageData.content ?? [], updatedTicket)
    };
  });

  return nextCache;
}

function toPageInfo(data, fallback) {
  return {
    page: data.number ?? fallback.page,
    size: data.size ?? fallback.size,
    sortBy: fallback.sortBy,
    direction: fallback.direction,
    totalPages: data.totalPages ?? 0,
    totalElements: data.totalElements ?? 0
  };
}

function ticketReducer(state, action) {
  switch (action.type) {
    case 'LOAD_START':
      return {
        ...state,
        loading: true,
        error: '',
        cacheMessage: action.fromCache ? 'Reading from cache...' : 'Fetching from backend...'
      };

    case 'LOAD_SUCCESS': {
      const items = action.data.content ?? [];
      const selectedStillVisible = items.some(
        (ticket) => (ticket.id || ticket._id) === state.selectedTicketId
      );
      const selectedTicketId = selectedStillVisible
        ? state.selectedTicketId
        : items[0]?.id || items[0]?._id || '';
      const nextCache = action.fromCache
        ? state.cache
        : { ...state.cache, [action.cacheKey]: action.data };

      return {
        ...state,
        items,
        selectedTicketId,
        loading: false,
        error: '',
        pageInfo: toPageInfo(action.data, action.params),
        cache: nextCache,
        cacheMessage: action.fromCache ? 'Loaded from cache.' : 'Fetched from backend and cached.'
      };
    }

    case 'LOAD_ERROR':
      return {
        ...state,
        loading: false,
        error: action.message,
        cacheMessage: 'Could not load data.'
      };

    case 'SET_SEARCH_TEXT':
      return {
        ...state,
        filters: { ...state.filters, searchText: action.value }
      };

    case 'SET_STATUS_FILTER':
      return {
        ...state,
        filters: { ...state.filters, statusFilter: action.value }
      };

    case 'SELECT_TICKET':
      return {
        ...state,
        selectedTicketId: action.ticketId
      };

    case 'OPTIMISTIC_UPDATE':
      return {
        ...state,
        updatingId: action.ticket.id || action.ticket._id,
        items: replaceTicket(state.items, action.ticket),
        cache: replaceTicketInCache(state.cache, action.ticket)
      };

    case 'UPDATE_SUCCESS':
      return {
        ...state,
        updatingId: '',
        items: replaceTicket(state.items, action.ticket),
        cache: replaceTicketInCache(state.cache, action.ticket),
        cacheMessage: 'Optimistic update confirmed by backend.'
      };

    case 'ROLLBACK_UPDATE':
      return {
        ...state,
        updatingId: '',
        items: replaceTicket(state.items, action.ticket),
        cache: replaceTicketInCache(state.cache, action.ticket),
        error: action.message,
        cacheMessage: 'Optimistic update rolled back.'
      };

    default:
      return state;
  }
}

function toUpdatePayload(ticket) {
  return {
    title: ticket.title,
    description: ticket.description,
    category: ticket.category,
    priority: ticket.priority,
    status: ticket.status
  };
}

export function TicketDataProvider({ children }) {
  const { token } = useAuth();
  const [state, dispatch] = useReducer(ticketReducer, initialState);

  const loadTicketsPage = useCallback(
    async (overrides = {}) => {
      const params = {
        page: overrides.page ?? state.pageInfo.page,
        size: overrides.size ?? state.pageInfo.size,
        sortBy: overrides.sortBy ?? state.pageInfo.sortBy,
        direction: overrides.direction ?? state.pageInfo.direction
      };

      const cacheKey = makeCacheKey(params);
      const cachedPage = state.cache[cacheKey];

      if (cachedPage && !overrides.force) {
        dispatch({
          type: 'LOAD_SUCCESS',
          data: cachedPage,
          params,
          cacheKey,
          fromCache: true
        });
        return;
      }

      dispatch({ type: 'LOAD_START', fromCache: false });

      try {
        const data = await fetchPagedTickets(token, params);
        dispatch({
          type: 'LOAD_SUCCESS',
          data,
          params,
          cacheKey,
          fromCache: false
        });
      } catch (error) {
        dispatch({
          type: 'LOAD_ERROR',
          message: error.message || 'Could not load paged tickets.'
        });
      }
    },
    [state.cache, state.pageInfo, token]
  );

  const refreshTickets = useCallback(() => {
    return loadTicketsPage({ force: true });
  }, [loadTicketsPage]);

  const setSearchText = useCallback((value) => {
    dispatch({ type: 'SET_SEARCH_TEXT', value });
  }, []);

  const setStatusFilter = useCallback((value) => {
    dispatch({ type: 'SET_STATUS_FILTER', value });
  }, []);

  const selectTicket = useCallback((ticketId) => {
    dispatch({ type: 'SELECT_TICKET', ticketId });
  }, []);

  const changeTicketStatus = useCallback(
    async (ticketId, nextStatus) => {
      const currentTicket = state.items.find((t) => (t.id || t._id) === ticketId);

      if (!currentTicket || currentTicket.status === nextStatus) {
        return;
      }

      const optimisticTicket = { ...currentTicket, status: nextStatus };
      dispatch({ type: 'OPTIMISTIC_UPDATE', ticket: optimisticTicket });

      try {
        const savedTicket = await updateTicket(ticketId, token, toUpdatePayload(optimisticTicket));
        dispatch({ type: 'UPDATE_SUCCESS', ticket: savedTicket });
      } catch (error) {
        dispatch({
          type: 'ROLLBACK_UPDATE',
          ticket: currentTicket,
          message: error.message || 'Could not update ticket status. Reverted local change.'
        });
      }
    },
    [state.items, token]
  );

  // Client-side filtering logic over the loaded items page
  const visibleTickets = useMemo(() => {
    return state.items.filter((ticket) => {
      const search = state.filters.searchText.toLowerCase();
      const status = state.filters.statusFilter;

      const matchesSearch =
        !search ||
        (ticket.title || '').toLowerCase().includes(search) ||
        (ticket.category || '').toLowerCase().includes(search) ||
        String(ticket.id || ticket._id || '').toLowerCase().includes(search);

      const matchesStatus = status === 'ALL' || ticket.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [state.items, state.filters]);

  const selectedTicket = useMemo(() => {
    return (
      visibleTickets.find((ticket) => (ticket.id || ticket._id) === state.selectedTicketId) ??
      visibleTickets[0] ??
      null
    );
  }, [state.selectedTicketId, visibleTickets]);

  const value = useMemo(
    () => ({
      ...state,
      visibleTickets,
      selectedTicket,
      loadTicketsPage,
      refreshTickets,
      setSearchText,
      setStatusFilter,
      selectTicket,
      changeTicketStatus
    }),
    [
      state,
      visibleTickets,
      selectedTicket,
      loadTicketsPage,
      refreshTickets,
      setSearchText,
      setStatusFilter,
      selectTicket,
      changeTicketStatus
    ]
  );

  return <TicketDataContext.Provider value={value}>{children}</TicketDataContext.Provider>;
}

export function useTicketData() {
  const value = useContext(TicketDataContext);

  if (!value) {
    throw new Error('useTicketData must be used inside TicketDataProvider');
  }

  return value;
}