# AI Refactor Safety Checklist

- **Safe Files to Share:** React UI components (`src/components/`), pages, utility helpers (`src/utils/`), and service abstractions (`src/services/`).
- **Unsafe Files:** `.env` / `.env.local` files, database config files, `.http` request files, and Postman collections containing active sessions.
- **Secrets to Scrub:** Hardcoded JWT tokens, passwords, database connection strings, and personal access keys.
- **Backend Contract Preservation:** REST endpoint paths, HTTP verbs, status codes, and request/response JSON payload keys.
- **UI Behavior Preservation:** Form validation logic, protected route redirects, and success/error alert notifications.
- **Data Model Integrity:** Database entities, migration scripts, and DTO field definitions.
- **Unit & Component Verification:** Run `npm run test` (Vitest) to ensure isolated component logic and UI rendering pass.
- **E2E Integration Verification:** Run `npm run test:e2e` (Playwright) against the active backend to prove end-to-end workflows pass without regression.