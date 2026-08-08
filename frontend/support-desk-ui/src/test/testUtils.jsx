import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

export const sampleTickets = [
  {
    id: 'T001',
    title: 'Cannot access email',
    description: 'User is unable to access email.',
    category: 'Email',
    priority: 'HIGH',
    status: 'OPEN',
    assignedTo: null,
    createdAt: '2026-04-01T08:30:00Z'
  },
  {
    id: 'T002',
    title: 'Laptop running slowly',
    description: 'Samsung Monitor display cuts out slowly.',
    category: 'Hardware',
    priority: 'MEDIUM',
    status: 'IN_PROGRESS',
    assignedTo: 'admin@example.com',
    createdAt: '2026-04-02T10:15:00Z'
  },
  {
    id: 'T003',
    title: 'Password reset request',
    description: 'Old password terminated.',
    category: 'Account',
    priority: 'LOW',
    status: 'CLOSED',
    assignedTo: 'admin@example.com',
    createdAt: '2026-04-03T14:00:00Z'
  }
];

export function renderWithRouter(ui, options = {}) {
  const { route = '/', ...renderOptions } = options;

  return render(
    <MemoryRouter initialEntries={[route]}>
      {ui}
    </MemoryRouter>,
    renderOptions
  );
}

export function storeAdminAuth() {
  const authData = JSON.stringify({
    token: 'test-admin-token',
    tokenType: 'Bearer',
    expiresInMinutes: 60,
    user: {
      id: 'U001',
      name: 'Admin User',
      email: 'admin@example.com',
      role: 'ADMIN'
    }
  });

  // Polyfill window.localStorage in case JSDOM hasn't instantiated it yet
  const storage = {
    supportDeskAuth: authData
  };

  Object.defineProperty(window, 'localStorage', {
    value: {
      getItem: (key) => storage[key] || null,
      setItem: (key, val) => { storage[key] = String(val); },
      removeItem: (key) => { delete storage[key]; },
      clear: () => { Object.keys(storage).forEach((k) => delete storage[k]); }
    },
    writable: true,
    configurable: true
  });
}

export function createJsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' }
  });
}