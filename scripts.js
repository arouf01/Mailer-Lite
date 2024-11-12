function nextSection() {
    document.getElementById("section1").classList.remove("active");
    document.getElementById("section2").classList.add("active");
}

// Get API Key and Check If connection is Okay
document.getElementById('apiKey').addEventListener('keyup', async function (event) {
    const APIKey = event.target.value;
    //console.log(APIKey);
    checkAPIKey(APIKey);

});

// Check If the API is Correct
async function checkAPIKey(APIKey) {
    try {
        const response = await fetch('https://connect.mailerlite.com/api/subscribers', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${APIKey}`
            }
        });
        //console.log(response.status)
        if (response.status === 200) {
            document.getElementById('showStatus').innerText = 'Connected';
            document.getElementById('nextBtn').removeAttribute('disabled');

            // Storing API Key to Local DataBase
            localStorage.setItem('api-key', APIKey);

        }
        else {
            document.getElementById('nextBtn').addAttribute('disabled');
            document.getElementById('showStatus').innerText = 'Wrong API Key';
        }
    }
    catch (error) {
        console.log('Checking API Failed', error);
    }

}

// Calling Function to Fetch Group Form MailerLite
function nextBtn() {
    fetchGroup();
}

// Fetching All Groups From MailerLite and Add It To The From 
async function fetchGroup() {

    // Getting API key From Field or From DataBase
    const APIKey = document.getElementById('apiKey').value || localStorage.getItem('api-key');
    try {
        let getAllGroups = await fetch('https://connect.mailerlite.com/api/groups', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${APIKey}`
            }
        });
        const response = await getAllGroups.json()
        const getGroups = response.data;
        let getGroupFromHTML = document.getElementById("dropdown");

        for (let i = 0; i < getGroups.length; i++) {
            let groupName = getGroups[i].name;
            let groupID = getGroups[i].id;
            let createElementOptions = `<option id = "${groupName}" value="${groupID}">${groupName}</option>`
            getGroupFromHTML.innerHTML += createElementOptions;
        }
    }
    catch (error) {
        console.log('Group Fetched Failed', error);
    }

}


// Getting Data Form The Form and Creating Object
async function subscribe() {

    // Getting API key From Field or From DataBase
    const APIKey = document.getElementById('apiKey').value || localStorage.getItem('api-key')

    // Getting Value From Form's Fields
    const email = document.getElementById("email").value;
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const groupID = document.getElementById("dropdown").value;

    // Mapping Data
    let data = {
        email: email,
        fields: {
            name: firstName,
            last_name: lastName
        },
        groups: [groupID]
    }

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
        const success = await response.json()
        if (response.status === 201) {
            document.getElementById('successOrError').innerText = 'Success';

            setTimeout(() => {
                clearForm();
            }, 3000);


        }
        else {
            document.getElementById('successOrError').innerText = 'The email field must be a valid email address.';

            setTimeout(() => {
                clearForm();
            }, 3000);
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
    document.getElementById("dropdown").value = 'Select Group'
}


// Checkiing If API Key In Local Storage
window.onload = () => {
    let getAPIKeyFromLocalStroge = localStorage.getItem('api-key');

    if (getAPIKeyFromLocalStroge !== null) {
        if (!document.getElementById("section2").classList.contains("active")) {
            nextSection();
            fetchGroup();
        }
    }
};

// Logout Function and Clear Local Storage
function logOut() {
    localStorage.clear();
    location.reload();
}

