
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, "../data/requests.json");


let operationQueue = [];


async function processQueue() {
    if (operationQueue.length > 0) {
        const operation = operationQueue.shift();  // Dequeue the operation
        try {
            const result = await operation();  // Await the operation directly
            return result; 
        } catch (error) {
            console.error('Operation failed:', error);  // Handle any errors
        } finally {
            // Recursively call processQueue to handle the next item in the queue
            if (operationQueue.length > 0) {
                return await processQueue();  // Await this to ensure synchronous queue processing
            }                      
        }
    }
}



async function addToQueue(operation) {
    operationQueue.push(operation);  // Add the operation to the queue

    if (operationQueue.length === 1) {
        return await processQueue();  // Start processing if it's the only operation
    }
}




const readRequests = async () => {
    return await addToQueue(async () => {
        try {
        
            const data = await fs.promises.readFile(filePath, 'utf8');  

            if (!data || data.trim() === '') {
                return [];  
            }
            
            const requests = JSON.parse(data);  
            
            return requests;

        } catch (err) {
            if (err.code === 'ENOENT') {
                return [];  // Return an empty array if file not found
            } else {
                throw new Error(`Error reading file: ${err.message}`);
            }
        }
    });
};



const writeRequests = async (requests) => {
    return addToQueue(async () => {
        try {
            await fs.promises.writeFile(filePath, JSON.stringify(requests, null, 2));  // Use fs.promises.writeFile
        } catch (err) {
            throw new Error(`Error writing file: ${err.message}`);
        }
    });
};


module.exports = { readRequests, writeRequests };

