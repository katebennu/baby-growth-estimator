// Data module - CSV loading and parsing

// WHO Growth Data (loaded from CSV files)
// Using objects to allow mutation after initial export
const growthData = {
  boysWeight: [],
  girlsWeight: [],
  boysLength: [],
  girlsLength: [],
  boysHead: [],
  girlsHead: []
};

// Export getters for the data arrays
export const boysWeightData = growthData.boysWeight;
export const girlsWeightData = growthData.girlsWeight;
export const boysLengthData = growthData.boysLength;
export const girlsLengthData = growthData.girlsLength;
export const boysHeadData = growthData.boysHead;
export const girlsHeadData = growthData.girlsHead;

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

        // Clear and populate the arrays
        growthData.boysWeight.length = 0;
        growthData.boysWeight.push(...results[0]);

        growthData.girlsWeight.length = 0;
        growthData.girlsWeight.push(...results[1]);

        growthData.boysLength.length = 0;
        growthData.boysLength.push(...results[2]);

        growthData.girlsLength.length = 0;
        growthData.girlsLength.push(...results[3]);

        growthData.boysHead.length = 0;
        growthData.boysHead.push(...results[4]);

        growthData.girlsHead.length = 0;
        growthData.girlsHead.push(...results[5]);

        console.log('All WHO growth data loaded successfully');
        return true;
    } catch (error) {
        console.error('Error loading WHO growth data:', error);
        return false;
    }
}
