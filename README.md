## Reflection Question

### Why might a company keep both `/api/tickets` and `/api/v1/tickets` temporarily active?

* **Backward Compatibility:** It prevents immediate crashes or downtime for older client applications (like unupdated mobile or desktop apps) that are still hardcoded to use the legacy `/api/tickets` route.
* **Third-Party Migration Window:** It grants external integration partners and third-party developers a predictable timeline (e.g., a few months) to update their codebases to the new version without disrupting live services.
* **Risk Mitigation:** It acts as a reliable rollback safety net. If unexpected bugs or validation issues emerge on the new `/api/v1/tickets` pipeline, traffic can quickly be redirected back to the stable legacy endpoint while developers issue a hotfix.


### Why is a grouped report endpoint better than counting tickets on the frontend?

* **Network Efficiency:** The backend only sends a tiny, aggregated JSON array (a few bytes) instead of downloading thousands of full ticket documents, drastically reducing bandwidth consumption.
* **Performance & Speed:** Database engines like MongoDB process aggregations native to the server using optimized indexing, making the operation significantly faster than running heavy loops in frontend JavaScript.
* **Scalability:** As the database grows to tens of thousands of tickets, a frontend counting approach will cause client devices to slow down, freeze, or crash due to memory exhaustion, whereas the grouped endpoint performance remains stable.


### Why is API documentation useful before frontend integration?

* **Parallel Development:** Frontend and backend teams can work at the same time. The frontend team doesn't have to wait for the backend to be fully completed because they already know the exact endpoints, request formats, and expected responses.
* **Clear Contract & Reduced Errors:** It acts as a single source of truth (a contract) between systems, preventing integration bugs, mismatched property names, or incorrect data type assumptions.
* **Easier Mocking:** Frontend developers can easily build mock servers or dummy data structures using the documented schema, allowing them to test user interfaces completely independent of the real database.