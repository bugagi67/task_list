let draggedElement = null;
let placeholder = null;

export default function main() {
  const btnAddCard = document.querySelector(".btn__add-card");
  const form = document.querySelector(".form");
  const btnCreate = document.querySelector(".button__add");
  const textarea = document.querySelector(".text__new-task");
  const taskLists = document.querySelectorAll(".task__list");

  taskLists.forEach((taskList) => {
    taskList.addEventListener("dragover", onDragOver);
    taskList.addEventListener("drop", onDrop);
  });

  btnAddCard.addEventListener("click", (e) => {
    e.preventDefault();
    form.style.display = "block";
  });

  textarea.addEventListener("input", (e) => {
    unlockAddButton(btnCreate, e);
  });

  textarea.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      addTask(textarea, taskLists[0]);
      closeForm(form, textarea);
      unlockAddButton(btnCreate, e);
    }
  });

  btnCreate.addEventListener("click", (e) => {
    e.preventDefault();
    addTask(textarea, taskLists[0]);
    closeForm(form, textarea);
    unlockAddButton(btnCreate, e);
  });

  createPlaceholder();
  showRemoveBtn();
  initializeDragAndDrop();
  removeItem();
  removeTaskColumn();
  initLists(taskLists);
}

function addTask(textarea, list) {
  const task = createTask(textarea);
  list.append(task);

  task.draggable = true;
  task.addEventListener("dragstart", onDragStart);
  task.addEventListener("dragend", onDragEnd);

  showRemoveBtn();
  removeItem();
  saveResult();
}

function createTask(textarea) {
  const newTask = document.createElement("li");
  newTask.classList.add("task__item", "task");
  newTask.draggable = true;
  const btnDel = document.createElement("img");
  btnDel.classList.add("delete__task-button");
  btnDel.src = "./assets/image/remove_item.png";
  newTask.textContent =
    typeof textarea === "string" ? textarea : textarea.value;
  newTask.append(btnDel);

  return newTask;
}

function unlockAddButton(button, e) {
  const value = e.target.value;
  if (value) {
    button.removeAttribute("disabled");
  } else {
    button.setAttribute("disabled", "true");
  }
}

function closeForm(form, input) {
  input.value = "";
  form.style.display = "none";
}

function removeItem() {
  const removeTask = document.querySelectorAll(".delete__task-button");
  removeTask.forEach((element) => {
    element.addEventListener("click", (e) => {
      const item = e.target.parentNode;
      item.remove();
    });
  });
}

function removeTaskColumn() {
  const removeAllTaskColumn = document.querySelectorAll(".toggle__option");
  removeAllTaskColumn.forEach((element) => {
    element.addEventListener("click", (e) => {
      const allTask =
        e.target.parentNode.parentNode.querySelectorAll(".task__item");
      allTask.forEach((item) => {
        item.remove();
      });
    });
  });
}

function showRemoveBtn() {
  const taskItems = document.querySelectorAll(".task__item");

  taskItems.forEach((item) => {
    item.addEventListener("mouseover", () => {
      item.querySelector(".delete__task-button").style.display = "block";
    });
    item.addEventListener("mouseout", () => {
      item.querySelector(".delete__task-button").style.display = "none";
    });
  });
}

function initializeDragAndDrop() {
  const taskItems = document.querySelectorAll(".task__item");
  taskItems.forEach((item) => {
    item.draggable = true;
    item.addEventListener("dragstart", onDragStart);
    item.addEventListener("dragend", onDragEnd);
  });
}

function createPlaceholder() {
  const placeholder = document.createElement("li");
  placeholder.classList.add("placeholder");
  return placeholder;
}

function onDragStart(e) {
  draggedElement = e.target;
  if (draggedElement) {
    e.dataTransfer.effectAllowed = "move";
    setTimeout(() => {
      draggedElement.classList.add("hidden");
    }, 0);
  }
}

function onDragOver(e) {
  e.preventDefault();
  const target = e.target;

  const taskList = target.closest(".task__list");

  if (taskList && draggedElement) {
    const taskItems = taskList.querySelectorAll(".task__item");

    if (taskItems.length === 0) {
      if (!taskList.contains(placeholder)) {
        placeholder = placeholder || createPlaceholder();
        taskList.appendChild(placeholder);
      }
    } else if (
      target &&
      target.classList.contains("task__item") &&
      target !== draggedElement
    ) {
      const bounding = target.getBoundingClientRect();
      const offset = e.clientY - bounding.top;

      if (!placeholder) {
        placeholder = createPlaceholder();
      }

      if (offset < bounding.height / 2) {
        if (!taskList.contains(placeholder)) {
          taskList.appendChild(placeholder);
        }
        target.parentNode.insertBefore(placeholder, target);
      } else {
        if (!taskList.contains(placeholder)) {
          taskList.appendChild(placeholder);
        }
        target.parentNode.insertBefore(placeholder, target.nextSibling || null);
      }
    }
  }
}

function onDrop(e) {
  e.preventDefault();
  const targetList = e.target.closest(".task__list");
  if (targetList && draggedElement) {
    targetList.insertBefore(draggedElement, placeholder);
    draggedElement.classList.remove("hidden");
    draggedElement = null;
  }

  if (placeholder) {
    placeholder.remove();
    placeholder = null;
  }
}

function onDragEnd(e) {
  e.preventDefault();
  if (draggedElement) {
    draggedElement.classList.remove("hidden");
    draggedElement = null;
  }

  if (placeholder) {
    placeholder.remove();
    placeholder = null;
  }
  saveResult();
}

function saveResult() {
  const store = {
    TODO: [],
    PROGRESS: [],
    DONE: [],
  };

  const taskLists = document.querySelectorAll(".task__list");

  taskLists.forEach((item) => {
    if (item.closest(".todo__container")) {
      const listElements = item.querySelectorAll(".task__item");
      listElements.forEach((element) => {
        store.TODO.push(element.textContent);
      });
    } else if (item.closest(".inProgress__container")) {
      const listElements = item.querySelectorAll(".task__item");
      listElements.forEach((element) => {
        store.PROGRESS.push(element.textContent);
      });
    } else {
      const listElements = item.querySelectorAll(".task__item");
      listElements.forEach((element) => {
        store.DONE.push(element.textContent);
      });
    }
  });
  setLocalStorage(store);
  return store;
}

function initLists(taskList) {
  if (localStorage) {
    const store = JSON.parse(localStorage.getItem("store"));

    const [todo, progress, done] = taskList;

    if (store.TODO.length > 0) {
      store.TODO.forEach((element) => {
        addTask(element, todo);
      });
    }
    if (store.PROGRESS.length > 0) {
      store.PROGRESS.forEach((element) => {
        addTask(element, progress);
      });
    }
    if (store.DONE.length > 0) {
      store.DONE.forEach((element) => {
        addTask(element, done);
      });
    }
  }
}

function setLocalStorage(store) {
  localStorage.setItem("store", JSON.stringify(store));
}
