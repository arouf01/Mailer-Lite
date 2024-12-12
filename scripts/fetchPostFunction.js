// Fetch Function

async function fetchFunction(url) {
  let options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${APIKey}`,
    },
  };

  let response = await fetch(url, options);
  return response;
}

// Function For POST
async function postFunction(url, data) {
  let response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${APIKey}`,
    },
    body: JSON.stringify(data),
  });
  //   console.log(response);

  return response;
}

async function deleteFunction(url, id) {
  let response = await fetch(`${url}${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${APIKey}`,
    },
  });
  return response;
}
