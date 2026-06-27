const student = {
    studentId: "S001",
    studentName: "Ignacio de Paul",
    email: "ignacio@example.com",
    status: "Active"
}

console.log('=== Student Object ===');
// Print the whole object
console.log(student);

// Print each property one by one
console.log(''); // Add a blank line for spacing
console.log(`Student ID: ${student.studentId}`); // Dot notation
console.log(`Name: ${student.studentName}`); // Dot notation
console.log(`Email: ${student['email']}`); // Bracket notation
console.log(`Status: ${student.status}`); // Dot notation
