
// Declaring API KEY
var APIKey;

// Checkiing If API Key In Local Storage
window.onload = () => {
    APIKey = localStorage.getItem('mailerLite-apiKey');

    if (APIKey !== null) {
        if (!document.getElementById("section2").classList.contains("active")) {
            nextBtn();
            nextSection();
        }
    }
};


// Function For Calling Next Section
function nextSection() {
    document.getElementById("section1").classList.remove("active");
    document.getElementById("section2").classList.add("active");
}


// Check If the API is Correct And Getting the Groups
async function nextBtn() {

    document.getElementById('nextBtn').disabled = true;

    APIKey = document.getElementById('apiKey').value || localStorage.getItem('mailerLite-apiKey');


    try {

        // MailerLite Get Groups URL
        let url = 'https://connect.mailerlite.com/api/groups';
        // Preparing To Send Information to FetchFunction
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${APIKey}`
            }
        };

        // Calling The FetchFunction For Get Groups
        let getAllGroups = await fetchFunction(url, options);

        let getMailerLiteGroups = await getAllGroups.json()
        let allMailerLiteGroups = getMailerLiteGroups.data;
        //console.log(allMailerLiteGroups)

        // Checking The Response
        if (getAllGroups.ok) {

            document.getElementById('connected').innerText = 'Connected';

            // Getting Groups and Adding to the Drop-Down
            let groups = document.getElementById('dropdown');

            for (let i = 0; i < allMailerLiteGroups.length; i++) {
                let getGroupName = allMailerLiteGroups[i].name;
                let getGroupID = allMailerLiteGroups[i].id;
                //console.log(getGroupName,getGroupID)

                let createElementOptions = `<option value="${getGroupID}">${getGroupName}</option>`

                groups.innerHTML += createElementOptions;
            }

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
    document.getElementById("nextBtn").disabled = false;
}


// Refresh Groups Button
function refreshGroups() {
    document.getElementById("refreshbtn").disabled = true;
    document.getElementById('dropdown').innerHTML = `<option>Select Group</option>`;
    nextBtn();

}