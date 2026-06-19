# JPS
## 1. What is the purpose of Course.java?
To hold related class section - courseId, title, durationHours, level. It contains the logic to manage the course.

## 2. What is the purpose of Instructor.java?
To holds data specific to an instructor - eg. instructorId,instructorName and expertise. It represent the person teaching like courses and linked to Course.java to show who running a particular class. 

## 3. What is the purpose of Student.java?
To stores individual student data - eg. studentIdm, name, major and list of courses. It handles actions a student would take, like enrolling in a course.

## 4. What does the constructor do?
A constructor is a special method to called a newly object. Constructor takes argument and assigns them to the object's field

## 5. Why are the fields marked as private?
To hides particular field from outside code.

## 6. What does course1.assignInstructor(instructor1); mean?
It takes an instructor object (instructor1) and passes to a method inside the course object(course1). Inside that method, the course will update its internal instructor field to point to instructor1, effectively assigning that specific instructor to lead that specific class.

## 7. What does student1.printProfile(); do?
This calls a method belonging to the student1 object that is responsible for output. It give the private data stored inside that specific students and format nicely into text, using System.out.println() to display the student's information.

---

# Explanation of the Java Classes

If you already know Python or C++, here's how these Java classes map to concepts you know:

## **Course.java**
Think of this like a **class definition in Python or C++**. It has:

- **Private fields** (like `private String courseId`) - Similar to `self.courseId` in Python or member variables in C++. The `private` keyword means these can only be accessed within this class.
- **Constructor** (`public Course(...)`) - Like `__init__` in Python or a constructor in C++. It initializes the object when created with `new Course(...)`.
- **Getters** (`getCourseId()`, `getTitle()`, etc.) - Methods that return private field values. Python doesn't need these (you'd just access `obj.courseId`), but Java's encapsulation requires them.
- **Setters** (`setInstructor()`) - Methods that modify private fields. Think of them like property setters.
- **printSummary()** - A method that prints formatted output with conditional logic (`if/else`).

**Key difference from Python**: Java requires explicit type declarations (`String`, `int`, `Instructor`), whereas Python is dynamically typed.

## **Instructor.java**
Same pattern as Course.java - fields, constructor, getters, setters, and a `printProfile()` method.

## **Main.java**
This is the **entry point** - equivalent to the `if __name__ == "__main__":` block in Python or the `int main()` function in C++.

It:
1. Creates instances using `new` (like calling a constructor in both languages)
2. Calls methods on those instances using dot notation (same as Python and C++)
3. Uses `System.out.println()` instead of `print()` for output

---

## **Key Java Concepts for Python/C++ Developers:**

| Concept | Python | C++ | Java |
|---------|--------|-----|------|
| Private fields | `self._field` (convention) | `private: int field;` | `private int field;` |
| Constructor | `def __init__(self):` | `ClassName() {}` | `public ClassName() {}` |
| Method | `def method(self):` | `void method()` | `public void method()` |
| Type declaration | Not required | `int x;` | `int x;` (required) |
| Object creation | `obj = MyClass()` | `MyClass obj;` or `new` | `MyClass obj = new MyClass();` |
| Printing | `print()` | `cout << ...` | `System.out.println()` |

---

## **Your Reflection Points:**

**One explanation that helped me:**

The `private` keyword and getter/setter pattern - In Python, you'd just access `obj.courseId` directly, but Java enforces **encapsulation** where you must use `getCourseId()`. This seems verbose at first, but it protects your data and lets you add validation later if needed.

**One part I still needed own reading to understand:**

How the `Instructor` object is passed between classes and stored as a field in `Course`. The relationship between these objects and how Java manages memory for them (Java's garbage collection handles cleanup automatically, unlike C++ where you'd manually delete objects).
Then, how powerful setters and getters are when used for encapsulating private data
# On