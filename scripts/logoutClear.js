// Function For Clearing The Form
function clearForm() {
  document.getElementById("dropdown").value = "Select Group";
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
  element.innerHTML = `<input type="email" id="email" placeholder="Email"/>`;
}
