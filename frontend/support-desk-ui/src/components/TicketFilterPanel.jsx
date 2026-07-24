export default function TicketFilterPanel({
  searchText,
  statusFilter,
  priorityFilter,
  onSearchChange,
  onStatusChange,
  onPriorityChange,
}) {
  return (
    <section className="filter-panel" aria-label="Ticket filters">
      <label>
        Search ticket
        <input
          type="search"
          placeholder="Search by id or title or category or priority"
          value={searchText}
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </label>

      <label>
        Status
        <select
          value={statusFilter}
          onChange={(event) => onStatusChange(event.target.value)}
        >
          <option value="ALL">All</option>
          <option value="OPEN">Open</option>
          <option value="IN_PROGRESS">In progress</option>
          <option value="RESOLVED">Resolved</option>
        </select>
      </label>

      <label>
        Priority
        <select
          value={priorityFilter}
          onChange={(event) => onPriorityChange(event.target.value)}
        >
          <option value="ALL">All</option>
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
        </select>
      </label>
    </section>
  );
}