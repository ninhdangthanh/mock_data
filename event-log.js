const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const { faker } = require('@faker-js/faker');

// Define CSV headers
const headers = [
    "user_uid", "view_id", "host", "path", "country_code", "ip_address",
    "action", "html_id", "html_tag", "html_text_content", "target_url",
    "data", "city_name", "latitude", "longitude", "event_date"
];

const countryData = [
    { code: "JP", lat: 36.2048, lon: 138.2529 }, // Nhật Bản
    { code: "SG", lat: 1.3521, lon: 103.8198 }, // Singapore
    { code: "VN", lat: 14.0583, lon: 108.2772 }, // Việt Nam
    { code: "TH", lat: 51.1657, lon: 10.4515 }, // Thái Lan
    { code: "BN", lat: 56.1304, lon: -106.3468 }, // Bruney
    { code: "TW", lat: 23.6978, lon: 120.9605 }, // Đài Loan
    { code: "IN", lat: 20.5937, lon: 78.9629 }, // Ấn Độ
  ];
  
  

// Function to generate a single CSV row
const generateRandomRow = () => {
    const selectedCountry = faker.helpers.arrayElement(countryData);
    return [
        uuidv4(),
        uuidv4(),
        faker.internet.domainName(),
        faker.system.filePath(),
        selectedCountry.code,
        faker.internet.ip(),
        faker.helpers.arrayElement(["click", "duration", "section_duration"]),
        faker.helpers.arrayElement(["services", "testimonials", "header_section"]),
        faker.helpers.arrayElement(["<span>", "<div>", "<li>"]),
        faker.lorem.sentence().replace(/"/g, '""'), // Escape quotes for CSV
        faker.internet.domainName(),
        faker.number.int({ min: 1, max: 100 }),
        faker.location.city(),
        selectedCountry.lat + faker.number.float({ min: -0.5, max: 0.5, precision: 0.0001 }), // Tạo biến động nhỏ
        selectedCountry.lon + faker.number.float({ min: -0.5, max: 0.5, precision: 0.0001 }), // Tạo biến động nhỏ
        faker.date.between({ from: '2025-01-06', to: '2025-03-16' }).toISOString().slice(0, 19).replace('T', ' ')
    ].map(value => `"${value}"`).join(","); // Wrap values in quotes for CSV
};

// Function to generate multiple CSV rows
const generateCSV = (numRows) => {
    let csvRows = [headers.join(",")]; // Add headers first
    for (let i = 0; i < numRows; i++) {
        csvRows.push(generateRandomRow());
    }
    return csvRows.join("\n");
};

// Generate CSV content and write to file
const csvData = generateCSV(12000);
fs.writeFileSync('sql-data/event_logs.csv', csvData, 'utf8');

console.log('CSV data written to event_logs.csv');
