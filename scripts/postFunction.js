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
