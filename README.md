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