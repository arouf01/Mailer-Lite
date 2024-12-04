
// Function For Clearing The Form
function clearForm() {
    document.getElementById("email").value = '';
    document.getElementById("firstName").value = '';
    document.getElementById("lastName").value = '';
    document.getElementById('successOrError').innerText = '';
    document.getElementById("dropdown").value = 'Select Group';
}

// Logout Function and Clear Local Storage
function logOut() {
    localStorage.clear();
    location.reload();
}
