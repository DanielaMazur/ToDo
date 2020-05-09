import { addBtn, createTaskParagraph } from "./modules/create-elements.js";

let tasks = [];

const deleteElementById = (id) => {
  const elementToBeDeleted = document.getElementById(id);

  elementToBeDeleted.remove();
};
const cancelEdit = (id) => {
  const editInput = document.getElementById(`edit-input-${id}`);
  editInput.remove();

  createTaskParagraph(id, tasks[id]);

  turnOffEditMode(id);
};

const editTask = (id) => {
  const taskCard = document.getElementById(id);
  const taskText = document.getElementById(`task-${id}`);
  taskText.remove();

  const editInput = document.createElement("input");
  editInput.id = `edit-input-${id}`;
  editInput.value = tasks[id];
  //prepend - append first child
  taskCard.prepend(editInput);

  const deleteBtn = document.getElementById(`delete-${id}`);
  deleteBtn.remove();

  const editBtn = document.getElementById(`edit-${id}`);
  editBtn.remove();

  addBtn("cancel", id, cancelEdit);
  addBtn("apply", id, applyChanges);
};

const deleteTask = (id) => {
  //remove task from tasks array
  tasks.splice(id, 1);

  //remove task's card from dom
  const card = document.getElementById(id);
  card.remove();
};

const applyChanges = (id) => {
  const editInput = document.getElementById(`edit-input-${id}`);
  const editedText = editInput.value;

  if (editedText === tasks[id]) {
    cancelEdit(id);
    return;
  }

  createTaskParagraph(id, editedText);
  editInput.remove();

  turnOffEditMode(id);
};

const turnOffEditMode = (id) => {
  const cancelBtn = document.getElementById(`cancel-${id}`);
  cancelBtn.remove();

  const applyBtn = document.getElementById(`apply-${id}`);
  applyBtn.remove();

  addBtn("delete", id, deleteTask);
  addBtn("edit", id, editTask);
};

const addTask = () => {
  //get the value written in todo input
  const newTask = document.getElementById("todoInput").value;

  //clear input
  document.getElementById("todoInput").value = "";

  if (tasks.includes(newTask)) {
    alert("this task already exists");
    return;
  }
  if (newTask === "") {
    alert("task can not be empty string");
    return;
  }

  tasks.push(newTask);

  const taskId = tasks.indexOf(newTask);

  // create card element
  const card = document.createElement("div");
  card.id = taskId;
  card.className = "card";

  //append our task to tasks container element
  const container = document.getElementById("tasksContainer");
  container.appendChild(card);

  //create a paragraph which will contain task description and append it to card element
  createTaskParagraph(taskId, newTask);

  //create delete button and append it to card element
  addBtn("delete", taskId, deleteTask);

  //create edit button and append it to card element
  addBtn("edit", taskId, editTask);
};

const addTaskBtn = document.getElementById("addTaskBtn");
addTaskBtn.addEventListener("click", () => addTask());
