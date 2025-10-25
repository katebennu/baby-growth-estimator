// WHO Growth Data - Weight (loaded from CSV files)
let boysWeightData = [];
let girlsWeightData = [];
let boysLengthData = [];
let girlsLengthData = [];
let boysHeadData = [];
let girlsHeadData = [];

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
async function loadAllData() {
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

// Function to convert percentile to z-score using approximation
function percentileToZScore(percentile) {
    // Convert percentile (1-99) to probability (0.01-0.99)
    const p = percentile / 100;

    // Rational approximation of inverse normal CDF (Abramowitz and Stegun)
    // This is accurate to about 4.5 × 10−4
    const c0 = 2.515517;
    const c1 = 0.802853;
    const c2 = 0.010328;
    const d1 = 1.432788;
    const d2 = 0.189269;
    const d3 = 0.001308;

    let z;
    if (p < 0.5) {
        const t = Math.sqrt(-2 * Math.log(p));
        z = -(t - ((c2 * t + c1) * t + c0) / (((d3 * t + d2) * t + d1) * t + 1));
    } else {
        const t = Math.sqrt(-2 * Math.log(1 - p));
        z = t - ((c2 * t + c1) * t + c0) / (((d3 * t + d2) * t + d1) * t + 1);
    }

    return z;
}

// Function to calculate measurement using WHO LMS method
function calculateMeasurement(age, gender, percentile, measurementType) {
    let data;

    switch (measurementType) {
        case 'weight':
            data = gender === 'boy' ? boysWeightData : girlsWeightData;
            break;
        case 'length':
            data = gender === 'boy' ? boysLengthData : girlsLengthData;
            break;
        case 'head':
            data = gender === 'boy' ? boysHeadData : girlsHeadData;
            break;
        default:
            throw new Error('Invalid measurement type');
    }

    // Find the row for the given age
    const ageRow = data.find(row => row[0] === age);
    if (!ageRow) {
        throw new Error('Age not found in data');
    }

    // Extract LMS parameters
    const L = ageRow[1];  // Box-Cox power (skewness)
    const M = ageRow[2];  // Median
    const S = ageRow[3];  // Coefficient of variation

    // Convert percentile to z-score
    const z = percentileToZScore(percentile);

    // Calculate measurement using LMS formula
    let measurementValue;
    if (Math.abs(L) < 0.01) {
        // When L is close to 0, use exponential formula
        measurementValue = M * Math.exp(S * z);
    } else {
        // Standard LMS formula
        measurementValue = M * Math.pow(1 + L * S * z, 1 / L);
    }

    return Math.round(measurementValue * 100) / 100; // Round to 2 decimal places
}

// Function to calculate all measurements
function calculateAllMeasurements(age, gender, percentile) {
    return {
        weight: calculateMeasurement(age, gender, percentile, 'weight'),
        length: calculateMeasurement(age, gender, percentile, 'length'),
        head: calculateMeasurement(age, gender, percentile, 'head')
    };
}

// Function to get percentile description
function getPercentileDescription(percentile) {
    const p = parseInt(percentile);

    // Add ordinal suffix (st, nd, rd, th)
    let suffix = 'th';
    if (p % 100 >= 11 && p % 100 <= 13) {
        suffix = 'th';
    } else if (p % 10 === 1) {
        suffix = 'st';
    } else if (p % 10 === 2) {
        suffix = 'nd';
    } else if (p % 10 === 3) {
        suffix = 'rd';
    }

    return `${p}${suffix} percentile`;
}

// Function to convert kg to lbs
function kgToLbs(kg) {
    return Math.round(kg * 2.20462 * 100) / 100; // Round to 2 decimal places
}

// Function to convert lbs to kg
function lbsToKg(lbs) {
    return Math.round(lbs / 2.20462 * 100) / 100; // Round to 2 decimal places
}

// Function to convert cm to inches
function cmToInches(cm) {
    return Math.round(cm / 2.54 * 100) / 100; // Round to 2 decimal places
}

// Function to convert inches to cm
function inchesToCm(inches) {
    return Math.round(inches * 2.54 * 100) / 100; // Round to 2 decimal places
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

// Function to format length display
function formatLength(length, unit) {
    if (unit === 'inches') {
        const inches = cmToInches(length);
        const feet = Math.floor(inches / 12);
        const remainingInches = Math.round((inches % 12) * 10) / 10;
        if (feet > 0) {
            return `${feet}' ${remainingInches}"`;
        } else {
            return `${remainingInches}"`;
        }
    } else {
        return `${length} cm`;
    }
}

// Function to format head circumference display
function formatHeadCircumference(head, unit) {
    if (unit === 'inches') {
        const inches = cmToInches(head);
        return `${inches}"`;
    } else {
        return `${head} cm`;
    }
}

// Function to get selected unit for a specific tab
function getSelectedUnit(tabName) {
    return document.querySelector(`input[name="${tabName}-unit"]:checked`).value;
}

// Store chart instances
let weightChart = null;
let lengthChart = null;
let headChart = null;

// Function to create growth chart
function createGrowthChart(canvasId, measurementType, gender, selectedAge = null, selectedPercentile = null, selectedValue = null) {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext('2d');

    // Destroy existing chart if it exists
    if (canvasId === 'weight-chart' && weightChart) {
        weightChart.destroy();
    } else if (canvasId === 'length-chart' && lengthChart) {
        lengthChart.destroy();
    } else if (canvasId === 'head-chart' && headChart) {
        headChart.destroy();
    }

    // Get data source
    let data;
    switch (measurementType) {
        case 'weight':
            data = gender === 'boy' ? boysWeightData : girlsWeightData;
            break;
        case 'length':
            data = gender === 'boy' ? boysLengthData : girlsLengthData;
            break;
        case 'head':
            data = gender === 'boy' ? boysHeadData : girlsHeadData;
            break;
    }

    // Percentile curves to display (5th, 25th, 50th, 75th, 95th)
    const percentilesToShow = [
        { percentile: '5', index: 5, color: 'rgba(255, 99, 132, 0.8)', label: '5th' },
        { percentile: '25', index: 7, color: 'rgba(54, 162, 235, 0.8)', label: '25th' },
        { percentile: '50', index: 8, color: 'rgba(75, 192, 192, 0.8)', label: '50th' },
        { percentile: '75', index: 9, color: 'rgba(153, 102, 255, 0.8)', label: '75th' },
        { percentile: '95', index: 11, color: 'rgba(255, 159, 64, 0.8)', label: '95th' }
    ];

    // Generate datasets for percentile curves
    const datasets = percentilesToShow.map(p => {
        return {
            label: `${p.label} percentile`,
            data: data.map(row => ({ x: row[0], y: row[p.index] })),
            borderColor: p.color,
            backgroundColor: 'transparent',
            borderWidth: 2.5,
            pointRadius: 0,
            tension: 0.4
        };
    });

    // Add the selected point only if values are provided
    if (selectedAge !== null && selectedPercentile !== null && selectedValue !== null) {
        datasets.push({
            label: `Your baby (${getPercentileDescription(selectedPercentile)})`,
            data: [{ x: selectedAge, y: selectedValue }],
            borderColor: 'rgba(255, 0, 0, 1)',
            backgroundColor: 'rgba(255, 0, 0, 1)',
            pointRadius: 5,
            pointHoverRadius: 7,
            showLine: false
        });
    }

    // Determine axis labels
    let yAxisLabel;
    if (measurementType === 'weight') {
        yAxisLabel = 'Weight (kg)';
    } else if (measurementType === 'length') {
        yAxisLabel = 'Length (cm)';
    } else {
        yAxisLabel = 'Head Circumference (cm)';
    }

    // Create chart
    const chart = new Chart(ctx, {
        type: 'line',
        data: { datasets },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 1.5,
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                        color: '#333',
                        font: { size: 10 },
                        boxWidth: 15,
                        padding: 8
                    }
                },
                tooltip: {
                    enabled: true
                }
            },
            scales: {
                x: {
                    type: 'linear',
                    title: {
                        display: true,
                        text: 'Age (months)',
                        color: '#555',
                        font: { size: 11, weight: 'bold' }
                    },
                    ticks: {
                        color: '#666',
                        font: { size: 10 }
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    min: 0,
                    max: 24
                },
                y: {
                    title: {
                        display: true,
                        text: yAxisLabel,
                        color: '#555',
                        font: { size: 11, weight: 'bold' }
                    },
                    ticks: {
                        color: '#666',
                        font: { size: 10 }
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                }
            }
        }
    });

    // Store chart instance
    if (canvasId === 'weight-chart') {
        weightChart = chart;
    } else if (canvasId === 'length-chart') {
        lengthChart = chart;
    } else if (canvasId === 'head-chart') {
        headChart = chart;
    }
}

// Function to show weight result
function showWeightResult(weight, age, gender, percentile) {
    const resultDiv = document.getElementById('weight-result');
    const errorDiv = document.getElementById('weight-error');
    const selectedUnit = getSelectedUnit('weight');

    errorDiv.classList.add('hidden');

    // Update title
    resultDiv.querySelector('h3').textContent = 'Weight Estimate';

    // Show measurement section and info
    const measurementSection = resultDiv.querySelector('.measurement-section');
    const measurementInfo = resultDiv.querySelector('.measurement-info');
    measurementSection.style.display = 'block';
    measurementInfo.style.display = 'block';

    const weightValue = document.getElementById('weightValue');
    const weightUnit = document.getElementById('weightUnit');
    const convertedWeight = document.getElementById('convertedWeight');
    const convertedUnit = document.getElementById('convertedUnit');

    const weightLbs = kgToLbs(weight);

    if (selectedUnit === 'kg') {
        weightValue.textContent = weight;
        weightUnit.textContent = 'kg';
        convertedWeight.textContent = formatWeight(weightLbs, 'lbs');
        convertedUnit.textContent = '';
        convertedWeight.parentElement.classList.add('lbs-oz');
        weightValue.parentElement.classList.remove('lbs-oz');
    } else {
        weightValue.textContent = formatWeight(weightLbs, 'lbs');
        weightUnit.textContent = '';
        convertedWeight.textContent = weight;
        convertedUnit.textContent = 'kg';
        weightValue.parentElement.classList.add('lbs-oz');
        convertedWeight.parentElement.classList.remove('lbs-oz');
    }

    const genderText = gender === 'boy' ? 'boy' : 'girl';
    const percentileDesc = getPercentileDescription(percentile);
    document.getElementById('weight-info').textContent = `A ${age}-month-old ${genderText} at the ${percentileDesc}`;

    // Create chart
    createGrowthChart('weight-chart', 'weight', gender, age, percentile, weight);

    resultDiv.classList.remove('hidden');
}

// Function to show length result
function showLengthResult(length, age, gender, percentile) {
    const resultDiv = document.getElementById('length-result');
    const errorDiv = document.getElementById('length-error');
    const selectedUnit = getSelectedUnit('length');

    errorDiv.classList.add('hidden');

    // Update title
    resultDiv.querySelector('h3').textContent = 'Length Estimate';

    // Show measurement section and info
    const measurementSection = resultDiv.querySelector('.measurement-section');
    const measurementInfo = resultDiv.querySelector('.measurement-info');
    measurementSection.style.display = 'block';
    measurementInfo.style.display = 'block';

    const lengthValue = document.getElementById('lengthValue');
    const lengthUnit = document.getElementById('lengthUnit');
    const convertedLength = document.getElementById('convertedLength');
    const convertedLengthUnit = document.getElementById('convertedLengthUnit');

    if (selectedUnit === 'cm') {
        lengthValue.textContent = length;
        lengthUnit.textContent = 'cm';
        convertedLength.textContent = formatLength(length, 'inches');
        convertedLengthUnit.textContent = '';
    } else {
        lengthValue.textContent = formatLength(length, 'inches');
        lengthUnit.textContent = '';
        convertedLength.textContent = length;
        convertedLengthUnit.textContent = 'cm';
    }

    const genderText = gender === 'boy' ? 'boy' : 'girl';
    const percentileDesc = getPercentileDescription(percentile);
    document.getElementById('length-info').textContent = `A ${age}-month-old ${genderText} at the ${percentileDesc}`;

    // Create chart
    createGrowthChart('length-chart', 'length', gender, age, percentile, length);

    resultDiv.classList.remove('hidden');
}

// Function to show head circumference result
function showHeadResult(head, age, gender, percentile) {
    const resultDiv = document.getElementById('head-result');
    const errorDiv = document.getElementById('head-error');
    const selectedUnit = getSelectedUnit('head');

    errorDiv.classList.add('hidden');

    // Update title
    resultDiv.querySelector('h3').textContent = 'Head Circumference Estimate';

    // Show measurement section and info
    const measurementSection = resultDiv.querySelector('.measurement-section');
    const measurementInfo = resultDiv.querySelector('.measurement-info');
    measurementSection.style.display = 'block';
    measurementInfo.style.display = 'block';

    const headValue = document.getElementById('headValue');
    const headUnit = document.getElementById('headUnit');
    const convertedHead = document.getElementById('convertedHead');
    const convertedHeadUnit = document.getElementById('convertedHeadUnit');

    if (selectedUnit === 'cm') {
        headValue.textContent = head;
        headUnit.textContent = 'cm';
        convertedHead.textContent = formatHeadCircumference(head, 'inches');
        convertedHeadUnit.textContent = '';
    } else {
        headValue.textContent = formatHeadCircumference(head, 'inches');
        headUnit.textContent = '';
        convertedHead.textContent = head;
        convertedHeadUnit.textContent = 'cm';
    }

    const genderText = gender === 'boy' ? 'boy' : 'girl';
    const percentileDesc = getPercentileDescription(percentile);
    document.getElementById('head-info').textContent = `A ${age}-month-old ${genderText} at the ${percentileDesc}`;

    // Create chart
    createGrowthChart('head-chart', 'head', gender, age, percentile, head);

    resultDiv.classList.remove('hidden');
}

// Function to show error for specific tab
function showError(tabName, message) {
    const resultDiv = document.getElementById(`${tabName}-result`);
    const errorDiv = document.getElementById(`${tabName}-error`);
    const errorMessage = document.getElementById(`${tabName}-error-message`);

    resultDiv.classList.add('hidden');
    errorMessage.textContent = message;
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

    if (!percentile || percentile < 1 || percentile > 99) {
        return 'Please enter a valid percentile between 1 and 99';
    }

    return null;
}

// Tab switching functionality
function switchTab(tabName) {
    // Hide all tab contents
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });

    // Remove active class from all tab buttons
    document.querySelectorAll('.tab-button').forEach(button => {
        button.classList.remove('active');
    });

    // Show selected tab content
    document.getElementById(`${tabName}-tab`).classList.add('active');

    // Add active class to selected tab button
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
}

// Synchronize inputs across tabs
function syncInputs() {
    // Age synchronization
    const ageInputs = [
        document.getElementById('weight-age'),
        document.getElementById('length-age'),
        document.getElementById('head-age')
    ];

    ageInputs.forEach(input => {
        input.addEventListener('input', function() {
            ageInputs.forEach(otherInput => {
                if (otherInput !== input) {
                    otherInput.value = input.value;
                }
            });
        });
    });

    // Gender synchronization
    const genderRadioGroups = ['weight-gender', 'length-gender', 'head-gender'];

    genderRadioGroups.forEach(groupName => {
        document.querySelectorAll(`input[name="${groupName}"]`).forEach(radio => {
            radio.addEventListener('change', function() {
                if (this.checked) {
                    const selectedValue = this.value;
                    // Update other tabs
                    genderRadioGroups.forEach(otherGroupName => {
                        if (otherGroupName !== groupName) {
                            const otherRadio = document.querySelector(`input[name="${otherGroupName}"][value="${selectedValue}"]`);
                            if (otherRadio) {
                                otherRadio.checked = true;
                            }
                        }
                    });
                }
            });
        });
    });

    // Percentile synchronization
    const percentileInputs = [
        document.getElementById('weight-percentile'),
        document.getElementById('length-percentile'),
        document.getElementById('head-percentile')
    ];

    percentileInputs.forEach(input => {
        input.addEventListener('input', function() {
            percentileInputs.forEach(otherInput => {
                if (otherInput !== input) {
                    otherInput.value = input.value;
                }
            });
        });
    });
}

// Weight form submission
document.getElementById('weightForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const age = parseInt(document.getElementById('weight-age').value);
    const gender = document.querySelector('input[name="weight-gender"]:checked')?.value;
    const percentile = document.getElementById('weight-percentile').value;

    const validationError = validateForm(age, gender, percentile);
    if (validationError) {
        showError('weight', validationError);
        return;
    }

    try {
        const weight = calculateMeasurement(age, gender, percentile, 'weight');
        showWeightResult(weight, age, gender, percentile);
    } catch (error) {
        showError('weight', 'Error calculating weight: ' + error.message);
    }
});

// Length form submission
document.getElementById('lengthForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const age = parseInt(document.getElementById('length-age').value);
    const gender = document.querySelector('input[name="length-gender"]:checked')?.value;
    const percentile = document.getElementById('length-percentile').value;

    const validationError = validateForm(age, gender, percentile);
    if (validationError) {
        showError('length', validationError);
        return;
    }

    try {
        const length = calculateMeasurement(age, gender, percentile, 'length');
        showLengthResult(length, age, gender, percentile);
    } catch (error) {
        showError('length', 'Error calculating length: ' + error.message);
    }
});

// Head circumference form submission
document.getElementById('headForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const age = parseInt(document.getElementById('head-age').value);
    const gender = document.querySelector('input[name="head-gender"]:checked')?.value;
    const percentile = document.getElementById('head-percentile').value;

    const validationError = validateForm(age, gender, percentile);
    if (validationError) {
        showError('head', validationError);
        return;
    }

    try {
        const head = calculateMeasurement(age, gender, percentile, 'head');
        showHeadResult(head, age, gender, percentile);
    } catch (error) {
        showError('head', 'Error calculating head circumference: ' + error.message);
    }
});

// Weight unit toggle change
document.querySelectorAll('input[name="weight-unit"]').forEach(radio => {
    radio.addEventListener('change', function() {
        const resultDiv = document.getElementById('weight-result');
        if (!resultDiv.classList.contains('hidden')) {
            const age = parseInt(document.getElementById('weight-age').value);
            const gender = document.querySelector('input[name="weight-gender"]:checked')?.value;
            const percentile = document.getElementById('weight-percentile').value;

            try {
                const weight = calculateMeasurement(age, gender, percentile, 'weight');
                showWeightResult(weight, age, gender, percentile);
            } catch (error) {
                resultDiv.classList.add('hidden');
            }
        }
    });
});

// Length unit toggle change
document.querySelectorAll('input[name="length-unit"]').forEach(radio => {
    radio.addEventListener('change', function() {
        const resultDiv = document.getElementById('length-result');
        if (!resultDiv.classList.contains('hidden')) {
            const age = parseInt(document.getElementById('length-age').value);
            const gender = document.querySelector('input[name="length-gender"]:checked')?.value;
            const percentile = document.getElementById('length-percentile').value;

            try {
                const length = calculateMeasurement(age, gender, percentile, 'length');
                showLengthResult(length, age, gender, percentile);
            } catch (error) {
                resultDiv.classList.add('hidden');
            }
        }
    });
});

// Head unit toggle change
document.querySelectorAll('input[name="head-unit"]').forEach(radio => {
    radio.addEventListener('change', function() {
        const resultDiv = document.getElementById('head-result');
        if (!resultDiv.classList.contains('hidden')) {
            const age = parseInt(document.getElementById('head-age').value);
            const gender = document.querySelector('input[name="head-gender"]:checked')?.value;
            const percentile = document.getElementById('head-percentile').value;

            try {
                const head = calculateMeasurement(age, gender, percentile, 'head');
                showHeadResult(head, age, gender, percentile);
            } catch (error) {
                resultDiv.classList.add('hidden');
            }
        }
    });
});

// Function to show chart with just percentile curves (no selected point)
function showPercentileChart(canvasId, measurementType) {
    const defaultGender = 'girl';  // Show girls' curves by default
    createGrowthChart(canvasId, measurementType, defaultGender);
}

// Function to show default chart (just percentile curves, no values)
function showDefaultChart(tabName) {
    const resultDiv = document.getElementById(`${tabName}-result`);

    // Hide the measurement section, only show the chart
    const measurementSection = resultDiv.querySelector('.measurement-section');
    const measurementInfo = resultDiv.querySelector('.measurement-info');
    measurementSection.style.display = 'none';
    measurementInfo.style.display = 'none';

    // Show result div
    resultDiv.classList.remove('hidden');

    // Show chart with only percentile curves
    if (tabName === 'weight') {
        showPercentileChart('weight-chart', 'weight');
    } else if (tabName === 'length') {
        showPercentileChart('length-chart', 'length');
    } else if (tabName === 'head') {
        showPercentileChart('head-chart', 'head');
    }
}

// Initialize the app
document.addEventListener('DOMContentLoaded', async function() {
    console.log('Baby Growth Estimator loading...');

    // Load all WHO growth data from CSV files
    const dataLoaded = await loadAllData();

    if (!dataLoaded) {
        console.error('Failed to load WHO growth data');
        // Show error message to user
        document.querySelector('.container').innerHTML = `
            <header>
                <h1>Baby Growth Estimator</h1>
                <p>Error loading growth data</p>
            </header>
            <main style="background: white; padding: 40px; text-align: center; border-radius: 15px;">
                <p style="color: #ff6b6b; font-size: 1.1rem;">Failed to load WHO growth data. Please refresh the page or try again later.</p>
                <p style="margin-top: 20px; font-size: 0.9rem; color: #666;">Make sure you're running this application through a local server.</p>
            </main>
        `;
        return;
    }

    console.log('Baby Growth Estimator loaded successfully');

    // Initialize tab button event listeners
    document.querySelectorAll('.tab-button').forEach(button => {
        button.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            switchTab(tabName);

            // Show default chart for tab if no result is visible
            const resultDiv = document.getElementById(`${tabName}-result`);
            if (resultDiv.classList.contains('hidden')) {
                showDefaultChart(tabName);
            }
        });
    });

    // Initialize input synchronization after DOM is loaded
    syncInputs();

    // Show default chart on page load
    showDefaultChart('weight');
});
