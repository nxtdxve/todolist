function createCell(text) {
    const cell = document.createElement("td");
    cell.innerText = text;
    return cell;
  }
  
  // Appends all Tasks and buttons in the table
  function renderTasks(tasks) {
    const tableBody = document.querySelector("tbody");
  
    // tabelle zuerst leeren, dann befüllen
    tableBody.innerHTML = "";
  
    tasks.forEach((task) => {
      // create elements
      const tableRow = document.createElement("tr");
      const deleteButton = document.createElement("button");
      const updateCompletedButton = document.createElement("button");
      const updateButton = document.createElement("button");
  
      // append elements
      tableRow.appendChild(updateCompletedButton);
      tableRow.append(createCell(task.id), createCell(task.title));
      tableBody.appendChild(tableRow);
      tableRow.appendChild(deleteButton);
      tableRow.appendChild(updateButton);
  
      // Completed button
      if (task.completed == true) {
        updateCompletedButton.classList.remove("btn", "btn-outline-danger");
        updateCompletedButton.classList.add(
          "btn",
          "btn-outline-success",
          "btn-sm"
        );
        updateCompletedButton.innerHTML =
          '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/></svg>';
      } else {
        updateCompletedButton.classList.remove("btn", "btn-outline-success");
        updateCompletedButton.classList.add(
          "btn",
          "btn-outline-danger",
          "btn-sm"
        );
        updateCompletedButton.innerHTML =
          '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/></svg>';
      }
      updateCompletedButton.addEventListener("click", () =>
        updateCompleted(task.id, task.title, !task.completed)
      );
  
      // Delete button
      deleteButton.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/><path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/></svg>';
      deleteButton.classList.add("btn", "btn-outline-danger", "delete-button");
      deleteButton.type = "button";
      deleteButton.addEventListener("click", () => onClickDeleteTask(task.id));
  
      // Edit button
      updateButton.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16"><path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/><path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/></svg>';
      updateButton.classList.add("btn", "btn-outline-primary");
      updateButton.type = "button";
      updateButton.addEventListener("click", () =>
        onClickUpdateTask(task.id, task.completed)
      );
    });
  }
  
  // Function to update the completed state of a task
  function updateCompleted(id, title, completed) {
    if (completed == true) {
      fetch("http://localhost:3000/auth/jwt/tasks", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          id: id,
          title: title,
          completed: true,
        }),
      }).then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error(response.message);
        }
      });
    } else {
      fetch("http://localhost:3000/auth/jwt/tasks", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          id: id,
          title: title,
          completed: false,
        }),
      }).then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error(response.message);
        }
      });
    }
  }
  
  // Function to index all tasks
  function indexTask() {
    fetch("http://localhost:3000/auth/jwt/tasks", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error(response.message);
        }
      })
      .then((data) => renderTasks(data));
  }
  
  // Function to create a task
  function createTask(title) {
    fetch("http://localhost:3000/auth/jwt/tasks", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
      }),
    })
      .then((response) => {
        if (response.status !== 200) {
          throw new Error(response.message);
        }
      })
      .then(this.indexTask());
  
    return false;
  }
  
  // Create a new task if the user clicks the create button
  function onClickNewTask(e) {
    e.preventDefault();
  
    const title = document.getElementById("title");
    if (title.value === "") {
      alert("Title cannot be empty");
      return false;
    } else {
      this.createTask(title.value);
      alert("Task created");
      return false;
    }
  }
  
  // Function to delete a task
  function onClickDeleteTask(id) {
    alert("Task Deleted");
    fetch(`http://localhost:3000/auth/jwt/task/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then(this.indexTask());
  
    //return false;
  }
  
  // Updates the title of a task if the user clicks the edit button
  function onClickUpdateTask(id, completed) {
    let title = prompt("Enter new title");
    if (title == null) {
      return false;
    } else if (title == "") {
      alert("Title cant be empty");
      return false;
    } else {
      alert("Title updated");
      fetch("http://localhost:3000/auth/jwt/tasks", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          id: id,
          title: title,
          completed: completed,
        }),
      })
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          } else {
            throw new Error(response.message);
          }
        })
        .then((data) => {
          console.log(data);
          this.indexTask();
        });
  
      return false;
    }
  }
  
  // Logs the user out
  function doLogout() {
    localStorage.removeItem("token");
    this.showLoginPage();
  }
  
  // Login
  function login(email, password) {
    localStorage.removeItem("token");
  
    fetch("http://localhost:3000/auth/jwt/sign", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          alert("Invalid credentials");
          throw new Error("Invalid credentials");
        }
      })
      .then((data) => {
        let token = data.token;
        localStorage.setItem("token", token);
        this.showTaskListPage();
      });
  }
  
  // Checks if Email is correct and logs in the user
  function onClickLogin() {
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    var mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    // check if email is valid regex
    if (email.value.match(mailFormat)) {
      this.login(email.value, password.value);
      return false;
    } else {
      alert("You have entered an invalid email address!");
      return false;
    }
  }
  
  // SPA components
  function activeNav(idName, isActive) {
    var x = window.document.getElementById(idName);
    if (isActive) {
      x.classList.add("active");
    } else {
      x.classList.remove("active");
    }
  }
  
  function showDiv(idName, show) {
    var x = window.document.getElementById(idName);
    if (show) {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }
  function hideAllDivs() {
    let token = localStorage.getItem("token");
    if (token) {
      this.showDiv("DivBar", true);
    } else {
      this.showDiv("DivBar", false);
    }
    this.showDiv("DivLogin", false);
  
    this.showDiv("DivListe", false);
    this.activeNav("NavListe", false);
  
    this.showDiv("DivNewTask", false);
    this.activeNav("NavNewTask", false);
  }
  
  function showLoginPage() {
    console.log("showLoginPage");
    this.hideAllDivs();
    this.showDiv("DivLogin", true);
  }
  
  function showTaskListPage() {
    this.hideAllDivs();
    this.showDiv("DivListe", true);
    this.activeNav("NavListe", true);
    this.indexTask();
  }
  function showNewTaskPage() {
    console.log("showNewTaskPage");
    this.hideAllDivs();
    this.showDiv("DivNewTask", true);
    this.activeNav("NavNewTask", true);
  }
  
  window.addEventListener("DOMContentLoaded", (event) => {
    let addNewTaskButton = document.getElementById("newTaskButton");
    addNewTaskButton.addEventListener("click", (e) => onClickNewTask(e));
  
    let buttons = document.querySelectorAll("button");
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener("click", (e) => e.preventDefault());
    }
  });
  
  // Go to Login Page if not logged in
  let token = localStorage.getItem("token");
  if (token) {
    this.showTaskListPage();
  } else {
    this.showLoginPage();
  }
  