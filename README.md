# Support Desk Ticket API - Exercise Evidence Notes

### 1. Which query parameters did you implement?
* **Filtering Endpoint (`/api/tickets`):** `status`, `priority`, and `category`.
* **Pagination Endpoint (`/api/tickets/paged`):** `page`, `size`, `sortBy`, and `direction`.

### 2. Which fields did you index?
The following high-traffic query fields were marked with `@Indexed` inside the MongoDB model layer:
* `status`
* `priority`
* `category`
* `createdBy`
* `createdAt`

### 3. Why should an API use pagination?
* **Performance optimization:** It prevents the server from overloading memory when returning hundreds of thousands of documents at once.
* **Network efficiency:** Smaller JSON payloads speed up API response transfer speeds over the network.
* **User experience:** Better rendering capabilities on front-end interfaces by slicing data chunks logically.

### 4. What log messages appear when you call the filtering endpoint?
When triggering a filter call, an `INFO` tracking level statement logs parameters explicitly:
`INFO --- [nio-8082-exec-X] c.e.supportdesk.service.TicketService : Fetching tickets with filters -> status: null, priority: High, category: null`

### 5. What endpoint proves your sorting works?
The custom paged path containing sorting parameters handles directional sequencing configurations cleanly:
`GET http://localhost:8082/api/tickets/paged?page=0&size=5&sortBy=createdAt&direction=desc`



# Day 8 Exercise 5: Query Behaviour and Troubleshooting

This document records the testing, observations, and architectural analysis of the Support Desk Ticket API when processing edge-case query requests.

---

## Test 1: Invalid Status Value
`GET http://localhost:8082/api/tickets?status=INVALID`

### Does the API return an empty list?
Yes, it returns an empty JSON array `[]`.

### Does it return an error?
No, it returns an HTTP status code `200 OK`.

### What log message appears in the terminal?
The service prints the following info metric, showing that it parsed the value but found no matches in MongoDB:
`INFO --- c.e.supportdesk.service.TicketService : Fetching tickets with filters -> status: INVALID, priority: null, category: null`

---

## Test 2: Invalid Priority Value
`GET http://localhost:8082/api/tickets?priority=URGENT`

### Does your API support this priority?
The API executes the query string but returns an empty list `[]` because `URGENT` does not exist as a predefined state within the dataset documents.

### What response is returned?
An HTTP status `200 OK` accompanied by an empty array payload.

### Should the API accept this value?
No. In a production environment, the backend should validate incoming query strings against a strict Enum subset (e.g., `Low`, `Medium`, `High`, `Critical`) and throw an HTTP `400 Bad Request` validation error for unrecognized parameters.

---

## Test 3: Page Number with No Records
`GET http://localhost:8082/api/tickets/paged?page=99&size=5`

### Does the API crash?
No, the application handles the request gracefully.

### Does it return an empty page?
Yes, the `"content": []` array inside the Spring Data Page wrapper object is completely empty.

### What does the page metadata show?
The JSON response contains standard pagination structural data, indicating that the index page is out-of-bounds relative to the system size:
* `"numberOfElements": 0`
* `"empty": true`
* `"totalPages": X` (Displays actual count based on your total data pool)

---

## Test 4: Very Large Page Size
`GET http://localhost:8082/api/tickets/paged?page=0&size=100`

### Does the API allow this?
Yes, the API processes the parameter and returns up to 100 entries matching the chunk size specification.

### Should real APIs allow very large page sizes?
No, production-grade applications should enforce a sensible ceiling limit (e.g., maximum size of 50 or 100 items per call).

### What could go wrong if the page size is too large?
* **Memory Exhaustion:** Fetching massive datasets into memory simultaneously threatens server stability.
* **Network Latency:** Large data packages significantly increase transport latency over HTTP channels.

---

## Test 5: Unknown Sort Field
`GET http://localhost:8082/api/tickets/paged?page=0&size=5&sortBy=unknownField&direction=asc`

### Does the API return data?
Yes, it successfully returns data, but the collection defaults back to its natural document generation sorting profile since the provided attribute path does not exist.

### Does the sorting seem meaningful?
No, sorting by an unrecognized field yields unpredictable arrays or falls back entirely to the natural creation sequence.

### Should the backend validate allowed sort fields?
Yes. The system should explicitly intercept incoming sorting requests against an approved whitelist of model attributes to ensure deterministic, safe database actions.

---

## Test 6: Combined Filters
`GET http://localhost:8082/api/tickets?status=Open&priority=High`

### Does your API apply both filters?
No. The current conditional framework evaluates elements sequentially using an exclusive `if / else if` pipeline structure.

### Does it only apply one filter?
Yes. It evaluates the `status` block first, totally ignoring the concurrent `priority` query parameter.

### Is this behaviour clear to the API user?
No, this behavior is ambiguous. API consumers expect combined parameters to filter results using an implicit logical `AND` rule. This should be refactored using an automated query builder pattern or dynamic Criteria matching rules down the road.

# Reflection

### 1. What happened when you used an invalid status?
It returned an HTTP `200 OK` with an empty list `[]`. No error was thrown.

### 2. What happened when you used an invalid priority?
It also returned an HTTP `200 OK` with an empty list `[]` because the invalid string didn't match any data.

### 3. What happened when you requested page 99?
The API handled it gracefully without crashing, returning an empty content array `"content": []` along with valid pagination metadata.

### 4. What happened when you used an unknown sort field?
The API still returned data, but it ignored the unknown field and fell back to MongoDB's natural document insertion order.

### 5. Why should an API limit page size?
To protect server health, avoid memory exhaustion (OOM errors), and minimize network latency when fetching huge blocks of data.

### 6. Why should an API validate sort fields?
To ensure predictable sorting outcomes and prevent internal database errors or unintended performance hits from sorting by unindexed, non-existent fields.

### 7. Does your current API support combined filters?
No. The service processes queries through an exclusive `if-else if` pipeline, meaning it only evaluates the first matching filter parameter it encounters.

### 8. What log messages helped you understand what happened?
The custom console initialization tracking lines showing exactly which filter arguments were parsed or ignored:
`INFO --- c.e.supportdesk.service.TicketService : Fetching tickets with filters -> status: Open, priority: High`

### 9. Which behaviour would you improve in a future version?
* Implement a strict Enum validation check to reject invalid statuses/priorities with a `400 Bad Request`.
* Refactor the filter block using a dynamic Query Criteria builder to fully support combined (`AND`) query parameters.



