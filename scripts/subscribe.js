
// Getting Data Form The Form and Creating Object
async function subscribe() {

    document.getElementById("subscribe").disabled = true;

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
    //console.log(data)

    // Trying To Subscribe In MailerLite
    try {

        // MailerLite Subscriber POST URL
        let url = 'https://connect.mailerlite.com/api/subscribers';
        // Preparing To Send Information to FetchFunction
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${APIKey}`
            },
            body: JSON.stringify(data)
        }

        // Calling The FetchFunction For Create a Subscriber
        let response = await fetchFunction(url, options);

        // Checking The Response
        if (response.ok) {

            document.getElementById('successOrError').innerText = 'Success';

            setTimeout(() => {
                clearForm();
            }, 1500);

        }
        else {
            document.getElementById('successOrError').innerText = 'Failed To Subscribe';
        }
    }

    // Catching
    catch (error) {
        console.log('Subscribe Failed');
    }

    document.getElementById("subscribe").disabled = false;

}

