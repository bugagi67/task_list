import initializeDragAndDrop from "../js/utils/dragAndDrop";
import { initLists } from "../js/utils/storage";
import { createPlaceholder, onDragOver, onDrop } from "../js/utils/dragAndDrop";
import handleFormOpen, { closeForm, unlockAddButton } from "./form";
import addTask, { removeItem, removeTaskColumn, showRemoveBtn } from "./task";

export default function main() {
  const taskLists = document.querySelectorAll(".task__list");

  taskLists.forEach((taskList) => {
    taskList.addEventListener("dragover", onDragOver);
    taskList.addEventListener("drop", onDrop);
  });

  initializeUi();
  setupEventListener(taskLists);
  initLists(taskLists);
}

function setupEventListener(taskLists) {
  const btnAddCard = document.querySelector(".btn__add-card");
  const btnCreate = document.querySelector(".button__add");
  const textarea = document.querySelector(".text__new-task");
  const form = document.querySelector(".form");
  const btnCancel = document.querySelector(".button__cancel");

  btnAddCard.addEventListener("click", () => handleFormOpen(form));
  textarea.addEventListener("input", (e) => unlockAddButton(btnCreate, e));
  textarea.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      addTask(textarea, taskLists[0]);
      closeForm(form, textarea);
      unlockAddButton(btnCreate, e);
    }
  });
  btnCreate.addEventListener("click", (e) => {
    addTask(textarea, taskLists[0]);
    closeForm(form, textarea);
    unlockAddButton(btnCreate, e);
  });

  btnCancel.addEventListener("click", () => closeForm(form, textarea));
}

function initializeUi() {
  initializeDragAndDrop();
  createPlaceholder();
  removeTaskColumn();
  showRemoveBtn();
  removeItem();
}
