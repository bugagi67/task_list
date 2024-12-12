import addTask from "../task";

export default function saveResult() {
  const store = {
    TODO: getTaskItems(".todo__container").map((item) => item.textContent),
    PROGRESS: getTaskItems(".inProgress__container").map(
      (item) => item.textContent,
    ),
    DONE: getTaskItems(".done__container").map((item) => item.textContent),
  };
  setLocalStorage(store);
}

export function initLists(taskList) {
  const store = JSON.parse(localStorage.getItem("store"));

  if (store) {
    populateTasks(taskList[0], store.TODO);
    populateTasks(taskList[1], store.PROGRESS);
    populateTasks(taskList[2], store.DONE);
  }
}

export function setLocalStorage(store) {
  localStorage.setItem("store", JSON.stringify(store));
}

export function getTaskItems(containerClass) {
  return Array.from(document.querySelectorAll(`${containerClass} .task__item`));
}

export function populateTasks(taskList, tasks) {
  tasks.forEach((task) => addTask(task, taskList));
}
