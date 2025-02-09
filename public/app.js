let students = [];

async function fetchStudents() {
    const response = await fetch('http://localhost:3000/api/students');
    students = await response.json();
    displayStudents();
}

async function addStudent() {
    const name = document.getElementById('student-name').value;
    const surname = document.getElementById('student-surname').value;

    if (name && surname) {
        const response = await fetch('http://localhost:3000/api/students', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, surname }),
        });

        const student = await response.json();
        students.push(student);
        displayStudents();
    }
}

async function deleteStudent(id) {
    await fetch(`http://localhost:3000/api/students/${id}`, {
        method: 'DELETE',
    });

    students = students.filter(student => student.id !== id);
    displayStudents();
}

function displayStudents() {
    const studentList = document.getElementById('students');
    studentList.innerHTML = '';

    students.forEach(student => {
        const listItem = document.createElement('li');
        listItem.textContent = `${student.name} ${student.surname}`;
        listItem.innerHTML += ` <button onclick="deleteStudent(${student.id})">Delete</button>`;
        studentList.appendChild(listItem);
    });
}

function searchStudent() {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    const filteredStudents = students.filter(student =>
        student.name.toLowerCase().includes(searchTerm) ||
        student.surname.toLowerCase().includes(searchTerm)
    );
    const studentList = document.getElementById('students');
    studentList.innerHTML = '';

    filteredStudents.forEach(student => {
        const listItem = document.createElement('li');
        listItem.textContent = `${student.name} ${student.surname}`;
        listItem.innerHTML += ` <button onclick="deleteStudent(${student.id})">Delete</button>`;
        studentList.appendChild(listItem);
    });
}

window.onload = fetchStudents;
