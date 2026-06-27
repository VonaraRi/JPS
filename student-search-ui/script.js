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

// --- DOM Element Selection ---
const studentListContainer = document.getElementById('student-list');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const resetButton = document.getElementById('reset-button');

// --- Core Rendering Function ---
function renderStudents(studentArray) {
    // Clear the existing list to prevent duplicates
    studentListContainer.innerHTML = '';

    // Show a message if the array is empty
    if (studentArray.length === 0) {
        studentListContainer.innerHTML = '<p>No students found.</p>';
        return;
    }

    // Otherwise, render a card for each student
    studentArray.forEach(student => {
        const card = document.createElement('div');
        card.className = 'student-card';

        card.innerHTML = `
            <h3>${student.studentName}</h3>
            <p>ID: ${student.studentId}</p>
            <p>Email: ${student.email}</p>
            <p>Status: ${student.status}</p>
        `;

        studentListContainer.appendChild(card);
    });
}

// --- Event Listeners ---
searchButton.addEventListener('click', () => {
    const searchTerm = searchInput.value.trim().toLowerCase();
    const filteredStudents = students.filter(student => 
        student.studentName.toLowerCase().includes(searchTerm)
    );
    renderStudents(filteredStudents);
});

resetButton.addEventListener('click', () => {
    searchInput.value = '';
    renderStudents(students);
});

// --- Initial Page Load ---
renderStudents(students);