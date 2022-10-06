function createCell(text) {
    const cell = document.createElement("td");
    cell.innerText = text
    return cell;
}

function renderTasks(tasks) {
    const tableBody = document.querySelector("tbody");
    tasks.forEach((task) => {
        const tableRow = document.createElement("tr")
        const deleteButton = document.createElement("button");
        tableRow.append(
            createCell(task.id),
            createCell(task.title),
            createCell(task.completed));
        tableBody.appendChild(tableRow)

        // checkbox
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        tableRow.appendChild(checkbox);

        // Delete button
        deleteButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/><path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/></svg>';
        deleteButton.classList.add("btn", "btn-outline-danger", "delete-button");
        deleteButton.addEventListener("click", () => deleteTask(task.id));
        tableRow.appendChild(deleteButton);

        // Edit button
        const updateButton = document.createElement("button");
        updateButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16"><path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/><path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/></svg>';
        updateButton.classList.add("btn", "btn-outline-primary", "update-button");
        updateButton.addEventListener("click", () => updateTask(task.id));
        tableRow.appendChild(updateButton);
    });

}

function indexTask() {
    fetch("http://localhost:3000/tasks")
        .then((response) => response.json())
        .then((data) => renderTasks(data))
}

function createTask(task) {
    fetch("http://localhost:3000/tasks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(task)
    })
        .then((response) => response.json())
        .then((data) => newTask(data))
    const form = document.getElementById("newTask");
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const taskName = document.getElementById("title");
        let task = {
            title: taskName.value
        }
        createTask(task);
    })
}

function deleteTask(id) {
    fetch(`http://localhost:3000/task/${id}`, {
        method: "DELETE"
    })
        .then(window.location.reload())
}

function updateTask(id) {
    const title = prompt("Enter new title");
    fetch("http://localhost:3000/tasks", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id: id,
            title: title
        })
    })
}

document.addEventListener("DOMContentLoaded", () => {
    indexTask();
    createTask();
});
