// Getting Data Form The Form and Creating Object
async function subscribe() {
  document.getElementById("subscribe").disabled = true;

  // Getting Value From Form's Fields
  const email = document.getElementById("email").value;
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  let groupID = document.getElementById("dropdown").value;

  // If there is No Group Selected
  groupID = groupID === "Select Group" ? [] : [groupID];

  // Mapping and Checking If There Is Any Email
  let data;
  if (email) {
    data = {
      email: email,
      fields: {
        name: firstName,
        last_name: lastName,
      },
      groups: groupID,
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
