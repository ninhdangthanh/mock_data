const fs = require('fs');
const { faker } = require('@faker-js/faker');

// Define CSV headers
const headers = ["product_addr", "batch_nft_id", "event_id"];

// Generate an array of unique event IDs in the range 17678-18667
const generateUniqueShuffledEventIds = () => {
    const eventIds = Array.from({ length: 11000 }, (_, i) => i + 68724);
    return faker.helpers.shuffle(eventIds);
};

// Function to generate CSV content
const generateCSV = () => {
    let csvRows = [headers.join(",")]; // Add headers first
    const uniqueEventIds = generateUniqueShuffledEventIds(); // Get shuffled event IDs

    uniqueEventIds.forEach(eventId => {
        csvRows.push(`"0x422113E095DD48Ba5C13C73de5D190f87437F576",1,${eventId}`);
    });

    return csvRows.join("\n");
};

// Generate CSV data and write to file
const csvData = generateCSV();
fs.writeFileSync('sql-data/product_batch_mapping.csv', csvData, 'utf8');

console.log('CSV data written to product_batch_mapping.csv');

