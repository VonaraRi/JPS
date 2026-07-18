## Reflection Question

### Why might a company keep both `/api/tickets` and `/api/v1/tickets` temporarily active?

* **Backward Compatibility:** It prevents immediate crashes or downtime for older client applications (like unupdated mobile or desktop apps) that are still hardcoded to use the legacy `/api/tickets` route.
* **Third-Party Migration Window:** It grants external integration partners and third-party developers a predictable timeline (e.g., a few months) to update their codebases to the new version without disrupting live services.
* **Risk Mitigation:** It acts as a reliable rollback safety net. If unexpected bugs or validation issues emerge on the new `/api/v1/tickets` pipeline, traffic can quickly be redirected back to the stable legacy endpoint while developers issue a hotfix.


### Why is a grouped report endpoint better than counting tickets on the frontend?

* **Network Efficiency:** The backend only sends a tiny, aggregated JSON array (a few bytes) instead of downloading thousands of full ticket documents, drastically reducing bandwidth consumption.
* **Performance & Speed:** Database engines like MongoDB process aggregations native to the server using optimized indexing, making the operation significantly faster than running heavy loops in frontend JavaScript.
* **Scalability:** As the database grows to tens of thousands of tickets, a frontend counting approach will cause client devices to slow down, freeze, or crash due to memory exhaustion, whereas the grouped endpoint performance remains stable.