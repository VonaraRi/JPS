# Before / After Explanation

### Ticket Lookup (`findById`)
- **Before:** Duplicated `.orElseThrow(...)` exception logic in `getTicketById()` and `updateTicket()`.
- **After:** Encapsulated into a single `findTicketOrThrow(String id)` helper method.

### String Trimming
- **Before:** Raw input strings were saved directly without whitespace cleanup.
- **After:** Cleaned consistently via `normalizeRequired()`.

### Status & Priority Defaulting
- **Before:** Hardcoded `"Open"` set directly in `createTicket()`; priority assigned as-is.
- **After:** Centralized in `normalizeStatus()` (defaults to `"Open"`) and `normalizePriority()` (defaults to `"MEDIUM"`).

### API & Response Contracts
- **Before & After:** Unchanged. Public method signatures, JSON shapes, and endpoint behavior remain identical.