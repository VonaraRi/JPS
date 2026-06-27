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
    },
    {
        studentId: "S004",
        studentName: "Danish Nawaz",
        email: "danish@example.com",
        status: "Active"
    }
];

const studentListContainer = document.getElementById('student-list');

students.forEach(student => {
    const card = document.createElement('div');
    card.className = 'student-card';

    card.innerHTML = `
        <h4>ID:${student.studentId}</h4>
        <p><strong>Name:</strong> ${student.studentName}</p>
        <p><strong>Email:</strong> ${student.email}</p>
        <p><strong>Status:</strong> ${student.status}</p>
    `;

    studentListContainer.appendChild(card);
});