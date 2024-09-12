document.getElementById("taskForm").addEventListener("submit", async function (event) {
  event.preventDefault();
  const taskInput = document.getElementById("taskInput");
  const description = taskInput.value;

  const response = await fetch("/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ description }),
  });

  if (response.ok) {
    const newTask = await response.json();
    let taskTableBody = document.getElementById("taskTableBody");

    if (!taskTableBody) {
      const taskContainer = document.getElementById("taskContainer");
      taskContainer.innerHTML = `
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col" class="col-description">Description</th>
                    <th scope="col">Completed</th>
                    <th scope="col" class="col-actions">Actions</th>
                  </tr>
                </thead>
                <tbody id="taskTableBody"></tbody>
              </table>
            `;
      taskTableBody = document.getElementById("taskTableBody");
    }

    const newRow = document.createElement("tr");
    newRow.setAttribute("data-id", newTask._id);
    newRow.innerHTML = `
            <th scope="row">${taskTableBody.children.length + 1}</th>
            <td>${newTask.description}</td>
            <td>${newTask.completed ? "Completed" : "Pending"}</td>
            <td>
              <button class="btn btn-success btn-sm" onclick="markComplete('${newTask._id}')">Complete</button>
              <button class="btn btn-danger btn-sm" onclick="deleteTask('${newTask._id}')">Delete</button>
            </td>
          `;
    taskTableBody.appendChild(newRow);
    taskInput.value = "";
  } else {
    console.error("Failed to add task");
  }
});

async function deleteTask(taskId) {
  const response = await fetch(`/tasks/${taskId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    const row = document.querySelector(`tr[data-id='${taskId}']`);
    row.remove();
  } else {
    console.error("Failed to delete task");
  }
}

async function markComplete(taskId) {
  const response = await fetch(`/tasks/${taskId}/complete`, {
    method: "PATCH",
  });

  if (response.ok) {
    console.log("OK");
    const row = document.querySelector(`tr[data-id='${taskId}']`);
    const cells = row.getElementsByTagName("td");
    cells[1].innerText = "Completed";
  } else {
    console.error("Failed to mark task as complete");
  }
}
