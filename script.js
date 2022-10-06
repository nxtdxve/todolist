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

        deleteButton.innerText = "Delete";
        tableRow.appendChild(deleteButton);
        // add bootstrap to button
        deleteButton.classList.add("btn", "btn-danger", "btn-sm", "delete-button");
    }
    );
}

function indexTask() {
    fetch("http://127.0.0.1:3000/tasks")
        .then((response) => response.json())
        .then((data) => renderTasks(data))
}

function createTask(task) {
    fetch("http://127.0.0.1:3000/tasks", {
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


document.addEventListener("DOMContentLoaded", () => {
    indexTask();
    createTask();
});
