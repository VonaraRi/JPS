# Day 17 
## Exercise 03 — Error Tracking

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

## Exercise 04 — Performance and Index Review

## Goal
Identify query patterns in the Support Desk API and recommend MongoDB index strategies to optimize filter, sorting, reporting, and uniqueness checks.

---

## Query Pattern Analysis

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

## Exercise 05 — Reflection: Validation vs. Sanitisation

### 1. What is validation?
**Validation** is the process of verifying whether incoming client data meets predefined rules, formats, and structural constraints before processing it. If the data fails these checks (e.g., missing required fields, invalid email format, negative price, or unauthorized values), the application **rejects** the request entirely and returns an appropriate error (such as HTTP `400 Bad Request`).

---

### 2. What is sanitisation?
**Sanitisation** is the process of safely cleaning or normalising raw user input before storing, logging, or displaying it. Unlike validation, sanitisation modifies harmless variations in the input—such as trimming accidental leading/trailing spaces, converting lowercase codes to uppercase, or stripping illegal control characters—to make the data safe, consistent, and standardized without rejecting the request.

---

### 3. Give one example where input should be cleaned.
* **Example:** Cleaning a user-submitted ticket code, priority string, or user email address.
  * **Input:** `"   ticket-net-001   "`
  * **Sanitised Output:** `"TICKET-NET-001"`
  * **Why:** Trimming leading/trailing whitespace and normalising letter casing prevents formatting mismatches in database lookups while allowing the request to proceed seamlessly.

---

### 4. Give one example where input should be rejected.
* **Example:** Submitting a blank mandatory field or an invalid email address format during user registration.
  * **Input:** `"user@"` or `""` (for mandatory field `createdBy`)
  * **Action:** **Reject** immediately with a `400 Bad Request` status and validation message (e.g., `"Invalid email format"` or `"createdBy field cannot be blank"`).
  * **Why:** Sanitisation should never be used to mask broken or malicious data structures. If an input fundamentally violates domain constraints, it must be explicitly rejected so the client is aware of the error.

---
## Exercise 06 — Security Hardening Evidence

## Goal
Demonstrate that the Support Desk API properly enforces access control, input validation, data integrity, log sanitisation, and configuration security.

---

## 1. Security HTTP Status Verification

| Control Test | Endpoint & Action | Expected Status | Actual Status | Evidence Summary |
| :--- | :--- | :---: | :---: | :--- |
| **Missing Token** | `GET /api/v1/tickets` *(No Auth Header)* | `401` | `401 Unauthorized` | Request blocked by Spring Security `AuthenticationEntryPoint`. |
| **Wrong Role** | `POST /api/tickets` *(with `ROLE_USER` token)* | `403` | `403 Forbidden` | Intercepted by security filter requiring `ROLE_ADMIN` authority. |
| **Duplicate Record** | `POST /api/v1/tickets` *(Title: "Duplicate Network Issue")* | `409` | `409 Conflict` | `TicketService` pre-check threw `ResponseStatusException(CONFLICT)`. |
| **Invalid Input** | `GET /api/v1/tickets/paged?sortBy=password` | `400` | `400 Bad Request` | Request rejected due to invalid sort property parameter validation. |

---

## 2. Sensitive Data & Log Protection

* **Log Sanitisation Check:** Terminal output produced by `RequestTimingFilter` and standard loggers was inspected during login and request execution.
  * **JWT Pass-through:** Bearer tokens are filtered out/redacted in logs (only `requestId`, `method`, `path`, `status`, and `durationMs` are logged).
  * **Password Protection:** Plaintext passwords passed during `POST /api/auth/login` are never written to logger streams or console output.

---

## 3. Environment & Secrets Management

* **`.gitignore` Verification:** Confirmed that environment files containing local secrets and credentials are explicitly ignored:

```gitignore
### Environment & Secrets ###
.env
.env.local
*.env