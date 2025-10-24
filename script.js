// WHO Growth Data
const boysData = [
    [0,0.3487,3.3464,0.14602,2.459312,2.603994,2.757621,3.027282,3.3464,3.686659,4.011499,4.214527,4.419354],
    [1,0.2297,4.4709,0.13395,3.39089,3.566165,3.752603,4.080792,4.4709,4.889123,5.290726,5.542933,5.798331],
    [2,0.197,5.5675,0.12385,4.31889,4.522344,4.738362,5.117754,5.5675,6.048448,6.509323,6.798348,7.090758],
    [3,0.1738,6.3762,0.11727,5.018434,5.240269,5.475519,5.888058,6.3762,6.897306,7.395936,7.708329,8.024169],
    [4,0.1553,7.0023,0.11316,5.561377,5.797135,6.046988,6.484777,7.0023,7.554286,8.082087,8.412602,8.746662],
    [5,0.1395,7.5105,0.1108,5.996672,6.244465,6.507016,6.966941,7.5105,8.090161,8.644384,8.991445,9.342238],
    [6,0.1257,7.934,0.10958,6.352967,6.611702,6.885864,7.366195,7.934,8.539707,9.119041,9.481939,9.848832],
    [7,0.1134,8.297,0.10902,6.653301,6.922131,7.207057,7.706413,8.297,8.927371,9.530656,9.908738,10.29113],
    [8,0.1021,8.6151,0.10882,6.913126,7.19127,7.486158,8.003205,8.6151,9.268678,9.894622,10.28713,10.68428],
    [9,0.0917,8.9014,0.10881,7.144822,7.431644,7.735837,8.26946,8.9014,9.5769,10.22433,10.63055,11.04177],
    [10,0.082,9.1649,0.10891,7.356558,7.651572,7.964565,8.5139,9.1649,9.861313,10.5293,10.94868,11.37341],
    [11,0.073,9.4122,0.10906,7.55441,7.857229,8.178615,8.742959,9.4122,10.12867,10.81641,11.24845,11.6862],
    [12,0.0644,9.6479,0.10925,7.742219,8.052577,8.382077,8.960956,9.6479,10.38387,11.09087,11.53526,11.98574],
    [13,0.0563,9.8749,0.10949,7.922091,8.239848,8.577324,9.170505,9.8749,10.63014,11.35618,11.81281,12.27589],
    [14,0.0487,10.0953,0.10976,8.095984,8.421033,8.76637,9.373665,10.0953,10.86959,11.61449,12.08325,12.55884],
    [15,0.0413,10.3108,0.11007,8.265127,8.597424,8.950586,9.571948,10.3108,11.10416,11.86797,12.34891,12.83707],
    [16,0.0343,10.5228,0.11041,8.430734,8.770274,9.13126,9.7667,10.5228,11.33528,12.11808,12.61125,13.11206],
    [17,0.0275,10.7319,0.11079,8.593128,8.939942,9.308795,9.958406,10.7319,11.5637,12.36571,12.87128,13.38491],
    [18,0.0211,10.9385,0.11119,8.752902,9.107002,9.483736,10.14755,10.9385,11.7897,12.61101,13.12906,13.65558],
    [19,0.0148,11.143,0.11164,8.909889,9.27136,9.656076,10.33431,11.143,12.01396,12.855,13.38579,13.92552],
    [20,0.0087,11.3462,0.11211,9.065209,9.434095,9.826848,10.51961,11.3462,12.23713,13.09811,13.64181,14.19492],
    [21,0.0029,11.5486,0.11261,9.219037,9.595435,9.996335,10.70383,11.5486,12.45983,13.3411,13.89795,14.46469],
    [22,-0.0028,11.7504,0.11314,9.371554,9.755556,10.16471,10.88716,11.7504,12.6823,13.58426,14.15453,14.7352],
    [23,-0.0083,11.9514,0.11369,9.522741,9.914417,10.33191,11.06946,11.9514,12.90424,13.82718,14.41108,15.0059],
    [24,-0.0137,12.1515,0.11426,9.672527,10.07194,10.49784,11.25065,12.1515,13.12555,14.06979,14.66753,15.27674]
];

const girlsData = [
    [0,0.3809,3.2322,0.14171,2.394672,2.532145,2.677725,2.932331,3.2322,3.55035,3.852667,4.040959,4.23043022],
    [1,0.1714,4.1873,0.13724,3.161067,3.326209,3.502477,3.814261,4.1873,4.590075,4.979539,5.225436,5.4754539],
    [2,0.0962,5.1282,0.13,3.941053,4.13172,4.335355,4.695944,5.1282,5.596104,6.049862,6.337067,6.62967897],
    [3,0.0402,5.8458,0.12619,4.53604,4.745935,4.970282,5.368044,5.8458,6.364222,6.868317,7.188096,7.51447955],
    [4,-0.005,6.4237,0.12402,5.013368,5.238858,5.480078,5.90832,6.4237,6.984281,7.530756,7.87815,8.23331075],
    [5,-0.043,6.8985,0.12274,5.403844,5.642267,5.897544,6.351329,6.8985,7.495018,8.077933,8.449225,8.82941522],
    [6,-0.0756,7.297,0.12204,5.729383,5.97888,6.246243,6.72212,7.297,7.925102,8.540297,8.93289,9.33549062],
    [7,-0.1039,7.6422,0.12178,6.008387,6.267836,6.546104,7.042017,7.6422,8.299352,8.94444,9.356859,9.78039888],
    [8,-0.1288,7.9487,0.12181,6.253445,6.522061,6.810403,7.324907,7.9487,8.633118,9.306424,9.737639,10.1810939],
    [9,-0.1507,8.2254,0.12199,6.472906,6.750018,7.047717,7.579535,8.2254,8.935413,9.63531,10.08429,10.5466186],
    [10,-0.17,8.48,0.12223,6.673828,6.958886,7.265345,7.813398,8.48,9.214115,9.939115,10.4049,10.8851054],
    [11,-0.1872,8.7192,0.12247,6.862262,7.15483,7.46957,8.032975,8.7192,9.476145,10.22495,10.7067,11.2038881],
    [12,-0.2024,8.9481,0.12268,7.042612,7.342376,7.665043,8.24313,8.9481,9.726833,10.49835,10.99531,11.5086985],
    [13,-0.2158,9.1699,0.12283,7.217847,7.524538,7.854825,8.446994,9.1699,9.969431,10.76258,11.27401,11.8028109],
    [14,-0.2278,9.387,0.12294,7.389684,7.70313,8.040838,8.646697,9.387,10.20666,11.02071,11.54612,12.0897773],
    [15,-0.2384,9.6008,0.12299,7.559527,7.879566,8.224501,8.843658,9.6008,10.43988,11.27403,11.81285,12.3707367],
    [16,-0.2478,9.8124,0.12303,7.727588,8.054179,8.406286,9.038616,9.8124,10.67062,11.52454,12.07652,12.6483665],
    [17,-0.2562,10.0226,0.12306,7.894535,8.227652,8.586898,9.232317,10.0226,10.89976,11.77319,12.33814,12.9237235],
    [18,-0.2637,10.2315,0.12309,8.060311,8.399952,8.766325,9.424795,10.2315,11.12747,12.02024,12.59804,13.1972107],
    [19,-0.2703,10.4393,0.12315,8.224599,8.570832,8.944403,9.616043,10.4393,11.3542,12.26642,12.85712,13.4699234],
    [20,-0.2762,10.6464,0.12323,8.387882,8.74076,9.121584,9.806487,10.6464,11.58033,12.51209,13.11573,13.7422028],
    [21,-0.2815,10.8534,0.12335,8.55031,8.909946,9.298148,9.996544,10.8534,11.80669,12.75831,13.37511,14.0154884],
    [22,-0.2862,11.0608,0.1235,8.712397,9.078906,9.474611,10.18672,11.0608,12.03376,13.00554,13.6357,14.2901756],
    [23,-0.2903,11.2688,0.12369,8.8741,9.247632,9.651002,10.37713,11.2688,12.26184,13.25422,13.89801,14.5668755],
    [24,-0.2941,11.4775,0.1239,9.035869,9.416516,9.827655,10.56799,11.4775,12.49092,13.50419,14.16181,14.8452857]
];

// Percentile mapping
const percentileMap = {
    '2': 4,   // 2nd percentile column index
    '5': 5,   // 5th percentile column index
    '10': 6,  // 10th percentile column index
    '25': 7,  // 25th percentile column index
    '50': 8,  // 50th percentile column index
    '75': 9,  // 75th percentile column index
    '90': 10, // 90th percentile column index
    '95': 11, // 95th percentile column index
    '98': 12  // 98th percentile column index
};

// Function to calculate weight using WHO LMS method
function calculateWeight(age, gender, percentile) {
    const data = gender === 'boy' ? boysData : girlsData;
    const percentileIndex = percentileMap[percentile];
    
    if (!percentileIndex) {
        throw new Error('Invalid percentile selected');
    }
    
    // Find the row for the given age
    const ageRow = data.find(row => row[0] === age);
    if (!ageRow) {
        throw new Error('Age not found in data');
    }
    
    // Extract L, M, S values
    const L = ageRow[1];
    const M = ageRow[2];
    const S = ageRow[3];
    
    // Get the percentile value
    const percentileValue = ageRow[percentileIndex];
    
    // Calculate weight using the LMS method
    // Weight = M * (1 + L * S * Z)^(1/L)
    // For percentiles, we use the pre-calculated values from WHO data
    const weight = percentileValue;
    
    return Math.round(weight * 100) / 100; // Round to 2 decimal places
}

// Function to get percentile description
function getPercentileDescription(percentile) {
    const descriptions = {
        '2': '2nd percentile (2.3rd)',
        '5': '5th percentile',
        '10': '10th percentile',
        '25': '25th percentile',
        '50': '50th percentile (median)',
        '75': '75th percentile',
        '90': '90th percentile',
        '95': '95th percentile',
        '98': '98th percentile (97.7th)'
    };
    return descriptions[percentile] || percentile;
}

// Function to convert kg to lbs
function kgToLbs(kg) {
    return Math.round(kg * 2.20462 * 100) / 100; // Round to 2 decimal places
}

// Function to convert lbs to kg
function lbsToKg(lbs) {
    return Math.round(lbs / 2.20462 * 100) / 100; // Round to 2 decimal places
}

// Function to convert decimal pounds to pounds and ounces
function lbsToLbsOz(decimalLbs) {
    const pounds = Math.floor(decimalLbs);
    const ounces = Math.round((decimalLbs - pounds) * 16);
    return { pounds, ounces };
}

// Function to format weight display
function formatWeight(weight, unit) {
    if (unit === 'lbs') {
        const { pounds, ounces } = lbsToLbsOz(weight);
        return `${pounds} lbs ${ounces} oz`;
    } else {
        return `${weight} kg`;
    }
}

// Function to get selected unit
function getSelectedUnit() {
    return document.querySelector('input[name="unit"]:checked').value;
}

// Function to show result
function showResult(weightKg, age, gender, percentile) {
    const resultDiv = document.getElementById('result');
    const weightValue = document.getElementById('weightValue');
    const weightUnit = document.getElementById('weightUnit');
    const convertedWeight = document.getElementById('convertedWeight');
    const convertedUnit = document.getElementById('convertedUnit');
    const weightInfo = document.getElementById('weightInfo');
    const errorDiv = document.getElementById('error');
    const selectedUnit = getSelectedUnit();
    
    // Hide error if visible
    errorDiv.classList.add('hidden');
    
    // Calculate converted weight
    const weightLbs = kgToLbs(weightKg);
    
    // Update weight display based on selected unit
    if (selectedUnit === 'kg') {
        weightValue.textContent = weightKg;
        weightUnit.textContent = 'kg';
        convertedWeight.textContent = formatWeight(weightLbs, 'lbs');
        convertedUnit.textContent = '';
        // Add lbs-oz class for styling
        convertedWeight.parentElement.classList.add('lbs-oz');
        weightValue.parentElement.classList.remove('lbs-oz');
    } else {
        weightValue.textContent = formatWeight(weightLbs, 'lbs');
        weightUnit.textContent = '';
        convertedWeight.textContent = weightKg;
        convertedUnit.textContent = 'kg';
        // Add lbs-oz class for styling
        weightValue.parentElement.classList.add('lbs-oz');
        convertedWeight.parentElement.classList.remove('lbs-oz');
    }
    
    // Update weight info
    const genderText = gender === 'boy' ? 'boy' : 'girl';
    const percentileDesc = getPercentileDescription(percentile);
    weightInfo.textContent = `A ${age}-month-old ${genderText} at the ${percentileDesc}`;
    
    // Show result
    resultDiv.classList.remove('hidden');
}

// Function to show error
function showError(message) {
    const resultDiv = document.getElementById('result');
    const errorDiv = document.getElementById('error');
    const errorMessage = document.getElementById('errorMessage');
    
    // Hide result if visible
    resultDiv.classList.add('hidden');
    
    // Update error message
    errorMessage.textContent = message;
    
    // Show error
    errorDiv.classList.remove('hidden');
}

// Function to validate form
function validateForm(age, gender, percentile) {
    if (!age || age < 0 || age > 24) {
        return 'Please enter a valid age between 0 and 24 months';
    }
    
    if (!gender) {
        return 'Please select a gender';
    }
    
    if (!percentile) {
        return 'Please select a percentile';
    }
    
    return null;
}

// Event listener for form submission
document.getElementById('weightForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const age = parseInt(document.getElementById('age').value);
    const gender = document.getElementById('gender').value;
    const percentile = document.getElementById('percentile').value;
    
    // Validate form
    const validationError = validateForm(age, gender, percentile);
    if (validationError) {
        showError(validationError);
        return;
    }
    
    try {
        // Calculate weight
        const weight = calculateWeight(age, gender, percentile);
        
        // Show result
        showResult(weight, age, gender, percentile);
    } catch (error) {
        showError('Error calculating weight: ' + error.message);
    }
});

// Event listener for unit toggle changes
document.querySelectorAll('input[name="unit"]').forEach(radio => {
    radio.addEventListener('change', function() {
        // Only update if there's already a result displayed
        const resultDiv = document.getElementById('result');
        if (!resultDiv.classList.contains('hidden')) {
            // Get current form values
            const age = parseInt(document.getElementById('age').value);
            const gender = document.getElementById('gender').value;
            const percentile = document.getElementById('percentile').value;
            
            // Recalculate and show result with new unit
            try {
                const weight = calculateWeight(age, gender, percentile);
                showResult(weight, age, gender, percentile);
            } catch (error) {
                // If there's an error, just hide the result
                resultDiv.classList.add('hidden');
            }
        }
    });
});

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    console.log('Baby Weight Predictor loaded successfully');
});
