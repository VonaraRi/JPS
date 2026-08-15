# Day 17 Exercise 03 — Error Tracking

## Goal
Trace API errors using HTTP status codes, error causes, and structured timing logs

---

## Error Tracking Table

| Error | Request Made | Why It Happened | Where You Saw It in Logs |
| :--- | :--- | :--- | :--- |
| **401 Unauthorized** | `GET http://localhost:8082/api/v1/tickets` | Request was sent without providing a `Bearer` JWT token in the `Authorization` header. | `c.e.s.config.RequestTimingFilter : status=401` |
| **403 Forbidden** | `POST http://localhost:8082/api/tickets` | The authenticated user holds `ROLE_USER` instead of the required `ROLE_ADMIN` authority. | `c.e.s.config.RequestTimingFilter : status=403` |
| **400 Bad Request** | `GET http://localhost:8082/api/v1/tickets/paged?sortBy=password` | Client supplied an invalid request sorting parameter (`sortBy=password`) which failed backend validation. | `RequestTimingFilter : requestId=7c5a5850 method=GET path=/api/v1/tickets/paged status=400 durationMs=3` |
| **404 Not Found** | `GET http://localhost:8082/api/v1/tickets/99999` | The requested ticket resource ID (`99999`) does not exist in the database. | `c.e.s.config.RequestTimingFilter : status=404` |
| **409 Conflict** | `POST http://localhost:8082/api/v1/tickets` | Request attempted to create a ticket with a title that already exists in MongoDB. | `c.e.s.config.RequestTimingFilter : requestId=deb55a7c method=POST path=/api/v1/tickets status=409 durationMs=6` |

---

# Day 17 Exercise 04 — Performance and Index Review

## Goal
Identify query patterns in the Support Desk API and recommend MongoDB index strategies to optimize filter, sorting, reporting, and uniqueness checks.

---

## 1. Query Pattern Analysis

Based on the endpoints and queries implemented in `TicketService.java` and `TicketRepository.java`:

### A. Fields Used for Filtering
* **`status`**: Used in `findByStatus(status)` to filter open, in-progress, or resolved tickets.
* **`priority`**: Used in `findByPriority(priority)` to query high/medium/low severity items.
* **`category`**: Used in `findByCategory(category)` to group tickets by domain (e.g., Network, Hardware, Software).

### B. Fields Used for Sorting
* **`createdAt`**: Frequently sorted by `desc` to show newest tickets first on dashboards.
* **`id`**: Used as the default primary key sort field in pagination (`/api/v1/tickets/paged`).
* **`title`**: Commonly used for alphabetical sorting in UI lists.

### C. Fields That Should Be Unique
* **`title`** *(or custom reference ID)*: Enforces uniqueness to prevent accidental duplicate ticket creation during POST requests.

### D. Fields Used in Reports
* **`status`**: Used for aggregation/grouping in `/api/v1/reports/tickets-by-status`.
* **`priority`**: Used for aggregation/grouping in `/api/v1/reports/tickets-by-priority`.
* **`category`**: Used for aggregation/grouping in `/api/v1/reports/tickets-by-category`.
---
