export const addBtn = (type, cardId, onClickFunction) => {
  const card = document.getElementById(cardId);
  const button = document.createElement("button");

  button.innerHTML = type;
  button.id = `${type}-${cardId}`;
  button.addEventListener("click", () => onClickFunction(cardId));

  card.appendChild(button);
};

export const createTaskParagraph = (cardId, text) => {
  const card = document.getElementById(cardId);

  const taskText = document.createElement("p");
  taskText.id = `task-${cardId}`;
  taskText.innerHTML = text;
  card.prepend(taskText);
};
