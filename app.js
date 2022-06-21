let baseUrl = 'http://localhost:3030/jsonstore/collections/students/';
let table = document.getElementById('results');
let tableBody = document.getElementsByTagName('tbody');

async function loadStudents() {
    const res = await fetch(baseUrl);
    const data = await res.json();
    console.log(Object.entries(data));
    for (const [key, value] of Object.entries(data)) {

        let newRow = document.createElement('tr');
        let firstNameCell = document.createElement('td');
        firstNameCell.textContent = value.firstName;
        let lastNameCell = document.createElement('td');
        lastNameCell.textContent = value.lastName;
        let facultyNumberCell = document.createElement('td');
        facultyNumberCell.textContent = value.facultyNumber;
        let gradeCell = document.createElement('td');
        gradeCell.textContent = value.grade;
        newRow.appendChild(firstNameCell);
        newRow.appendChild(lastNameCell);
        newRow.appendChild(facultyNumberCell);
        newRow.appendChild(gradeCell);
        table.appendChild(newRow);
    }
}

loadStudents();

let submitButton = document.getElementById('submit');
let inputFirstName = document.querySelector('[name="firstName"]');
let inputLastName = document.querySelector('[name="lastName"]');
let inputFacultyNumber = document.querySelector('[name="facultyNumber"]');
let inputGrade = document.querySelector('[name="grade"]');
submitButton.addEventListener('click', submitStudent);

async function submitStudent(e) {

    e.preventDefault();

    if (inputFirstName.value == '') {
        throw new Error('You must fill a first name!');
    } else if (inputLastName.value == '') {
        throw new Error('You must fill a last name!');
    } else if (inputFacultyNumber.value == '') {
        throw new Error('You must fill a faculty number!');
    } else if (inputGrade.value == '') {
        throw new Error('You must fill a grade!');
    } else {
        let postData = {
            firstName: inputFirstName.value,
            lastName: inputLastName.value,
            facultyNumber: inputFacultyNumber.value,
            grade: Number(inputGrade.value)
        };

        fetch(baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData)
        });

        let newRow = document.createElement('tr');
        let firstNameCell = document.createElement('td');
        firstNameCell.textContent = inputFirstName.value;
        let lastNameCell = document.createElement('td');
        lastNameCell.textContent = inputLastName.value;
        let facultyNumberCell = document.createElement('td');
        facultyNumberCell.textContent = inputFacultyNumber.value;
        let gradeCell = document.createElement('td');
        gradeCell.textContent = Number(inputGrade.value);
        newRow.appendChild(firstNameCell);
        newRow.appendChild(lastNameCell);
        newRow.appendChild(facultyNumberCell);
        newRow.appendChild(gradeCell);
        table.appendChild(newRow);
    }
}
