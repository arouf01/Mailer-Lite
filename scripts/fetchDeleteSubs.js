// Get All Subscriber List Function
let fetchAllSubscriberURL = "https://connect.mailerlite.com/api/subscribers";
async function fetchAllSubscriber() {
  let subscriberList = document.getElementById("subscriberList");

  let response = await fetchFunction(fetchAllSubscriberURL);
  let allSubscriber = await response.json();
  let allSubscribers = allSubscriber.data;

  for (let i = 0; i < allSubscribers.length; i++) {
    let subscriberEmail = allSubscribers[i].email;
    let subscriberID = allSubscribers[i].id;
    //console.log(subscriberID, subscriberName);

    let subscribers = `<option value=${subscriberID} >${subscriberEmail}</option>`;

    subscriberList.innerHTML += subscribers;
    //console.log(fields);
  }
  document.getElementById("refreshSubsListBtn").disabled = false;
}

// Delete Subscriber Function
let deleteURL = "https://connect.mailerlite.com/api/subscribers/";

async function deleteSubscriber() {
  let getID = document.getElementById("subscriberList").value;
  if (getID !== "Select Subscriber") {
    let response = await deleteFunction(deleteURL, getID);
    if (response.ok) {
      alert("Subscriber Deleted Successfully");
      document.getElementById("subscriberList").value = "Select a Subscriber";
      removeOption(getID);
    } else {
      alert("Failed To Delete! / Already Deleted!");
    }
  }
}

// Refresh Groups Button
function refreshSubscriberList() {
  document.getElementById("refreshSubsListBtn").disabled = true;
  document.getElementById(
    "subscriberList"
  ).innerHTML = `<option>Select a Subscriber</option>`;
  fetchAllSubscriber();
}
