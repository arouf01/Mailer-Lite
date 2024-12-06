// Create Group Function
async function createGroup() {
  document.getElementById("createGroupButton").disabled = true;

  let groupName = document.getElementById("groupName").value;

  // Mapping and Checking If There Is Any Group Name
  let data;
  if (groupName) {
    data = {
      name: groupName,
    };
  } else {
    alert("Please Enter Group Name!");
    document.getElementById("createGroupButton").disabled = false;
  }

  // URL For Create Groups
  let url = "https://connect.mailerlite.com/api/groups";
  // Calling The postFunction To Create Group
  let response = await postFunction(url, data);
  // Converting To JSON
  let getResponse = await response.json();

  // Checking If Response and Setting Inner Text
  if (getResponse.data.id) {
    document.getElementById("createGroupStatus").innerText =
      "Group Created Successfully";
  } else {
    document.getElementById("createGroupStatus").innerText =
      "Unable to Create Group";
  }

  document.getElementById("createGroupButton").disabled = false;
  // Clearing The Group Name Form
  setTimeout(() => {
    document.getElementById("groupName").value = "";
    document.getElementById("createGroupStatus").innerText = "";
  }, 2500);
}
