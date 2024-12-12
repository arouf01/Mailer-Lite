// Check If the API is Correct And Getting the Groups For Subscriber And For Delete Group
async function getGroups() {
  document.getElementById("nextBtn").disabled = true;

  APIKey =
    document.getElementById("apiKey").value ||
    localStorage.getItem("mailerLite-apiKey");

  try {
    // MailerLite Get Groups URL
    let url = "https://connect.mailerlite.com/api/groups";

    // Calling The FetchFunction For Get Groups
    let getAllGroups = await fetchFunction(url);
    // Converting to JSON
    let getMailerLiteGroups = await getAllGroups.json();
    //Getting Data
    let allMailerLiteGroups = getMailerLiteGroups.data;
    //console.log(allMailerLiteGroups)

    // Checking The Response
    if (getAllGroups.ok) {
      document.getElementById("connected").innerText = "Connected";

      // Getting Groups and Adding to the Drop-Down
      let groups = document.getElementById("dropdown");
      // Getting Groups and Adding to the Delete Subscriber Section
      let deleteSubscriber = document.getElementById("deleteGroupList");

      for (let i = 0; i < allMailerLiteGroups.length; i++) {
        let getGroupName = allMailerLiteGroups[i].name;
        let getGroupID = allMailerLiteGroups[i].id;
        //console.log(getGroupName,getGroupID)

        let createElementOptions = `<option value="${getGroupID}">${getGroupName}</option>`;

        groups.innerHTML += createElementOptions;
        deleteSubscriber.innerHTML += createElementOptions;
      }

      // Storing API Key to Local DataBase
      localStorage.setItem("mailerLite-apiKey", APIKey);

      setTimeout(() => {
        taskSection();
      }, 1500);
    } else {
      document.getElementById("connected").innerText = "Invalid API Key";
    }
  } catch (error) {
    console.log("Please Check Your API Key!");
  }
  document.getElementById("reFreshGroups").disabled = false;
  document.getElementById("refreshGroupListBtn").disabled = false;
  document.getElementById("nextBtn").disabled = false;
}

// Delete Group Function
let deleteGroupUrl = "https://connect.mailerlite.com/api/groups/";
async function deleteGroup() {
  let getGroupID = document.getElementById("deleteGroupList").value;
  // Calling Delete Function
  let response = await deleteFunction(deleteGroupUrl, getGroupID);
  if (response.ok) {
    alert("Group Deleted Successfully.");
    document.getElementById("deleteGroupList").value = "Select a Group";
    removeOption(getGroupID);
  } else {
    alert("Failed To Delete! / Already Deleted!");
  }
}

// Refresh Groups Button
function refreshGroups() {
  document.getElementById("reFreshGroups").disabled = true;
  document.getElementById("refreshGroupListBtn").disabled = true;
  document.getElementById(
    "dropdown"
  ).innerHTML = `<option>Select a Group</option>`;
  document.getElementById(
    "deleteGroupList"
  ).innerHTML = `<option>Select a Group</option>`;
  getGroups();
}
