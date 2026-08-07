import StatusBadge from './StatusBadge.jsx';
import EmptyState from './EmptyState.jsx';

export default function TicketList({ tickets = [], selectedTicketId, onSelectTicket }) {
  // Guard against null or undefined tickets array
  if (!tickets || tickets.length === 0) {
    return <EmptyState message="No tickets match the current filter." />;
  }

  return (
    <section className="card list-card">
      <div className="section-heading">
        <h2>Ticket List</h2>
        <p>Select a ticket to view details.</p>
      </div>

      <div className="ticket-list">
        {tickets.map((ticket) => {
          const currentId = ticket.id || ticket._id;
          const rawId = String(currentId || '');
          
          const shortId = rawId.length > 4 ? rawId.slice(-4) : rawId;

          return (
            <button
              key={currentId}
              className={currentId === selectedTicketId ? 'ticket-row selected' : 'ticket-row'}
              onClick={() => onSelectTicket(ticket)}
              type="button"
            >
              <div className="ticket-row-header">
                <span className="ticket-id">#{shortId}</span>
                {ticket.category && <span className="ticket-category">{ticket.category}</span>}
              </div>

              <div className="ticket-row-body">
                <span className="ticket-title">{ticket.title}</span>
                <StatusBadge status={ticket.status} />
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}