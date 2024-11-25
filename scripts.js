// Checkiing If API Key In Local Storage
window.onload = () => {
    let getAPIKeyFromLocalStroge = localStorage.getItem('mailerLite-apiKey');

    if (getAPIKeyFromLocalStroge !== null) {
        if (!document.getElementById("section2").classList.contains("active")) {
            nextBtn()
            nextSection();
        }
    }
};


// Function For Calling Next Section
function nextSection() {
    document.getElementById("section1").classList.remove("active");
    document.getElementById("section2").classList.add("active");
}



var APIKey;
// Check If the API is Correct
async function nextBtn() {

    APIKey = document.getElementById('apiKey').value || localStorage.getItem('mailerLite-apiKey');
    try {
        let getAllGroups = await fetch('https://connect.mailerlite.com/api/groups', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${APIKey}`
            }
        });
        //console.log(getAllGroups);

        let getMailerLiteGroups = await getAllGroups.json()
        let allMailerLiteGroups = getMailerLiteGroups.data;
        //console.log(allMailerLiteGroups)


        if (getAllGroups.ok) {

            let groups = document.getElementById('dropdown');

            for (let i = 0; i < allMailerLiteGroups.length; i++){
                let getGroupName = allMailerLiteGroups[i].name;
                let getGroupID = allMailerLiteGroups[i].id;
                //console.log(getGroupName,getGroupID)

                let createElementOptions = `<option id = "${getGroupName}" value="${getGroupID}">${getGroupName}</option>`

                groups.innerHTML += createElementOptions;
            }
            
            document.getElementById('connected').innerText = 'Connected';

            // Storing API Key to Local DataBase
            localStorage.setItem('mailerLite-apiKey', APIKey);
            setTimeout(() => {
                nextSection();
            }, 1500);
            

            
        }
        else {
            document.getElementById('connected').innerText = 'Invalid API Key';
        }
    }
    catch (error) {
        console.log('Please Check Your API Key!');
    }
    document.getElementById("refreshbtn").disabled = false;
}


// Refresh Groups Button
function refreshGroups() {
    document.getElementById("refreshbtn").disabled = true;
    document.getElementById('dropdown').innerHTML = `<option>Select Group</option>`;
    nextBtn();

}


// Getting Data Form The Form and Creating Object
async function subscribe() {

    // Getting API key From Field or From DataBase
    const APIKey = document.getElementById('apiKey').value || localStorage.getItem('mailerLite-apiKey')

    // Getting Value From Form's Fields
    const email = document.getElementById("email").value;
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    let groupID = document.getElementById("dropdown").value;

    // If there is No Group Selected
    groupID = groupID === 'Select Group' ? [] : [groupID];
    
    // Mapping Data
    let data = {
        email: email,
        fields: {
            name: firstName,
            last_name: lastName
        },
        groups: groupID
    }

    console.log(data)

    // Trying To Subscribe In MailerLite
    try {
        const response = await fetch('https://connect.mailerlite.com/api/subscribers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${APIKey}`
            },
            body: JSON.stringify(data)
        });
        //const success = await response.json()
        if (response.ok) {
            document.getElementById('successOrError').innerText = 'Success';

            setTimeout(() => {
                clearForm();
            }, 1500);


        }
        else {
            document.getElementById('successOrError').innerText = 'Enter a Valid Email Address';
        }

    }

    // Catching
    catch (error) {
        console.log('Subscribe Failed', error);
    }

}



// Function For Clearing The Form
function clearForm() {
    document.getElementById("email").value = '';
    document.getElementById("firstName").value = '';
    document.getElementById("lastName").value = '';
    document.getElementById('successOrError').innerText = '';
    document.getElementById("dropdown").value = 'Select Group';
}


// Logout Function and Clear Local Storage
function logOut() {
    localStorage.clear();
    location.reload();
}
