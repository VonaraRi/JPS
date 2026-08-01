// Helper to parse JSON responses and extract backend error messages
async function parseJsonResponse(response) {
  const contentType = response.headers.get('content-type') ?? '';
  const body = contentType.includes('application/json') ? await response.json() : null;

  if (!response.ok) {
    const message = body?.message || `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  return body;
}

// Helper to construct authorization headers safely
function authHeaders(token, extraHeaders = {}) {
  const headers = { ...extraHeaders };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

// Public API Info & Docs
export async function fetchApiInfo() {
  const response = await fetch('/api/v1/info');
  return parseJsonResponse(response);
}

export async function fetchApiDocs() {
  const response = await fetch('/api/docs');
  return parseJsonResponse(response);
}

// Authentication API
export async function loginRequest(email, password) {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });

  return parseJsonResponse(response);
}

// Ticket API Helpers
export async function fetchTickets(token) {
  const response = await fetch('/api/v1/tickets', {
    headers: authHeaders(token)
  });

  return parseJsonResponse(response);
}

export async function fetchTicketById(id, token) {
  const response = await fetch(`/api/v1/tickets/${id}`, {
    headers: authHeaders(token)
  });

  return parseJsonResponse(response);
}

export async function createTicket(token, payload) {
  const response = await fetch('/api/v1/tickets', {
    method: 'POST',
    headers: authHeaders(token, {
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify(payload)
  });

  return parseJsonResponse(response);
}

export async function updateTicket(id, token, payload) {
  const response = await fetch(`/api/v1/tickets/${id}`, {
    method: 'PUT',
    headers: authHeaders(token, {
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify(payload)
  });

  return parseJsonResponse(response);
}

// Report API Helpers
export async function fetchReport(path, token) {
  const response = await fetch(path, {
    headers: authHeaders(token)
  });

  return parseJsonResponse(response);
}

export async function fetchTicketReports(token) {
  const [byStatus, byCategory, byPriority] = await Promise.all([
    fetchReport('/api/v1/reports/tickets-by-status', token),
    fetchReport('/api/v1/reports/tickets-by-category', token),
    fetchReport('/api/v1/reports/tickets-by-priority', token)
  ]);

  return { byStatus, byCategory, byPriority };
}