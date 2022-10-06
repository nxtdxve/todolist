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
        const checkbox = document.createElement("input");
        tableRow.append(
            createCell(task.id),
            createCell(task.title),
            createCell(task.completed));
        tableBody.appendChild(tableRow)


        deleteButton.innerText = "Delete";
        tableRow.appendChild(deleteButton);
        deleteButton.classList.add("btn", "btn-outline-danger", "delete-button");
        deleteButton.addEventListener("click", () => deleteTask(task.id));
    }
    );
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

    const form = document.getElementById("newTask");
    form.addEventListener("submit", () => {
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

document.addEventListener("DOMContentLoaded", () => {
    indexTask();
    createTask();
});
