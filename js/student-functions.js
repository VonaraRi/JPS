const student = {
    studentId: "S001",
    studentName: "Aina Rahman",
    email: "aina.rahman@example.com",
    status: "Active"
};

//Normal function
function formatStudent(student) {
    return `${student.studentId} - ${student.studentName} (${student.status})`;
}

//Arrow function
const getStudentEmail = (student) => {
    return student.email;
}

//Short arrow function
const getStudentStatus = (student) => student.status;

// Call formatStudent and print the returned string
console.log(formatStudent(student));
console.log(getStudentEmail(student));
console.log(getStudentStatus(student));
