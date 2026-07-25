import { NavLink, Outlet } from 'react-router-dom';

export default function AppShell() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <h1>Support Desk UI</h1>
      </header>

      <nav className="app-nav" style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
        <NavLink to="/app/dashboard">Dashboard</NavLink>
        <NavLink to="/app/tickets">Tickets</NavLink>
        <NavLink to="/login">Login</NavLink>
      </nav>

      <main>
        <Outlet />
      </main>
    </div>
  );
}