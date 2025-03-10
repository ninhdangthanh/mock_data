const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const { faker } = require('@faker-js/faker');

// Define CSV headers
const headers = [
    "user_uid", "view_id", "host", "path", "country_code", "ip_address",
    "action", "html_id", "html_tag", "html_text_content", "target_url",
    "data", "city_name", "latitude", "longitude", "event_date"
];

// Define country distribution percentages
const countryDistribution = [
    { code: "VN", lat: 14.0583, lon: 108.2772, percentage: 15 }, // Vietnam
    { code: "JP", lat: 36.2048, lon: 138.2529, percentage: 37 }, // Japan
    { code: "SG", lat: 1.3521, lon: 103.8198, percentage: 23 },  // Singapore
    { code: "TH", lat: 15.8700, lon: 100.9925, percentage: 10 }, // Thailand
    { code: "IN", lat: 20.5937, lon: 78.9629, percentage: 5 },   // India
    { code: "BN", lat: 4.5353, lon: 114.7277, percentage: 5 },   // Brunei
    { code: "TW", lat: 23.6978, lon: 120.9605, percentage: 5 },  // Taiwan
];

// Calculate the exact number of rows per country
const totalRows = 12000;
const countryRows = countryDistribution.map(c => ({
    ...c,
    count: Math.floor((c.percentage / 100) * totalRows),
}));

// Adjust the last country to ensure totalRows sum correctly
const assignedRows = countryRows.reduce((sum, c) => sum + c.count, 0);
countryRows[countryRows.length - 1].count += (totalRows - assignedRows);

// Function to generate a single CSV row
const generateRandomRow = (country) => {
    return [
        uuidv4(),
        uuidv4(),
        faker.internet.domainName(),
        faker.system.filePath(),
        country.code,
        faker.internet.ip(),
        faker.helpers.arrayElement(["click", "duration", "section_duration"]),
        faker.helpers.arrayElement(["services", "testimonials", "header_section"]),
        faker.helpers.arrayElement(["<span>", "<div>", "<li>"]),
        faker.lorem.sentence().replace(/"/g, '""'), // Escape quotes for CSV
        faker.internet.domainName(),
        faker.number.int({ min: 1, max: 100 }),
        faker.location.city(),
        country.lat + faker.number.float({ min: -0.5, max: 0.5, precision: 0.0001 }), // Small variation
        country.lon + faker.number.float({ min: -0.5, max: 0.5, precision: 0.0001 }), // Small variation
        faker.date.between({ from: '2025-01-06', to: '2025-03-16' }).toISOString().slice(0, 19).replace('T', ' ')
    ].map(value => `"${value}"`).join(","); // Wrap values in quotes for CSV
};

// Function to generate multiple CSV rows with explicit country distribution
const generateCSV = () => {
    let csvRows = [headers.join(",")]; // Add headers first

    countryRows.forEach(country => {
        for (let i = 0; i < country.count; i++) {
            csvRows.push(generateRandomRow(country));
        }
    });

    return csvRows.join("\n");
};

// Generate CSV content and write to file
const csvData = generateCSV();
fs.writeFileSync('sql-data/event_logs.csv', csvData, 'utf8');

console.log('CSV data written to event_logs.csv ✅');
