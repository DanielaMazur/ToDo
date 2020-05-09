import { addBtn, createTaskParagraph } from "./modules/create-elements.js";

let todos = [];

const deleteElementById = (id) => {
  const elementToBeDeleted = document.getElementById(id);
  elementToBeDeleted.remove();
};

const cancelEdit = (id) => {
  deleteElementById(`edit-title-${id}`);
  deleteElementById(`edit-description-${id}`);

  createTaskParagraph(id, todos[id].description);
  createTaskParagraph(id, todos[id].title);

  turnOffEditMode(id);
};

const editTask = (id) => {
  const taskCard = document.getElementById(id);

  //delete all paragraphs in order to replace them with inputs
  while (document.getElementById(`task-${id}`)) {
    deleteElementById(`task-${id}`);
  }

  const editTitle = document.createElement("input");
  editTitle.id = `edit-title-${id}`;
  editTitle.value = todos[id].title;

  const editDescriptionTextarea = document.createElement("textarea");
  editDescriptionTextarea.id = `edit-description-${id}`;
  editDescriptionTextarea.className = "mui-textfield";
  editDescriptionTextarea.value = todos[id].description;

  //prepend - append first child
  taskCard.prepend(editDescriptionTextarea);
  taskCard.prepend(editTitle);

  deleteElementById(`delete-${id}`);
  deleteElementById(`edit-${id}`);

  addBtn("cancel", id, cancelEdit);
  addBtn("apply", id, applyChanges);
};

const deleteTask = (id) => {
  todos.splice(id, 1);
  deleteElementById(id);
};

const applyChanges = (id) => {
  const title = document.getElementById(`edit-title-${id}`).value;
  const description = document.getElementById(`edit-description-${id}`).value;

  if (title === todos[id].title && description === todos[id].description) {
    cancelEdit(id);
    return;
  }

  deleteElementById(`edit-title-${id}`);
  deleteElementById(`edit-description-${id}`);

  createTaskParagraph(id, description);
  todos[id].description = description;

  createTaskParagraph(id, title);
  todos[id].title = title;

  turnOffEditMode(id);
};

const turnOffEditMode = (id) => {
  deleteElementById(`cancel-${id}`);
  deleteElementById(`apply-${id}`);

  addBtn("delete", id, deleteTask);
  addBtn("edit", id, editTask);
};

const addTask = () => {
  //get the value written in todo input
  const titleElement = document.getElementById("titleInput");
  const taskDescriptionElement = document.getElementById("descriptionInput");

  const [title, description] = [
    titleElement.value,
    taskDescriptionElement.value,
  ];

  //clear input
  titleElement.value = "";
  taskDescriptionElement.value = "";

  const alreadyExists = todos.some((todo) => todo.title === title);
  if (alreadyExists) {
    alert("this task already exists");
    return;
  }
  if (title === "") {
    alert("task can not be empty string");
    return;
  }

  todos.push({ title, description });

  const taskId = todos.findIndex((todo) => todo.title === title);

  // create card element
  const card = document.createElement("div");
  card.id = taskId;
  card.className = "card mui-panel";

  const container = document.getElementById("tasksContainer");
  container.appendChild(card);

  createTaskParagraph(taskId, description);
  createTaskParagraph(taskId, title);

  //create delete button and append it to card element
  addBtn("delete", taskId, deleteTask);

  //create edit button and append it to card element
  addBtn("edit", taskId, editTask);
};

const addTaskBtn = document.querySelector("#addTaskBtn");
addTaskBtn.addEventListener("click", () => addTask());
