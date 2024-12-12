import saveResult from "./utils/storage";
import { onDragStart, onDragEnd } from "../js/utils/dragAndDrop";

export default function addTask(textarea, list) {
  const task = createTask(textarea);
  addTaskToList(task, list);
  saveResult();
}

export function addTaskToList(task, list) {
  list.append(task);
  task.draggable = true;
  task.addEventListener("dragstart", onDragStart);
  task.addEventListener("dragend", onDragEnd);
  showRemoveBtn();
  removeItem();
}

export function createTask(textarea) {
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

export function removeItem() {
  const removeTask = document.querySelectorAll(".delete__task-button");
  removeTask.forEach((element) => {
    element.addEventListener("click", (e) => {
      const item = e.target.parentNode;
      item.remove();
    });
  });
}

export function removeTaskColumn() {
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

export function showRemoveBtn() {
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
