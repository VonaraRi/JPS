import { Outlet } from 'react-router';
import AppHeader from './AppHeader.jsx';

export default function Layout({ children }) {
  return (
    <div className="app-shell">
      <AppHeader />
      <main>
        {/* Render direct children if passed, otherwise render the nested router route */}
        {children || <Outlet />}
      </main>
    </div>
  );
}