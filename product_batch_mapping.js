const fs = require('fs');
const { faker } = require('@faker-js/faker');

// Define CSV headers
const headers = ["product_addr", "batch_nft_id", "event_id", "sub_batch_id"];

// Generate an array of unique event IDs in the range 17678-18667
const generateUniqueShuffledEventIds = () => {
    const eventIds = Array.from({ length: `9990` }, (_, i) => i + 156747);
    return faker.helpers.shuffle(eventIds);
};
// Function to generate CSV content
const generateCSV = () => {
    let csvRows = [headers.join(",")]; // Add headers first
    const uniqueEventIds = generateUniqueShuffledEventIds(); // Get shuffled event IDs

    uniqueEventIds.forEach(eventId => {
        const randomSubBatchId = Math.floor(Math.random() * 7); 
        const randomTokenId = Math.floor(Math.random() * 7); 
        csvRows.push(`"product metric",${randomTokenId},${eventId},${randomSubBatchId}`);
    });

    return csvRows.join("\n");
};

// Generate CSV data and write to file
const csvData = generateCSV();
fs.writeFileSync('sql-data/product_batch_mapping.csv', csvData, 'utf8');

console.log('CSV data written to product_batch_mapping.csv');

