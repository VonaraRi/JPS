// Filter tickets array by search text and status
export function filterTickets(tickets = [], searchText = '', statusFilter = 'ALL') {
  const search = searchText.trim().toLowerCase();

  return tickets.filter((ticket) => {
    if (!ticket) return false;

    const matchesStatus = statusFilter === 'ALL' || ticket.status === statusFilter;

    const ticketId = String(ticket.id || ticket._id || '').toLowerCase();
    const title = (ticket.title || '').toLowerCase();
    const category = (ticket.category || '').toLowerCase();
    const description = (ticket.description || '').toLowerCase();
    const priority = (ticket.priority || '').toLowerCase();

    const matchesSearch =
      search.length === 0 ||
      ticketId.includes(search) ||
      title.includes(search) ||
      category.includes(search) ||
      description.includes(search) ||
      priority.includes(search);

    return matchesStatus && matchesSearch;
  });
}

// Count tickets matching a specific status
export function countByStatus(tickets = [], status) {
  if (!Array.isArray(tickets)) return 0;
  return tickets.filter((ticket) => ticket?.status === status).length;
}