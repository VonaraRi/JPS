export default function FilterPanel({
  searchText = '',
  statusFilter = 'ALL',
  onSearchChange,
  onStatusChange
}) {
  return (
    <section className="filter-panel" aria-label="Ticket filters">
      <label>
        Search tickets
        <input
          type="search"
          placeholder="Search by ID, title, category..."
          value={searchText}
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </label>

      <label>
        Status
        <select value={statusFilter} onChange={(event) => onStatusChange(event.target.value)}>
          <option value="ALL">All</option>
          <option value="OPEN">Open</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="RESOLVED">Resolved</option>
          <option value="CLOSED">Closed</option>
        </select>
      </label>
    </section>
  );
}