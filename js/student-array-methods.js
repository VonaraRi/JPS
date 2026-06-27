const students = [
    {
        studentId: "S001",
        studentName: "Ignacio de Paul",
        email: "ignacio@example.com",
        status: "Active"
    },
    {
        studentId: "S002",
        studentName: "Ben Tan",
        email: "ben@example.com",
        status: "Inactive"
    },
    {
        studentId: "S003",
        studentName: "Chong Mei",
        email: "mei@example.com",
        status: "Active"
    }
];

// Part A
// forEach
console.log('=== All Student Names ===');
students.forEach((student) => {
    console.log(student.studentName);
});
console.log('');

// filter
console.log('=== Active Students ===');
const activeStudents = students.filter((student) => {
    return student.status === 'Active';
});
console.log(activeStudents);
console.log('');

// find
console.log('Find Student S002');
const findStudent = students.find((student) => {
    return student.studentId === 'S002';
});
console.log(findStudent);
console.log('');

// map
console.log('=== Student Emails ===');
const mapEmail = students.map((student) => {
    return student.email;
});
console.log(mapEmail);
console.log('');

// Part B
// push
console.log('=== After push ===');
const newStudent = {
    studentId: "S004",
    studentName: "Danish Nawaz",
    email: "danish@example.com",
    status: "Active"
};
const newLengthAfterPush = students.push(newStudent);

console.log(`New array length: ${newLengthAfterPush}`);
console.log(students);
console.log('');

// pop
console.log('=== After pop ===');
const poppedStudent = students.pop();
const newLengthAfterPop = students.length;

console.log('Removed last student:');
console.log(poppedStudent);
console.log(`New array length: ${newLengthAfterPop}`);
console.log(students);
console.log('');

// unshift
console.log(`=== After unshift ===`);
const newLengthAfterUnshift = students.unshift({
    studentId: "S000",
    studentName: "New First Student",
    email: "new.first@example.com",
    status: "Active"
});
console.log(`New array length: ${newLengthAfterUnshift}`);
console.log(students);
console.log('');

// shift
console.log(`=== After shift ===`);
const removedFirstStudent = students.shift();
console.log('Removed first student:');
console.log(removedFirstStudent);
console.log(`New array length: ${students.length}`);
console.log(students);
console.log('');