export async function apiRequest(path, options = {}) {
  const {
    method = 'GET',
    token = '',
    body,
    headers = {}
  } = options;

  const requestHeaders = { ...headers };

  // Attach JWT Bearer token if provided
  if (token) {
    requestHeaders.Authorization = `Bearer ${token}`;
  }

  // Set JSON content-type if sending a payload
  if (body !== undefined) {
    requestHeaders['Content-Type'] = 'application/json';
  }

  const response = await fetch(path, {
    method,
    headers: requestHeaders,
    body: body !== undefined ? JSON.stringify(body) : undefined
  });

  // Safely parse response body (prevents JSON parse errors on empty 204 responses)
  const contentType = response.headers.get('content-type') ?? '';
  let data = null;

  if (contentType.includes('application/json')) {
    const text = await response.text();
    data = text ? JSON.parse(text) : null;
  }

  // Handle HTTP error statuses
  if (!response.ok) {
    const message = data?.message || data?.error || `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  return data;
}

export function buildQueryString(params = {}) {
  if (!params) return '';

  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.set(key, value);
    }
  });

  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : '';
}