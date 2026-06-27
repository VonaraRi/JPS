// The hardcoded 'students' array is no longer needed,
// as we will fetch the data from students.json.

// --- DOM Element Selection ---
const studentList = document.getElementById('student-list');
const statusMessage = document.getElementById('status-message');

// --- Core Rendering Function ---
function renderStudents(students) {
    // Clear the list before rendering
    studentList.innerHTML = '';

    // Show a message if the array is empty
    if (students.length === 0) {
        studentList.innerHTML = '<p>No students found.</p>';
        return;
    }

    // Otherwise, render a card for each student
    students.forEach(student => {
        const card = document.createElement('div');
        card.className = 'student-card';

        card.innerHTML = `
            <h3>${student.studentName}</h3>
            <p><strong>ID:</strong> ${student.studentId}</p>
            <p><strong>Email:</strong> ${student.email}</p>
            <p><strong>Status:</strong> ${student.status}</p>
        `;

        studentList.appendChild(card);
    });
}

async function loadStudents() {
    try {
        statusMessage.textContent = "Loading students...";
        const response = await fetch('students.json');
        if (!response.ok) {
            throw new Error("Failed to load student data.");
        }
        const students = await response.json();
        statusMessage.textContent = "";
        renderStudents(students);
    } catch (error) {
        statusMessage.textContent = "Error: " + error.message;
    }
}

// --- Initial Page Load ---
// Call the async function to fetch and render the data
// instead of using the old hardcoded array.
loadStudents();
