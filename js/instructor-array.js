// Create an array of at least 4 instructor objects
const instructors = [
    {
        instructorId: "I001",
        instructorName: "Ignacio de Paul",
        expertise: "Java and Spring Boot"
    },
    {
        instructorId: "I002",
        instructorName: "Roberto Tan",
        expertise: "React Development"
    },
    {
        instructorId: "I003",
        instructorName: "Juan Carlos Lee",
        expertise: "MongoDB"
    },
    {
        instructorId: "I004",
        instructorName: "Carlos Kim",
        expertise: "Testing"
    }
];

console.log("=== Instructor List ===");
// Use a for...of loop to print all instructors in a readable format
for (const instructor of instructors) {
    console.log(`${instructor.instructorId} - ${instructor.instructorName} - ${instructor.expertise}`);
}

console.log(''); // for spacing
console.log(`Total instructors: ${instructors.length}`);