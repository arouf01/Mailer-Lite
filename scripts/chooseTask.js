let isFieldsFetched = false;
let isSubscriberListFetched = false;

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

    // For Create Group
    if (getTask == "createGroup") {
      // Active Section
      document.getElementById("createGroupSection").classList.add("active");
      // Hidden Section
      document.getElementById("deleteGroupSection").classList.remove("active");
      document.getElementById("logout").classList.add("hide");
      document.getElementById("subscribeSection").classList.remove("active");
      document
        .getElementById("deleteSubscriberSection")
        .classList.remove("active");
    }
    // For Delete Group
    else if (getTask == "deleteGroup") {
      // Active Section
      document.getElementById("deleteGroupSection").classList.add("active");
      // Hidden Section
      document.getElementById("logout").classList.add("hide");
      document.getElementById("createGroupSection").classList.remove("active");
      document.getElementById("subscribeSection").classList.remove("active");
      document
        .getElementById("deleteSubscriberSection")
        .classList.remove("active");
    }

    // For Create New Subscriber
    else if (getTask == "newSubscriber") {
      // Active Section
      document.getElementById("subscribeSection").classList.add("active");
      // Hidden Section
      document.getElementById("logout").classList.add("hide");
      document.getElementById("createGroupSection").classList.remove("active");
      document
        .getElementById("deleteSubscriberSection")
        .classList.remove("active");
      document.getElementById("deleteGroupSection").classList.remove("active");
      // Condition
      if (!isFieldsFetched) {
        fetchFields();
        isFieldsFetched = true;
      }
    }

    // For Delete Subscriber
    else if (getTask == "deleteSubscriber") {
      // Active Section
      document
        .getElementById("deleteSubscriberSection")
        .classList.add("active");
      // Hidden Section
      document.getElementById("logout").classList.add("hide");
      document.getElementById("createGroupSection").classList.remove("active");
      document.getElementById("subscribeSection").classList.remove("active");
      document.getElementById("deleteGroupSection").classList.remove("active");
      // Condition
      if (!isSubscriberListFetched) {
        fetchAllSubscriber();
        isSubscriberListFetched = true;
      }
    }

    // When No Task
    else {
      // Active Button
      document.getElementById("logout").classList.remove("hide");
      // Hidden Section
      document.getElementById("createGroupSection").classList.remove("active");
      document.getElementById("deleteGroupSection").classList.remove("active");
      document.getElementById("subscribeSection").classList.remove("active");
      document
        .getElementById("deleteSubscriberSection")
        .classList.remove("active");
    }
  });
