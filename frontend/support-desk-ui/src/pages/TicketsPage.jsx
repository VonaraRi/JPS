import { useState } from 'react';
import ApiInfoBanner from '../components/ApiInfoBanner.jsx';
import TicketFilterPanel from '../components/TicketFilterPanel.jsx';
import TicketList from '../components/TicketList.jsx';
import TicketDetail from '../components/TicketDetail.jsx';
import sampleTickets from '../data/sampleTickets.js';

export default function TicketsPage() {
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [priorityFilter, setPriorityFilter] = useState('ALL');
  const [selectedTicket, setSelectedTicket] = useState(sampleTickets[0]);

  const filteredTickets = sampleTickets.filter((ticket) => {
    const matchesSearch =
      ticket.title.toLowerCase().includes(searchText.toLowerCase()) ||
      ticket.category.toLowerCase().includes(searchText.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchText.toLowerCase());

    const matchesStatus =
      statusFilter === 'ALL' || ticket.status === statusFilter;

    const matchesPriority =
      priorityFilter === 'ALL' || ticket.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <>
      <ApiInfoBanner />

      <TicketFilterPanel
        searchText={searchText}
        statusFilter={statusFilter}
        priorityFilter={priorityFilter}
        onSearchChange={setSearchText}
        onStatusChange={setStatusFilter}
        onPriorityChange={setPriorityFilter}
      />
      <div className="dashboard-grid">
        <TicketList
          tickets={filteredTickets}
          selectedTicketId={selectedTicket?.id}
          onSelectTicket={setSelectedTicket}
        />
        <TicketDetail ticket={selectedTicket} />
      </div>
    </>
  );
}