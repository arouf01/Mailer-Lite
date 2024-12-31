// Getting Data Form The Form and Creating Object
async function subscribe() {
  document.getElementById("subscribe").disabled = true;

  // Getting Value From Form's Fields
  const email = document.getElementById("email").value;
  let groupID = document.getElementById("dropdown").value;

  let fields = fieldMapping();

  // If there is No Group Selected
  let getGroupID = groupID === "SelectGroup" ? [] : [groupID];

  // Mapping and Checking If There Is Any Email
  let data;
  if (email) {
    data = {
      email: email,
      fields: fields,
      groups: getGroupID,
    };
  } else {
    alert("The email field is required");
    document.getElementById("subscribe").disabled = false;
  }

  // MailerLite Subscriber POST URL
  let url = "https://connect.mailerlite.com/api/subscribers";

  // Calling The Post Function For Create a Subscriber
  let response = await postFunction(url, data);
  // Converting To JSON
  let getResponse = await response.json();

  // Checking The Response
  if (getResponse.data.id) {
    document.getElementById("subscriberStatus").innerText = "Success";

    setTimeout(() => {
      clearForm();
    }, 1500);
  } else {
    document.getElementById("subscriberStatus").innerText =
      "Failed To Subscribe";
  }

  document.getElementById("subscribe").disabled = false;
}
