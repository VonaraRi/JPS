import { useEffect, useState } from 'react';
import ApiInfoBanner from '../components/ApiInfoBanner.jsx';
import TicketFilterPanel from '../components/TicketFilterPanel.jsx';
import TicketList from '../components/TicketList.jsx';
import TicketDetail from '../components/TicketDetail.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';
import LoadingMessage from '../components/LoadingMessage.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useTicketData } from '../context/TicketDataContext.jsx';
import { fetchTickets } from '../services/api.js';

export default function TicketsPage() {
  const { token } = useAuth();

  // 🟢 Consume state and actions from TicketDataContext
  const {
    tickets,
    selectedTicketId,
    loading,
    error,
    filters,
    loadStart,
    loadSuccess,
    loadError,
    setSearchText,
    setStatusFilter,
    selectTicket,
    selectedTicket
  } = useTicketData();

  // Local state for priority filter (since it's UI specific)
  const [priorityFilter, setPriorityFilter] = useState('ALL');

  // Fetch real tickets from backend on load using Context Actions
  useEffect(() => {
    let ignore = false;

    async function loadTickets() {
      if (!token) return;

      try {
        loadStart();
        const data = await fetchTickets(token);

        if (!ignore) {
          loadSuccess(data || []);
        }
      } catch (err) {
        if (!ignore) {
          loadError(err.message || 'Could not load tickets.');
          console.error(err);
        }
      }
    }

    loadTickets();

    return () => {
      ignore = true;
    };
  }, [token, loadStart, loadSuccess, loadError]);

  // Derive filtered tickets list using Context filters + Priority filter
  const filteredTickets = (tickets || []).filter((ticket) => {
    const ticketIdStr = String(ticket.id || ticket._id || '');
    const searchText = filters.searchText || '';
    const statusFilter = filters.statusFilter || filters.status || 'ALL';

    const matchesSearch =
      (ticket.title || '').toLowerCase().includes(searchText.toLowerCase()) ||
      (ticket.category || '').toLowerCase().includes(searchText.toLowerCase()) ||
      ticketIdStr.toLowerCase().includes(searchText.toLowerCase());

    const matchesStatus =
      statusFilter === 'ALL' || statusFilter === '' || ticket.status === statusFilter;

    const matchesPriority =
      priorityFilter === 'ALL' || ticket.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  // Determine current active ticket details
  const activeTicketDetail =
    selectedTicket ||
    filteredTickets.find(
      (t) => (t.id || t._id) === selectedTicketId
    ) ||
    filteredTickets[0] ||
    null;

  return (
    <>
      <ApiInfoBanner />

      <section
        className="card"
        style={{
          marginBottom: '1rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <div>
          <p className="eyebrow">Ticket Management</p>
          <h2 style={{ margin: 0 }}>Support Tickets</h2>
        </div>
      </section>

      <TicketFilterPanel
        searchText={filters.searchText || ''}
        statusFilter={filters.statusFilter || filters.status || 'ALL'}
        priorityFilter={priorityFilter}
        onSearchChange={setSearchText}
        onStatusChange={setStatusFilter}
        onPriorityChange={setPriorityFilter}
      />

      {loading && <LoadingMessage message="Loading support tickets..." />}
      {error && <ErrorMessage message={error} />}

      {!loading && !error && (
        <div className="dashboard-grid">
          <TicketList
            tickets={filteredTickets}
            selectedTicketId={selectedTicketId}
            onSelectTicket={(ticket) => selectTicket(ticket._id || ticket.id)}
          />

          <div>
            <TicketDetail ticket={activeTicketDetail} />
          </div>
        </div>
      )}
    </>
  );
}