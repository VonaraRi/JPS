import StatusBadge from './StatusBadge.jsx';
import PriorityBadge from './PriorityBadge.jsx';

export default function TicketDetail({ ticket }) {
  if (!ticket) {
    return (
      <div className="card empty-state">
        <p>Select a ticket to view more information.</p>
      </div>
    );
  }

  // Handle both MongoDB (_id) and standard SQL (id) keys
  const rawId = String(ticket.id || ticket._id || '');
  const shortId = rawId.length > 4 ? rawId.slice(-4) : rawId;

  return (
    <section className="card detail-card">
      <div className="section-heading row-heading">
        <div>
          <h2>{ticket.title}</h2>
          <p className="ticket-id-subtitle">#{shortId}</p>
        </div>
        <div className="badge-group">
          <PriorityBadge priority={ticket.priority} />
          <StatusBadge status={ticket.status} />
        </div>
      </div>

      <dl className="detail-list">
        <div>
          <dt>ID</dt>
          <dd className="monospace">{rawId}</dd>
        </div>
        <div>
          <dt>Title</dt>
          <dd>{ticket.title}</dd>
        </div>
        <div>
          <dt>Category</dt>
          <dd>{ticket.category || 'N/A'}</dd>
        </div>
        <div>
          <dt>Priority</dt>
          <dd><PriorityBadge priority={ticket.priority} /></dd>
        </div>
        <div>
          <dt>Status</dt>
          <dd><StatusBadge status={ticket.status} /></dd>
        </div>
        <div>
          <dt>Created By</dt>
          <dd>{ticket.createdBy || 'Unknown'}</dd>
        </div>
        <div>
          <dt>Created At</dt>
          <dd>{ticket.createdAt || 'N/A'}</dd>
        </div>
      </dl>
    </section>
  );
}