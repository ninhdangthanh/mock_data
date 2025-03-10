const fs = require('fs');
const { faker } = require('@faker-js/faker');

// Define CSV headers
const headers = ["section_name", "duration", "pb_mapping_id", "event_id"];

// Function to generate unique shuffled pb_mapping_id values
const generatePbMappingIds = (numRows) => {
    const ids = Array.from({ length: numRows }, (_, i) => i + 68725);
    return faker.helpers.shuffle(ids);
};

// Function to generate unique shuffled event_id values
const generateEventIds = (numRows) => {
    const ids = Array.from({ length: numRows }, (_, i) => i + 56515);
    return faker.helpers.shuffle(ids);
};

// Function to generate CSV content
const generateCSV = (numRows) => {
    let csvRows = [headers.join(",")]; // Add headers first
    const pbMappingIds = generatePbMappingIds(numRows);
    const eventIds = generateEventIds(numRows);

    for (let i = 0; i < numRows; i++) {
        csvRows.push(
            `"${faker.helpers.arrayElement(["productSection", "moreSection", "infoSection", "traceSection"])}",` +
            `${faker.number.int({ min: 50, max: 170 })},` +
            `${pbMappingIds[i]},` +
            `${eventIds[i]}`
        );
    }

    return csvRows.join("\n");
};

// Generate CSV data and write to file
const csvData = generateCSV(10900);
fs.writeFileSync('sql-data/top_info_view.csv', csvData, 'utf8');

console.log('CSV data written to top_info_view.csv');

