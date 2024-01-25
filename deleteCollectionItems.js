const https = require('https');
const collectionId = '6577d832bc98530c12441949'; // Staff picks collection
const apiToken = '4a64d72de5a4043662205c6e093adde8c1221bf7370bf04eaf559fc6585a23ac'; // Replace with your Webflow API token

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

function deleteItem(itemId) {
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

deleteAllItems();
