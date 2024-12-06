// Declaring API KEY
var APIKey;

// Checking If API Key In Local Storage
window.onload = () => {
  APIKey = localStorage.getItem("mailerLite-apiKey");

  if (APIKey !== null) {
    if (
      !document.getElementById("chooseTaskSection").classList.contains("active")
    ) {
      taskSection();
      getGroups();
    }
  }
};
