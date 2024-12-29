// Fetch All Fields function

let fieldFetchURL = "https://connect.mailerlite.com/api/fields";

async function fetchFields() {
  // Disabling Button and Resting Fields
  document.getElementById("refreshFields").disabled = true;
  document.getElementById("refreshFieldsBtn").disabled = true;
  resetInnerHTML();

  // Fetch Fields
  let response = await fetchFunction(fieldFetchURL);
  // Converting to JSON
  let fetchFields = await response.json();
  // Getting Data
  let allFields = fetchFields.data;
  //console.log(allFields);

  let getForm = document.getElementById("form");
  let getDeleteFieldSection = document.getElementById("deleteAField");

  for (let i = 0; i < allFields.length; i++) {
    let fieldName = allFields[i].name;
    let fieldKey = allFields[i].key;
    let fieldType = allFields[i].type;
    let fieldID = allFields[i].id;
    //console.log(fieldID);

    // For Subscriber Section Field Mapping
    let fields = `<label for=${fieldName}>${fieldName}:</label>
            <input type=${fieldType} id=${fieldKey} placeholder="Enter ${fieldName}" />`;

    getForm.innerHTML += fields;
    //console.log(fields);

    // For Delete Field Section
    let field = `<option value=${fieldID}>${fieldName}</option>`;
    getDeleteFieldSection.innerHTML += field;
  }
  document.getElementById("refreshFields").disabled = false;
  document.getElementById("refreshFieldsBtn").disabled = false;
}

// Fields Mapping Function
function fieldMapping() {
  let form = document.querySelector("form");
  let elements = form.querySelectorAll("*");

  let data = {};
  for (let i = 0; i < elements.length; i++) {
    let fieldKey = elements[i].id;
    let fieldValue = elements[i].value;
    //console.log(fieldKey, fieldValue);

    if (fieldKey !== "email") {
      data[fieldKey] = fieldValue;
    }
  }

  //console.log(data);
  return data;
}
