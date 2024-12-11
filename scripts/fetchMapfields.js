// Fetch All Fields function

let url = "https://connect.mailerlite.com/api/fields";

async function fetchFields() {
  // Disabling Button and Resting Fields
  document.getElementById("refreshFields").disabled = true;
  resetInnerHTML();

  // Fetch Fields
  let response = await fetchFunction(url);
  // Converting to JSON
  let fetchFields = await response.json();
  // Getting Data
  let allFields = fetchFields.data;
  //console.log(allFields);

  let fieldContainer = document.getElementById("form");

  for (let i = 0; i < allFields.length; i++) {
    let fieldName = allFields[i].name;
    let fieldKey = allFields[i].key;
    let fieldType = allFields[i].type;
    //console.log(fieldName, fieldKey, fieldType);

    let fields = `<input type=${fieldType} id=${fieldKey} placeholder="Enter ${fieldName}" />`;

    fieldContainer.innerHTML += fields;
    //console.log(fields);
  }
  document.getElementById("refreshFields").disabled = false;
}

// Fields Mapping Function
function fieldMapping() {
  let form = document.querySelector("form");
  let elements = form.querySelectorAll("*");

  let data = {};
  for (let i = 0; i < elements.length; i++) {
    let fieldID = elements[i].id;
    let fieldValue = elements[i].value;
    //console.log(fieldID, fieldValue);

    if (fieldID !== "email") {
      data[fieldID] = fieldValue;
    }
  }

  //console.log(data);
  return data;
}
