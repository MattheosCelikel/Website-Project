/**
 * @requires spinner.js
 * @description Fetches external data via http request and creates a spinner as it waits
 * @author Alexander DeJesus
 * @param {*} url 
 * @returns 
 */
async function fetchData(url) {
    try {
      showSpinner();
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      hideSpinner();

      return data;
    } catch (error) {
      console.error('Error:', error);
      hideSpinner();
    }
}

async function fetchDataWithBody(url, body) {
  try {
    showSpinner();
    console.log(JSON.stringify(body));
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    console.log(data);
    hideSpinner();

    return data;
  } catch (error) {
    console.error('Error:', error);
    hideSpinner();
  }
}