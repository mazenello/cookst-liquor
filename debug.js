const https = require('https');

// Configuration
const webflowCollectionId = '6577d832bc98530c12441949'; // Replace with your Webflow collection ID
const webflowApiToken = '4a64d72de5a4043662205c6e093adde8c1221bf7370bf04eaf559fc6585a23ac'; // Replace with your Webflow API token
const barnetApiUrl = 'https://barnetnetwork.com/api/shop/404-97/products?is_best_seller=true';

// Helper function to make HTTP requests
function httpRequest(options, data = null) {
    return new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {
            let responseData = '';
            res.on('data', (chunk) => {
                responseData += chunk;
            });
            res.on('end', () => {
                resolve(responseData ? JSON.parse(responseData) : {});
            });
        });
        req.on('error', (error) => {
            reject(error);
        });
        if (data) {
            req.write(data);
            console.log(data);
        }
        req.end();
    });
}

// Fetch items from Barnet API
async function fetchBarnetBestSellers() {
    const options = {
        method: 'GET',
        hostname: 'www.barnetnetwork.com',
        path: `api/shop/404-97/products?is_best_seller=true`,
        headers: { 'Content-Type': `application/json; charset=UTF-8`}
    };
    return httpRequest(options);
}

fetchBarnetBestSellers();
