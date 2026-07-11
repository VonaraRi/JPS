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