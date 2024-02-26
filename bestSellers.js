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

        return data;
    } catch (error) {
        console.error('Error fetching data: ', error);
    }
}

async function getBestSellers() {
  return fetchData(bestSellerUrl)
}

module.exports = { getBestSellers } 
