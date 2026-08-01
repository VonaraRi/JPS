import { Routes, Route, Navigate } from 'react-router';
import AppShell from './components/AppShell.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import LoginPage from './pages/LoginPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import TicketsPage from './pages/TicketsPage.jsx';
import TicketFormPage from './pages/TicketFormPage.jsx';
import ReportsPage from './pages/ReportsPage.jsx';
import { TicketDataProvider } from './context/TicketDataContext.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/app/dashboard" replace />} />
      <Route path="/login" element={<LoginPage />} />

      {/* Parent route: /app */}
      <Route
        path="/app"
        element={
          <ProtectedRoute>
            <TicketDataProvider>
              <AppShell />
            </TicketDataProvider>
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="tickets" element={<TicketsPage />} />
        <Route path="tickets/new" element={<TicketFormPage />} />
        <Route path="tickets/:ticketId/edit" element={<TicketFormPage />} />

        <Route path="reports" element={<ReportsPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}