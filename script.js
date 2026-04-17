
const API_URL = "YOUR_API_URL";

let tasks = [];

// Load tasks on start
window.onload = loadTasks;

function loadTasks() {
  fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      tasks = data;
      renderTasks();
    });
}

function renderTasks() {
  document.getElementById("todo").innerHTML = "<h2>To Do</h2>";
  document.getElementById("inprogress").innerHTML = "<h2>In Progress</h2>";
  document.getElementById("done").innerHTML = "<h2>Done</h2>";

  tasks.forEach(task => {
    const div = document.createElement("div");
    div.className = "task";
    div.draggable = true;
    div.id = task.id;
    div.ondragstart = drag;

    div.innerHTML = `<b>${task.title}</b><br>${task.description}`;

    document.getElementById(task.status).appendChild(div);
  });
}

function addTask() {
  const title = document.getElementById("title").value;
  const desc = document.getElementById("desc").value;

  fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({
      action: "add",
      title: title,
      description: desc
    })
  })
  .then(res => res.json())
  .then(() => {
    loadTasks();
  });
}

// Drag functions
function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("id", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  const id = ev.dataTransfer.getData("id");
  const status = ev.currentTarget.id;

  fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({
      action: "update",
      id: id,
      status: status
    })
  })
  .then(res => res.json())
  .then(() => {
    loadTasks();
  });
}
