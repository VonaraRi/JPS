// src/pages/ReportsPage.js
import { useEffect, useState } from 'react';
import ErrorMessage from '../components/ErrorMessage.jsx';
import LoadingMessage from '../components/LoadingMessage.jsx';
import ReportCard from '../components/ReportCard.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { fetchTicketReports } from '../services/api.js';

export default function ReportsPage() {
  const { token } = useAuth();
  const [reports, setReports] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let ignore = false;

    async function loadReports() {
      // Prevent request if token is missing or loading from storage
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError('');
        const data = await fetchTicketReports(token);

        if (!ignore) {
          setReports(data);
        }
      } catch (err) {
        if (!ignore) {
          setError(err.message || 'Could not load protected reports.');
          console.error(err);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadReports();

    return () => {
      ignore = true;
    };
  }, [token]);

  if (loading) {
    return <LoadingMessage message="Loading support ticket reports..." />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!token) {
    return <ErrorMessage message="Please log in to view reports." />;
  }

  if (!reports) {
    return <ErrorMessage message="No report data available." />;
  }

  return (
    <section className="dashboard-grid">
      <ReportCard title="Tickets by Status" items={reports.byStatus} />
      <ReportCard title="Tickets by Category" items={reports.byCategory} />
      <ReportCard title="Tickets by Priority" items={reports.byPriority} />
    </section>
  );
}