// Create New Field and Delete Field Script

// Declare Map and URL
let data = {};
let url = "https://connect.mailerlite.com/api/fields";

// Create Field Function When Click on Create Field
function createField() {
  let getFieldType = document.getElementById("fieldType").value || "text";
  let getFieldName =
    document.querySelector("#createInputField>input").value || "No Name";

  // Mapping Fields
  data = {
    name: getFieldName,
    type: getFieldType,
  };
  //console.log(data);

  // Function For Create Field
  (async () => {
    // Calling Post Function
    let response = postFunction(url, data);
    let getResponse = await response;
    //console.log(getResponse);

    // Checking Response
    if (getResponse.ok) {
      alert("Field Created Successfully!");
      document.getElementById("fieldType").value = "text";
      document.querySelector("#createInputField>input").value = "";
    } else {
      alert("Failed To Create a Field!");
    }
  })();
}
