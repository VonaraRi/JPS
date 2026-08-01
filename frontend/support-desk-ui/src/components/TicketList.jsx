import { Link } from 'react-router';
import StatusBadge from './StatusBadge.jsx';
import PriorityBadge from './PriorityBadge.jsx';

export default function TicketList({ tickets, selectedTicketId, onSelectTicket }) {
  if (!tickets || tickets.length === 0) {
    return (
      <div className="card empty-state">
        <p>No tickets match the current filter.</p>
      </div>
    );
  }

  return (
    <section className="card list-card">
      <div className="section-heading">
        <h2>Ticket List</h2>
        <p>Select a ticket to view details.</p>
      </div>

      <div className="asset-list">
        {tickets.map((ticket) => {
          const ticketDbId = ticket._id || ticket.id;
          const isSelected = ticketDbId === selectedTicketId;

          return (
            <div
              key={ticketDbId}
              className={isSelected ? 'asset-row selected' : 'asset-row'}
            >
              <button
                className="ticket-info-button"
                onClick={() => onSelectTicket(ticket)}
                type="button"
                style={{
                  flex: 1,
                  textAlign: 'left',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                <div>
                  <strong style={{ fontSize: '0.85rem', color: '#831843' }}>
                    {ticket.id || ticket._id}
                  </strong>
                  <span style={{ marginLeft: '0.75rem', fontWeight: 600, color: '#4a1525' }}>
                    {ticket.title}
                  </span>
                </div>
              </button>

              <div className="badge-group" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <PriorityBadge priority={ticket.priority} />
                <StatusBadge status={ticket.status} />

                <Link
                  to={`/app/tickets/${ticketDbId}/edit`}
                  className="button-link secondary"
                >
                  Edit
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}