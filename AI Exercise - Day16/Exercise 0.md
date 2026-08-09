## Bad prompt

```text
Improve code inside service class.
```

## Better prompt

```text
I am working on a React frontend for a Support Desk Ticket app.

The form currently has validation logic inside the component.
Refactor the code by improving the code, handling the error and code reuse inside service class.

Constraints:
- Do no change the any API endpoint behaviour or HTTP methods.
- Do not change any exported function name, function arguments or returned .

Return:
1. The Refactored service class.
2. Vitest tests for the successful API responses and HTTP error handling
3. Explanation of what behaviour stayed the same
```

Why second prompt is better:

```text
It gives project context.
It defines a specific task.
It protects existing behaviour.
It asks for tests.
It asks for explanation.
```