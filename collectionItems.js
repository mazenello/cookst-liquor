const https = require('https');
const config = require('./config.js');
const collectionId = '65dcf5f9a06c08ea96d744bf'; // Staff picks collection
const apiToken = '9cbf7ce3892a7d2d8f2a4c7e51f6c2f8b01d5637b5be7ff628100fd16efce967'; // Replace with your Webflow API token

function getCollectionItems() {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'api.webflow.com',
            path: `/v2/collections/${collectionId}/items`,
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${apiToken}`,
                'accept-version': '1.0.0'
            }
        };

        const req = https.request(options, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                resolve(JSON.parse(data).items);
            });
        });

        req.on('error', (e) => {
            console.error(e);
            reject(e);
        });

        req.end();
    });
}

function deleteItem(itemId, collectionId) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'api.webflow.com',
            path: `/v2/collections/${collectionId}/items/${itemId}`,
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${apiToken}`,
                'accept-version': '1.0.0'
            }
        };

        const req = https.request(options, (res) => {
            res.on('data', (d) => {
                process.stdout.write(d);
            });
            res.on('end', () => {
                resolve();
            });
        });

        req.on('error', (e) => {
            console.error(e);
            reject(e);
        });

        req.end();
    });
}

function addItem(item, collectionId) {

    // Data for the new collection item
    const itemData = JSON.stringify({
        fields: {
        name: item.description, // Ensure this matches your collection's requirements
        _archived: false,
        _draft: false,
        slug: item.url
        // Add other fields as per your collection's design
        }
    });
  
    const options = {
        hostname: 'api.webflow.com',
        path: `/collections/${collectionId}/items`,
        method: 'POST',
        headers: {
        'Authorization': `Bearer ${apiToken}`,
        'accept-version': '1.0.0',
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(itemData),
        }
    };
  
    const req = https.request(options, (res) => {
        console.log(`Status Code: ${res.statusCode}`);

        res.on('data', (d) => {
            process.stdout.write(d);
        });
    });
  
    req.on('error', (e) => {
        console.error(e);
    });

    req.write(itemData);
    req.end();

}

async function deleteAllItems() {
    try {
        const items = await getCollectionItems();
        for (const item of items) {
            await deleteItem(item.id);
            console.log(`Deleted item with ID: ${item.id}`);
        }
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
}

// deleteAllItems();


module.exports = {deleteAllItems, deleteItem, addItem}