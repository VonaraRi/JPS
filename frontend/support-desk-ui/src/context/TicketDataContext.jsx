import { createContext, useCallback, useContext, useMemo, useReducer } from 'react';
import { fetchTickets, updateTicket } from '../services/api.js';
import { useAuth } from './AuthContext.jsx';

const TicketDataContext = createContext(null);

const initialState = {
  tickets: [],
  selectedTicketId: '',
  loading: false,
  error: '',
  updatingId: '',
  cache: {},
  pageInfo: {
    page: 1,
    size: 10,
    sortBy: 'createdAt',
    direction: 'desc',
    totalPages: 1,
    totalElements: 0
  },
  filters: {
    searchText: '',
    status: ''
  }
};

function replaceTicket(items, updatedTicket) {
  if (!Array.isArray(items)) return [];
  return items.map((ticket) => 
    (ticket.id === updatedTicket.id || ticket._id === updatedTicket._id) ? updatedTicket : ticket
  );
}

function ticketReducer(state, action) {
  switch (action.type) {
    case 'LOAD_START':
      return {
        ...state,
        loading: true,
        error: ''
      };

    case 'LOAD_SUCCESS': {
      // Handles both array direct response or paginated objects ({ content, pageInfo })
      const rawTickets = Array.isArray(action.payload)
        ? action.payload
        : action.payload?.content ?? action.payload?.tickets ?? [];

      const selectedStillVisible = rawTickets.some(
        (t) => (t.id || t._id) === state.selectedTicketId
      );
      
      const firstId = rawTickets[0]?.id || rawTickets[0]?._id || '';
      const selectedTicketId = selectedStillVisible ? state.selectedTicketId : firstId;

      return {
        ...state,
        loading: false,
        error: '',
        tickets: rawTickets,
        selectedTicketId,
        pageInfo: action.payload?.pageInfo ?? state.pageInfo
      };
    }

    case 'LOAD_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload || action.message || 'Could not load tickets.'
      };

    case 'SET_SEARCH_TEXT':
      return {
        ...state,
        filters: { ...state.filters, searchText: action.payload ?? action.value ?? '' }
      };

    case 'SET_STATUS_FILTER':
      return {
        ...state,
        filters: { ...state.filters, status: action.payload ?? action.value ?? '' }
      };

    case 'SELECT_TICKET':
      return {
        ...state,
        selectedTicketId: action.payload ?? action.ticketId ?? ''
      };

    case 'OPTIMISTIC_UPDATE':
      return {
        ...state,
        updatingId: action.ticket.id || action.ticket._id,
        tickets: replaceTicket(state.tickets, action.ticket)
      };

    case 'UPDATE_SUCCESS':
      return {
        ...state,
        updatingId: '',
        tickets: replaceTicket(state.tickets, action.ticket)
      };

    case 'ROLLBACK_UPDATE':
      return {
        ...state,
        updatingId: '',
        tickets: replaceTicket(state.tickets, action.ticket),
        error: action.message || 'Optimistic update failed and was rolled back.'
      };

    default:
      return state;
  }
}

export function TicketDataProvider({ children }) {
  const { token } = useAuth();
  const [state, dispatch] = useReducer(ticketReducer, initialState);

  const loadStart = useCallback(() => {
    dispatch({ type: 'LOAD_START' });
  }, []);

  const loadSuccess = useCallback((data) => {
    dispatch({ type: 'LOAD_SUCCESS', payload: data });
  }, []);

  const loadError = useCallback((errorMessage) => {
    dispatch({ type: 'LOAD_ERROR', payload: errorMessage });
  }, []);

  const setSearchText = useCallback((value) => {
    dispatch({ type: 'SET_SEARCH_TEXT', payload: value });
  }, []);

  const setStatusFilter = useCallback((value) => {
    dispatch({ type: 'SET_STATUS_FILTER', payload: value });
  }, []);

  const selectTicket = useCallback((ticketId) => {
    dispatch({ type: 'SELECT_TICKET', payload: ticketId });
  }, []);

  // Fetch Tickets Action
  const fetchTicketData = useCallback(async (customFilters = {}) => {
    if (!token) return;
    loadStart();
    try {
      const activeFilters = { ...state.filters, ...customFilters };
      const data = await fetchTickets(token, activeFilters);
      loadSuccess(data);
    } catch (err) {
      loadError(err.message || 'Failed to fetch tickets.');
    }
  }, [token, state.filters, loadStart, loadSuccess, loadError]);

  // Optimistic Status Update
  const changeTicketStatus = useCallback(async (ticketId, nextStatus) => {
    const currentTicket = state.tickets.find((t) => (t.id || t._id) === ticketId);
    if (!currentTicket || currentTicket.status === nextStatus) return;

    const optimisticTicket = { ...currentTicket, status: nextStatus };
    dispatch({ type: 'OPTIMISTIC_UPDATE', ticket: optimisticTicket });

    try {
      const savedTicket = await updateTicket(ticketId, token, { status: nextStatus });
      dispatch({ type: 'UPDATE_SUCCESS', ticket: savedTicket });
    } catch (err) {
      dispatch({
        type: 'ROLLBACK_UPDATE',
        ticket: currentTicket,
        message: err.message || 'Could not update ticket. Reverted change.'
      });
    }
  }, [state.tickets, token]);

  // Client-side Filtered List
  const visibleTickets = useMemo(() => {
    if (!Array.isArray(state.tickets)) return [];

    return state.tickets.filter((ticket) => {
      const title = ticket.title || ticket.subject || '';
      const matchesSearch = title.toLowerCase().includes(state.filters.searchText.toLowerCase());
      
      const filterStatus = state.filters.status;
      const matchesStatus = !filterStatus || filterStatus === 'ALL' || ticket.status === filterStatus;

      return matchesSearch && matchesStatus;
    });
  }, [state.tickets, state.filters]);

  const selectedTicket = useMemo(() => {
    return visibleTickets.find((t) => (t.id || t._id) === state.selectedTicketId) ?? visibleTickets[0] ?? null;
  }, [state.selectedTicketId, visibleTickets]);

  const value = useMemo(
    () => ({
      // State
      ...state,
      tickets: state.tickets,
      visibleTickets,
      selectedTicket,
      
      // Actions
      dispatch,
      loadStart,
      loadSuccess,
      loadError,
      setSearchText,
      setStatusFilter,
      selectTicket,
      fetchTicketData,
      changeTicketStatus
    }),
    [
      state,
      visibleTickets,
      selectedTicket,
      loadStart,
      loadSuccess,
      loadError,
      setSearchText,
      setStatusFilter,
      selectTicket,
      fetchTicketData,
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