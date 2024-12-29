// Create New Field and Delete Field Script

//URL
let url = "https://connect.mailerlite.com/api/fields/";

// Create Field Function When Click on Create Field Button
function createField() {
  let getFieldType = document.getElementById("fieldType").value || "text";
  let getFieldName = document.querySelector("#createInputField>input").value;

  // Checking If There Field Name
  if (getFieldName) {
    // Mapping Fields
    let data = {
      name: getFieldName,
      type: getFieldType,
    };

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
  } else {
    alert("Input Your Field Name");
  }
}

// Delete Field Function When Click on Delete Field Button
function deleteField() {
  let getFieldID = document.getElementById("deleteAField").value;

  if (getFieldID && getFieldID !== "SelectAField") {
    (async () => {
      let response = await deleteFunction(url, getFieldID);
      if (response.ok) {
        alert("Field Deleted");
        removeOption(getFieldID);
      }
    })();
  } else {
    alert("Select a Field");
  }
}
