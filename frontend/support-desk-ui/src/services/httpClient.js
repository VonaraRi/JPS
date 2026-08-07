// Core HTTP Client Utility
export async function apiRequest(path, options = {}) {
  const {
    method = 'GET',
    token = '',
    body,
    headers = {}
  } = options;

  const requestHeaders = { ...headers };

  if (token) {
    requestHeaders.Authorization = `Bearer ${token}`;
  }

  if (body !== undefined) {
    requestHeaders['Content-Type'] = 'application/json';
  }

  const response = await fetch(path, {
    method,
    headers: requestHeaders,
    body: body !== undefined ? JSON.stringify(body) : undefined
  });

  const contentType = response.headers.get('content-type') ?? '';
  const data = contentType.includes('application/json') ? await response.json() : null;

  if (!response.ok) {
    const message = data?.message || `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  return data;
}

// URL Query String Helper
export function buildQueryString(params = {}) {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.set(key, value);
    }
  });

  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : '';
}

// Ticket API Service Methods

// Fetch paginated support tickets

export async function fetchPagedTickets(token, params = {}) {
  const queryString = buildQueryString(params);
  return apiRequest(`/api/v1/tickets/paged${queryString}`, {
    method: 'GET',
    token
  });
}

/**
 * Update ticket details or status
 */
export async function updateTicket(ticketId, token, ticketPayload) {
  return apiRequest(`/api/v1/tickets/${ticketId}`, {
    method: 'PUT',
    token,
    body: ticketPayload
  });
}