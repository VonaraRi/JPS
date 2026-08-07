import { useEffect, useRef } from 'react';
import { Link } from 'react-router';
import TicketDetail from '../components/TicketDetail.jsx';
import TicketList from '../components/TicketList.jsx';
import DataControls from '../components/DataControls.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';
import FilterPanel from '../components/FilterPanel.jsx';
import LoadingMessage from '../components/LoadingMessage.jsx';
import OptimisticStatusControls from '../components/OptimisticStatusControls.jsx';
import PaginationControls from '../components/PaginationControls.jsx';
import SummaryCards from '../components/SummaryCards.jsx';
import { useTicketData } from '../context/TicketDataContext.jsx';

export default function TicketsPage() {
  const initialLoadRef = useRef(false);

  const {
    items,
    visibleTickets,
    selectedTicket,
    selectedTicketId,
    loading,
    error,
    pageInfo,
    filters,
    cacheMessage,
    updatingId,
    loadTicketsPage,
    refreshTickets,
    setSearchText,
    setStatusFilter,
    selectTicket,
    changeTicketStatus
  } = useTicketData();

  useEffect(() => {
    if (initialLoadRef.current) {
      return;
    }

    initialLoadRef.current = true;
    loadTicketsPage();
  }, [loadTicketsPage]);

  // Fallback helper for MongoDB (_id) or standard SQL (id) primary keys
  const activeTicketId = selectedTicketId || selectedTicket?.id || selectedTicket?._id;

  return (
    <>
      <SummaryCards tickets={items} />

      <DataControls
        pageInfo={pageInfo}
        cacheMessage={cacheMessage}
        loading={loading}
        onRefresh={refreshTickets}
        onPageSizeChange={(size) => loadTicketsPage({ page: 0, size })}
        onSortChange={(sortBy, direction) => loadTicketsPage({ page: 0, sortBy, direction })}
      />

      <FilterPanel
        searchText={filters.searchText}
        statusFilter={filters.statusFilter}
        onSearchChange={setSearchText}
        onStatusChange={setStatusFilter}
      />

      {loading && <LoadingMessage message="Loading ticket page..." />}
      {error && <ErrorMessage message={error} />}

      <section className="workspace-grid">
        <TicketList
          tickets={visibleTickets}
          selectedTicketId={activeTicketId}
          onSelectTicket={(ticket) => selectTicket(ticket.id || ticket._id)}
        />
        <div className="ticket-list">
          <TicketDetail ticket={selectedTicket} />
          <OptimisticStatusControls
            ticket={selectedTicket}
            updatingId={updatingId}
            onStatusChange={changeTicketStatus}
          />
          {selectedTicket && (
            <Link
              className="button-link secondary"
              to={`/app/tickets/${selectedTicket.id || selectedTicket._id}/edit`}
            >
              Edit selected ticket
            </Link>
          )}
        </div>
      </section>

      <PaginationControls
        pageInfo={pageInfo}
        loading={loading}
        onPageChange={(page) => loadTicketsPage({ page })}
      />
    </>
  );
}