## Reflection Question

### Why might a company keep both `/api/tickets` and `/api/v1/tickets` temporarily active?

* **Backward Compatibility:** It prevents immediate crashes or downtime for older client applications (like unupdated mobile or desktop apps) that are still hardcoded to use the legacy `/api/tickets` route.
* **Third-Party Migration Window:** It grants external integration partners and third-party developers a predictable timeline (e.g., a few months) to update their codebases to the new version without disrupting live services.
* **Risk Mitigation:** It acts as a reliable rollback safety net. If unexpected bugs or validation issues emerge on the new `/api/v1/tickets` pipeline, traffic can quickly be redirected back to the stable legacy endpoint while developers issue a hotfix.