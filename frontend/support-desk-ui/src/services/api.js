import { apiRequest, buildQueryString } from './httpClient.js';

// Public API Info & Docs
export function fetchApiInfo() {
  return apiRequest('/api/v1/info');
}

export function fetchApiDocs() {
  return apiRequest('/api/docs');
}

// Add Paged Ticket Endpoint (Fixed URL queryString concatenation)
export function fetchPagedTickets(token, params = {}) {
  let queryString = buildQueryString(params);

  // Safely strip leading '?' if buildQueryString already prepends it
  if (queryString && queryString.startsWith('?')) {
    queryString = queryString.slice(1);
  }

  const path = `/api/v1/tickets/paged${queryString ? `?${queryString}` : ''}`;
  return apiRequest(path, { token });
}

// Authentication API
export function loginRequest(email, password) {
  return apiRequest('/api/auth/login', {
    method: 'POST',
    body: { email, password }
  });
}

// Ticket API Helpers
export function fetchTickets(token) {
  return apiRequest('/api/v1/tickets', { token });
}

export function fetchTicketById(id, token) {
  return apiRequest(`/api/v1/tickets/${id}`, { token });
}

export function createTicket(token, payload) {
  return apiRequest('/api/v1/tickets', {
    method: 'POST',
    token,
    body: payload
  });
}

export function updateTicket(id, token, payload) {
  return apiRequest(`/api/v1/tickets/${id}`, {
    method: 'PUT',
    token,
    body: payload
  });
}

// Report API Helpers
export async function fetchReport(path, token) {
  try {
    return await apiRequest(path, { token });
  } catch (err) {
    console.warn(`Report endpoint ${path} unavailable:`, err.message);
    return []; // Return fallback array so the rest of the UI loads safely
  }
}

export async function fetchTicketReports(token) {
  const [byStatus, byCategory, byPriority] = await Promise.all([
    fetchReport('/api/v1/reports/tickets-by-status', token),
    fetchReport('/api/v1/reports/tickets-by-category', token),
    fetchReport('/api/v1/reports/tickets-by-priority', token)
  ]);

  return { byStatus, byCategory, byPriority };
}