import { useState } from 'react';
import Layout from './components/Layout.jsx';
import TicketFilterPanel from './components/TicketFilterPanel.jsx';
import TicketList from './components/TicketList.jsx';
import TicketDetail from './components/TicketDetail.jsx';
import sampleTickets from './data/sampleTickets.js';

export default function App() {
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [priorityFilter, setPriorityFilter] = useState('ALL');
  const [selectedTicket, setSelectedTicket] = useState(sampleTickets[0]);

  // Filtering Logic
  const filteredTickets = sampleTickets.filter((ticket) => {
    // 1. Search by Title or Category (or ID)
    const matchesSearch =
      ticket.title.toLowerCase().includes(searchText.toLowerCase()) ||
      ticket.category.toLowerCase().includes(searchText.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchText.toLowerCase());

    // 2. Filter by Status
    const matchesStatus =
      statusFilter === 'ALL' || ticket.status === statusFilter;

    // 3. Filter by Priority
    const matchesPriority =
      priorityFilter === 'ALL' || ticket.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <Layout>
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
    </Layout>
  );
}