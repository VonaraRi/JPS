import { useEffect, useState } from 'react';
import ApiInfoBanner from '../components/ApiInfoBanner.jsx';
import TicketFilterPanel from '../components/TicketFilterPanel.jsx';
import TicketList from '../components/TicketList.jsx';
import TicketDetail from '../components/TicketDetail.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';
import LoadingMessage from '../components/LoadingMessage.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { fetchTickets } from '../services/api.js';

export default function TicketsPage() {
  const { token } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [priorityFilter, setPriorityFilter] = useState('ALL');
  const [selectedTicket, setSelectedTicket] = useState(null);

  // Fetch real tickets from backend on load
  useEffect(() => {
    let ignore = false;

    async function loadTickets() {
      if (!token) return;

      try {
        setLoading(true);
        setError('');
        const data = await fetchTickets(token);

        if (!ignore) {
          setTickets(data || []);
          if (data && data.length > 0) {
            setSelectedTicket(data[0]); // Select first real ticket by default
          }
        }
      } catch (err) {
        if (!ignore) {
          setError(err.message || 'Could not load tickets.');
          console.error(err);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadTickets();

    return () => {
      ignore = true;
    };
  }, [token]);

  // Filter backend tickets
  const filteredTickets = tickets.filter((ticket) => {
    const ticketIdStr = String(ticket.id || ticket._id || '');
    const matchesSearch =
      (ticket.title || '').toLowerCase().includes(searchText.toLowerCase()) ||
      (ticket.category || '').toLowerCase().includes(searchText.toLowerCase()) ||
      ticketIdStr.toLowerCase().includes(searchText.toLowerCase());

    const matchesStatus =
      statusFilter === 'ALL' || ticket.status === statusFilter;

    const matchesPriority =
      priorityFilter === 'ALL' || ticket.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  const selectedTicketDbId = selectedTicket?._id || selectedTicket?.id;

  return (
    <>
      <ApiInfoBanner />

      <section
        className="card"
        style={{
          marginBottom: '1rem',
          display: 'flex',
          justify: 'space-between',
          alignItems: 'center'
        }}
      >
        <div>
          <p className="eyebrow">Ticket Management</p>
          <h2 style={{ margin: 0 }}>Support Tickets</h2>
        </div>
      </section>

      <TicketFilterPanel
        searchText={searchText}
        statusFilter={statusFilter}
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
            selectedTicketId={selectedTicketDbId}
            onSelectTicket={setSelectedTicket}
          />

          <div>
            <TicketDetail ticket={selectedTicket} />
          </div>
        </div>
      )}
    </>
  );
}