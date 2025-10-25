// Data module - CSV loading and parsing

// WHO Growth Data (loaded from CSV files)
export let boysWeightData = [];
export let girlsWeightData = [];
export let boysLengthData = [];
export let girlsLengthData = [];
export let boysHeadData = [];
export let girlsHeadData = [];

// CSV Parser function
function parseCSV(csvText) {
    const lines = csvText.trim().split('\n');
    const data = [];

    // Skip header row, start from line 1
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;

        // Split by comma and convert to numbers
        const values = line.split(',').map(val => parseFloat(val.trim()));
        data.push(values);
    }

    return data;
}

// Function to load CSV file
async function loadCSV(filename) {
    try {
        const response = await fetch(filename);
        if (!response.ok) {
            throw new Error(`Failed to load ${filename}: ${response.statusText}`);
        }
        const text = await response.text();
        return parseCSV(text);
    } catch (error) {
        console.error(`Error loading ${filename}:`, error);
        throw error;
    }
}

// Function to load all data
export async function loadAllData() {
    try {
        const results = await Promise.all([
            loadCSV('WHO-Boys-Weight-for-age-Percentiles.csv'),
            loadCSV('WHO-Girls-Weight-for-age Percentiles.csv'),
            loadCSV('WHO-Boys-Length-for-age-Percentiles.csv'),
            loadCSV('WHO-Girls-Length-for-age-Percentiles.csv'),
            loadCSV('WHO-Boys-Head-Circumference-for-age-Percentiles.csv'),
            loadCSV('WHO-Girls-Head-Circumference-for-age-Percentiles.csv')
        ]);

        boysWeightData = results[0];
        girlsWeightData = results[1];
        boysLengthData = results[2];
        girlsLengthData = results[3];
        boysHeadData = results[4];
        girlsHeadData = results[5];

        console.log('All WHO growth data loaded successfully');
        return true;
    } catch (error) {
        console.error('Error loading WHO growth data:', error);
        return false;
    }
}
