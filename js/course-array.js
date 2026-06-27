// Create an array of at least 4 course objects
const courses = [
    {
        courseId: "C001",
        title: "Java Fundamentals",
        category: "Programming"
    },
    {
        courseId: "C002",
        title: "Advanced Web Development",
        category: "Frontend"
    },
    {
        courseId: "C003",
        title: "Introduction to Databases",
        category: "Database"
    },
    {
        courseId: "C004",
        title: "Software Engineering Principles",
        category: "Software Engineering"
    }
];

console.log("=== Course List ===");
// Use a for...of loop to print all courses
for (const course of courses) {
    console.log(`${course.courseId} - ${course.title} - ${course.category}`);
}

console.log(''); // for spacing
console.log(`Total courses: ${courses.length}`);