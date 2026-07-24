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

  return (
    <section className="card detail-card">
      <div className="section-heading row-heading">
        <div>
          <h2>{ticket.title}</h2>
          <p>{ticket.id}</p>
        </div>
        <div className="badge-group">
          <PriorityBadge priority={ticket.priority} />
          <StatusBadge status={ticket.status} />
        </div>
      </div>

      <dl className="detail-list">
        <div>
          <dt>ID</dt>
          <dd>{ticket.id}</dd>
        </div>
        <div>
          <dt>Title</dt>
          <dd>{ticket.title}</dd>
        </div>
        <div>
          <dt>Category</dt>
          <dd>{ticket.category}</dd>
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
          <dd>{ticket.createdBy}</dd>
        </div>
        <div>
          <dt>Created At</dt>
          <dd>{ticket.createdAt}</dd>
        </div>
      </dl>
    </section>
  );
}