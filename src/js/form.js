export default function handleFormOpen(form) {
  form.style.display = "block";
}

export function closeForm(form, input) {
  input.value = "";
  form.style.display = "none";
}

export function unlockAddButton(button, e) {
  const value = e.target.value;
  if (value) {
    button.removeAttribute("disabled");
  } else {
    button.setAttribute("disabled", "true");
  }
}
