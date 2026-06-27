### How is a JavaScript array similar to a Java ArrayList?

A JavaScript `Array` is very similar to a Java `ArrayList` because both are dynamic, ordered collections of elements.

Key Similarities:
*   **Dynamic Sizing:** Both can automatically grow or shrink in size as you add or remove elements, unlike a standard Java array.
*   **Ordered Collection:** Both maintain the insertion order of elements.
*   **Indexed Access:** Both use zero-based integer indexes to access, add, or remove elements.
*   **Iteration:** Both provide simple methods to loop through all their elements (e.g., JavaScript's `for...of` and Java's enhanced `for` loop).

### Why are arrow functions important before learning React?

Arrow functions are crucial for writing modern React code for two main reasons:

*   **Concise Syntax:** They allow you to write shorter, more readable functions, which is very common in React for things like event handlers and rendering lists with `.map()`.
*   **Lexical `this` Binding:** This is the most important reason. Arrow functions don't have their own `this` context; they inherit it from their parent scope. This solves a common problem in React class components where `this` would otherwise be `undefined` in event handler methods, avoiding the need to manually bind `this` and making the code cleaner and less error-prone.

### JavaScript Array Methods Quick Reference

**1. What is the difference between `filter`, `find`, and `map`?**

These methods do **not** change the original array; they return something new.
*   **`map()`**: Creates a **new array** by transforming every element. The new array will always have the same length as the original.
*   **`filter()`**: Creates a **new array** containing only the elements that pass a test. The new array can be shorter than the original.
*   **`find()`**: Returns the **first single element** that passes a test. It does not return an array.

**2. Which four array methods change the original array?**

`push()`, `pop()`, `shift()`, and `unshift()` all mutate (change) the original array by adding or removing elements from the beginning or end.

**3. What does `push()` return?**

It returns the **new length** of the array after adding an element.

**4. What does `pop()` return?**

It returns the **element that was removed** from the end of the array.

**5. What is the difference between `shift()` and `unshift()`?**

They are opposites for the *beginning* of an array:
*   **`shift()`**: **Removes** the first element and returns it.
*   **`unshift()`**: **Adds** one or more elements and returns the array's new length.

### What does the DOM allow JavaScript to do?

The DOM (Document Object Model) is an API for HTML documents that represents the page as a tree of objects. It acts as a bridge, allowing JavaScript to interact with and manipulate the content, structure, and style of a webpage.

Essentially, the DOM allows JavaScript to:
*   **Find and change** HTML elements, their attributes, and their content.
*   **Create and delete** HTML elements.
*   **Modify CSS styles** to change the appearance of the page.
*   **Listen and react to user events** like clicks, mouse movements, and keyboard input.

This is what makes web pages dynamic and interactive.

### Asynchronous JavaScript (Async/Await & Fetch)

**1. What does `async` mean?**

The `async` keyword declares that a function will operate asynchronously. It ensures the function always returns a `Promise` and allows the `await` keyword to be used inside it for handling asynchronous operations.

**2. What does `await` do?**

`await` can only be used inside an `async` function. It pauses the function's execution until a `Promise` is settled (resolved or rejected) and "unwraps" its resolved value, making asynchronous code look and feel more like synchronous code.

**3. What does `fetch` do?**

`fetch()` is a modern browser API for making network requests (e.g., to get data from a URL). It returns a `Promise` that resolves to a `Response` object, representing the server's response.

**4. Why do we use `fetch` with a local JSON file before a real backend?**

It allows us to simulate a real API call and build the entire frontend data-handling logic (loading states, rendering, error handling) without needing a live backend server. This isolates frontend development and makes it easier to test the UI.

**5. Why should this exercise be run using Live Server?**

For security reasons, browsers block `fetch` requests on local files opened with a `file:///` URL. Live Server serves the project over a local web server (`http://`), which allows `fetch` to work correctly, mimicking a real-world environment.