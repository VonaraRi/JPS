# Support Desk UI - Routing & Auth Summary

## Overview
Built client-side routing and JWT authentication using **React Router** and **React Context API**:
* Shared layout routes using `AppShell` and `<Outlet />`.
* Persistent JWT auth managed via `AuthContext` and `localStorage`.
* Route guarding with `ProtectedRoute` and return-path redirection post-login.

---

## Technical Q&A

### 1. Role of `BrowserRouter`
Acts as the top-level routing provider that syncs the UI with the browser URL via the HTML5 History API without reloading the page.

### 2. `Routes` vs `Route`
* **`Routes`**: Parent container that selects and renders the best single path match.
* **`Route`**: Maps a specific URL path to a React component.

### 3. Purpose of `Outlet`
A placeholder inside parent/layout routes that renders whichever child route matches the active URL.

### 4. What `Navigate` does
A component that triggers immediate programmatic redirection (e.g., bouncing unauthenticated users to `/login`).

### 5. Why frontend route protection is insufficient
Frontend guards only improve **UX**. Client-side code can be modified or bypassed, so security must be enforced on the server.

### 6. Backend endpoints requiring security
All protected data routes must validate the JWT token in the `Authorization` header:
* Ticket management (`GET`, `POST`, `PATCH` `/api/v1/tickets`)
* System reports (`GET /api/v1/reports/*`)
