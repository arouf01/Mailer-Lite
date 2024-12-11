let isFieldsFetched = false;

// Function For Calling Next Section After Enter API Keys
function taskSection() {
  document.getElementById("enterAPIKeySection").classList.remove("active");
  document.getElementById("chooseTaskSection").classList.add("active");
}

document
  .getElementById("chooseTaskSection")
  .addEventListener("change", function (e) {
    let getTask = e.target.value;
    // console.log(getTask);

    if (getTask == "createGroup") {
      document.getElementById("logout").classList.add("hide");
      document.getElementById("subscribeSection").classList.remove("active");
      document.getElementById("createGroupSection").classList.add("active");
    } else if (getTask == "newSubscriber") {
      document.getElementById("logout").classList.add("hide");
      document.getElementById("createGroupSection").classList.remove("active");
      document.getElementById("subscribeSection").classList.add("active");
      if (!isFieldsFetched) {
        fetchFields();
        isFieldsFetched = true;
      }
    } else {
      document.getElementById("logout").classList.remove("hide");
      document.getElementById("createGroupSection").classList.remove("active");
      document.getElementById("subscribeSection").classList.remove("active");
    }
  });
