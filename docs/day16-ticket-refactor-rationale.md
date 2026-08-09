# Day 16: Ticket Validation Refactor Rationale

## 1. Files Changed
* **Extracted / Created:** `frontend/src/utils/ticketFormValidation.js` (Standalone pure validation functions and form defaults).
* **Updated:** `frontend/src/components/TicketFormWizard.jsx` (UI component refactored to consume validation helpers).
* **Updated:** `frontend/src/utils/ticketFormValidation.test.js` (Hardened unit tests covering step validation, payload normalization, and label formatting).

---

## 2. Preserved Behavior
* **UI & Flow:** Multi-step form navigation (Step 1 $\rightarrow$ Step 2 $\rightarrow$ Step 3) remains identical from a user perspective.
* **Validation Messaging:** Error strings for required fields (`title`, `description`, `category`, `priority`, `status`, `createdBy`, and `review`) match original expected output.
* **Payload Normalization:** String inputs continue to trim leading/trailing whitespace before submission payload construction.

---

## 3. Extracted Logic
* Moved inline validation logic out of `TicketFormWizard.jsx` and encapsulated it inside dedicated pure functions in `ticketFormValidation.js`:
  * `validateTicketFormStep(stepToValidate, formValues, isReviewed)` — Validates form data per wizard step and handles enum checks (`PRIORITY_OPTIONS`, `STATUS_OPTIONS`).
  * `normalizeTicketFormPayload(formValues)` — Handles whitespace trimming and standard payload mapping.
  * `formatTicketFormLabel(key)` — Converts camelCase field keys to human-readable capitalized labels for preview displays.

---

## 4. Maintenance Benefits
* **Separation of Concerns:** The React component focuses strictly on state management, event handling, and rendering UI, while validation logic is isolated.
* **Reusability:** Pure utility functions can be imported by other components or form handlers without duplicating validation rules.
* **Fast & Direct Testing:** Validation rules are tested directly via light unit tests (Vitest) without needing to render React DOM nodes or mock component state.

---

## 5. Executed Verification & Tests
* **Unit Testing:** Executed Vitest test suite (`npx vitest run src/utils/ticketFormValidation.test.js`). Passed all 6 test cases covering:
  * Required fields and whitespace handling (`Step 1` and `Step 2`).
  * Invalid priority (`URGENT_NOT_ALLOWED`) and invalid status (`PENDING_APPROVAL`) rejection.
  * Review step confirmation assertion (`Step 3`).
  * Payload normalization (`normalizeTicketFormPayload`).
  * Key label formatting (`formatTicketFormLabel`).
* **Manual UI Verification:** Tested wizard steps in browser to confirm inline errors render on empty submission and form submits successfully with valid inputs.

---

## 6. Remaining Risks & Considerations
* **Client-Only Validation:** Validation resides solely on the frontend utility. Backend API endpoints must still enforce database-level validation to prevent direct POST/PUT bypasses via HTTP tools.
* **Form Schema Scalability:** As new fields are added to the ticket workflow, both `emptyTicketForm` and `validateTicketFormStep` will need updates in tandem with backend schema changes.