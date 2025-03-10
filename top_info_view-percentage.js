const fs = require('fs');
const { faker } = require('@faker-js/faker');

// Define CSV headers
const headers = ["section_name", "duration", "pb_mapping_id", "event_id"];

// Define proportions
const numRows = 10900;
const sectionDistribution = {
    "productSection": Math.round(numRows * 0.40), // 40%
    "moreSection": Math.round(numRows * 0.30),   // 30%
    "infoSection": Math.round(numRows * 0.20),   // 20%
    "traceSection": Math.round(numRows * 0.10)   // 10%
};

// Ensure the total matches exactly 10900 (adjust if needed)
const totalGenerated = Object.values(sectionDistribution).reduce((a, b) => a + b, 0);
if (totalGenerated !== numRows) {
    sectionDistribution["productSection"] += (numRows - totalGenerated);
}

// Generate unique shuffled pb_mapping_id values
const generatePbMappingIds = (numRows) => {
    const ids = Array.from({ length: numRows }, (_, i) => i + 46086);
    return faker.helpers.shuffle(ids);
};

// Generate unique shuffled event_id values
const generateEventIds = (numRows) => {
    const ids = Array.from({ length: numRows }, (_, i) => i + 68724);
    return faker.helpers.shuffle(ids);
};

// Generate section list with exact proportions
const generateSectionList = () => {
    let sections = [];
    for (let [section, count] of Object.entries(sectionDistribution)) {
        sections.push(...Array(count).fill(section));
    }
    return faker.helpers.shuffle(sections);
};

// Function to generate CSV content
const generateCSV = () => {
    let csvRows = [headers.join(",")]; // Add headers first
    const pbMappingIds = generatePbMappingIds(numRows);
    const eventIds = generateEventIds(numRows);
    const sectionList = generateSectionList();

    for (let i = 0; i < numRows; i++) {
        csvRows.push(
            `"${sectionList[i]}",` + // Ensures correct proportions
            `${faker.number.int({ min: 50, max: 170 })},` + // Random duration
            `${pbMappingIds[i]},` + // Unique shuffled pb_mapping_id
            `${eventIds[i]}` // Unique shuffled event_id
        );
    }

    return csvRows.join("\n");
};

// Generate CSV data and write to file
const csvData = generateCSV();
fs.writeFileSync('sql-data/top_info_view.csv', csvData, 'utf8');

console.log('✅ CSV data written to top_info_view.csv');
