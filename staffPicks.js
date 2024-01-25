const https = require('http');

// Cook st liquor store id
const shopId = "404-97"

// Barnett base URL with shop ID
const apiUrl = 'http://barnetnetwork.com/api/shop/'+ shopId + "/products";

// Best Seller URL
const bestSellerUrl = apiUrl+"?is_best_seller=true"

// Featured URL 
const featuredUrl = apiUrl+"?is_featured=true"

// Staff picks Url
const staffPicksUrl = apiUrl+"?is_staff_picks=true"

// Function to make the GET request
function getApiData(url) {
  https.get(url, (res) => {
    let data = '';

    // A chunk of data has been received.
    res.on('data', (chunk) => {
      data += chunk;
    });

    // The whole response has been received. Print out the result.
    res.on('end', () => {
      try {
        const parsedData = JSON.parse(data);
        console.log(parsedData);
      } catch (e) {
        console.error(e.message);
      }
    });

  }).on("error", (err) => {
    console.error("Error: " + err.message);
  });
}

async function fetchData(url) {
    try {
        // Fetch data from the provided URL
        let response = await fetch(url);

        // Check if the request was successful
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse the response body (assuming it's JSON)
        let data = await response.json();

        // Use the parsed data
        // console.log(data);
        return data;
    } catch (error) {
        console.error('Error fetching data: ', error);
    }
}

fetchData(staffPicksUrl).then(function(staffPicks){
    console.log(staffPicks);    
})
