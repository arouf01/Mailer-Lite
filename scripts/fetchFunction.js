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
