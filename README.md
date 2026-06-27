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