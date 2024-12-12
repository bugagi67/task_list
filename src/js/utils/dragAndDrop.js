import saveResult from "./storage";

let draggedElement = null;
let placeholder = null;

export default function initializeDragAndDrop() {
  const taskItems = document.querySelectorAll(".task__item");
  taskItems.forEach((item) => {
    item.draggable = true;
    item.addEventListener("dragstart", onDragStart);
    item.addEventListener("dragend", onDragEnd);
  });
}

export function createPlaceholder() {
  const placeholder = document.createElement("li");
  placeholder.classList.add("placeholder");
  return placeholder;
}

export function onDragStart(e) {
  draggedElement = e.target;
  if (draggedElement) {
    e.dataTransfer.effectAllowed = "move";
    setTimeout(() => {
      draggedElement.classList.add("hidden");
    }, 0);
  }
}

export function onDragOver(e) {
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

export function onDrop(e) {
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

export function onDragEnd(e) {
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
