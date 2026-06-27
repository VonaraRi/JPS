// JS does not requrie classes for simple data.
// We-can represent a course as an object literal with properties.

/*
Java: 
    1. Stricter type checking
    2. Class-based structure
    3. Private fields and methods (getter ans setter)
    4. Compile-time errors
    5. More boilerplate code

JavaScript:
    1. Dynamic typing
    2. Prototype-based structure
    3. No private field
*/
const course = {
    courseId: "C001",
    title: "JavaScript Fundamentals",
    durationHours: 12,
    level: "Beginner",
    instructor: "John Doe"
};

console.log("=== Course Details ===");
console.log(`Course ID: ${course.courseId}`);
console.log(`Title: ${course.title}`);// '${}' is a template literal
console.log(`Duration: ${course.durationHours} hours`);
console.log(`Level: ${course.level}`);
console.log(`Instructor: ${course.instructor}`);