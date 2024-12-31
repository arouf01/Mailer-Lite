// Function For Clearing The Form
function clearForm() {
  document.querySelector("#dropdown>option:first-child").selected = true;
  document.getElementById("subscriberStatus").innerText = "";
  let form = document.querySelector("form");
  form.reset();
}

// Logout Function and Clear Local Storage
function logOut() {
  localStorage.clear();
  location.reload();
}

// Reset Inner HTML
function resetInnerHTML() {
  let element = document.querySelector("form");
  element.innerHTML = `<label for="email">Email:</label>
  <input type="email" id="email" placeholder="Email"/>`;

  document.getElementById(
    "deleteAField"
  ).innerHTML = `<option value="SelectAField" selected>Select A Field</option>`;
}

// Remove Option Function From Inner HTML
function removeOption(ID) {
  let option = document.querySelector(`option[value="${ID}"]`);
  if (option) {
    option.remove();
  }
}
