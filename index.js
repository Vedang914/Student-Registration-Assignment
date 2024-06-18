document.addEventListener("DOMContentLoaded", function () {
    const studentForm = document.getElementById("studentForm");
    const studentTableBody = document.getElementById("studentTableBody");
  
    // Load existing data from local storage on page load
    let students = JSON.parse(localStorage.getItem("students")) || [];
  
    // Function to populate table with existing data
    function populateTable() {
      studentTableBody.innerHTML = "";
      students.forEach((student) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.student_id}</td>
            <td>${student.class}</td>
            <td>${student.email}</td>
            <td>${student.contact}</td>
            <td>${student.address}</td>
            <td>
                <button class="editBtn" data-id="${student.student_id}">Edit</button>
                <button class="deleteBtn" data-id="${student.student_id}">Delete</button>
            </td>
        `;
        studentTableBody.appendChild(row);
      });
      updateLocalStorage();
      addEventListeners();
    }
  
    // Function to add a new student record
    function addStudentRecord(student) {
      students.push(student);
      populateTable();
    }
  
    // Function to update an existing student record
    function updateStudentRecord(studentId, updatedStudent) {
      students = students.map((student) =>
        student.student_id === studentId ? updatedStudent : student
      );
      populateTable();
    }
  
    // Function to delete a student record
    function deleteStudentRecord(studentId) {
      students = students.filter((student) => student.student_id !== studentId);
      populateTable();
    }
  
    // Function to update local storage with current student data
    function updateLocalStorage() {
      localStorage.setItem("students", JSON.stringify(students));
    }
  
    // Function to validate student ID and contact number fields
    function validateInput() {
      const studentId = document.getElementById("student_id").value;
      const contact = document.getElementById("contact").value;
      if (!/^\d+$/.test(studentId)) {
        alert("Please enter a valid Student ID (numbers only).");
        return false;
      }
      if (!/^\d+$/.test(contact)) {
        alert("Please enter a valid Contact Number (numbers only).");
        return false;
      }
      return true;
    }
  
    // Event listener for form submission
    studentForm.addEventListener("submit", function (event) {
      event.preventDefault();
      if (!validateInput()) return;
  
      const name = document.getElementById("name").value;
      const student_id = document.getElementById("student_id").value;
      const classValue = document.getElementById("class").value;
      const email = document.getElementById("email").value;
      const contact = document.getElementById("contact").value;
      const address = document.getElementById("address").value;
  
      // Check if student ID already exists (for editing)
      const existingStudent = students.find(
        (student) => student.student_id === student_id
      );
      if (existingStudent) {
        updateStudentRecord(student_id, {
          name,
          student_id,
          class: classValue,
          email,
          contact,
          address,
        });
      } else {
        addStudentRecord({
          name,
          student_id,
          class: classValue,
          email,
          contact,
          address,
        });
      }
  
      // Reset form fields after submission
      studentForm.reset();
    });
  
    // Event delegation for edit and delete buttons
    function addEventListeners() {
      const editButtons = document.querySelectorAll(".editBtn");
      const deleteButtons = document.querySelectorAll(".deleteBtn");
  
      editButtons.forEach((button) => {
        button.addEventListener("click", function () {
          const studentId = button.getAttribute("data-id");
          const studentToEdit = students.find(
            (student) => student.student_id === studentId
          );
          if (studentToEdit) {
            document.getElementById("name").value = studentToEdit.name;
            document.getElementById("student_id").value =
              studentToEdit.student_id;
            document.getElementById("class").value = studentToEdit.class;
            document.getElementById("email").value = studentToEdit.email;
            document.getElementById("contact").value = studentToEdit.contact;
            document.getElementById("address").value = studentToEdit.address;
          }
        });
      });
  
      deleteButtons.forEach((button) => {
        button.addEventListener("click", function () {
          const studentId = button.getAttribute("data-id");
          deleteStudentRecord(studentId);
        });
      });
    }
  
    // Initial population of table on page load
    populateTable();
  });
  