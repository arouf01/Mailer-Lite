function nextSection() {
    document.getElementById("section1").classList.remove("active");
    document.getElementById("section2").classList.add("active");
}

// Get API Key and Check If connection is Okay
document.getElementById('apiKey').addEventListener('keyup', async function (e) {
    const APIKey = e.target.value;
    //console.log(APIKey);
    checkAPIKey(APIKey);

});


// Check If the API is Correct
const baseUrl = 'https://connect.mailerlite.com/api/subscribers';

async function checkAPIKey(APIKey) {
    try {
        const response = await fetch(baseUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${APIKey}`
            }
        });
        //const data = await response.json();
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
        console.error('Invalid API Key');
    }
}


// Getting Data Form The Form and Creating Object
async function subscribe() {

    // Getting API key From Field or From DataBase
    let APIKey = document.getElementById('apiKey').value || localStorage.getItem('api-key');

    // Getting Value From Form's Fields
    const email = document.getElementById("email").value;
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;

    // Mapping Data
    let data = {
        email: email,
        fields: {
            name: firstName,
            last_name: lastName
        }
    }

    try {
        const response = await fetch(baseUrl, {
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
    catch (error) {
        console.log('Subscribe Failed');
    }
}

function clearForm() {
    document.getElementById("email").value = '';
    document.getElementById("firstName").value = '';
    document.getElementById("lastName").value = '';
    document.getElementById('successOrError').innerText = '';
}


window.onload = () => {
    let getAPIKeyFromLocalStroge = localStorage.getItem('api-key');

    if (getAPIKeyFromLocalStroge !== null) {
        nextSection()
    }
};

function logOut() {
    localStorage.clear();
    location.reload();
}