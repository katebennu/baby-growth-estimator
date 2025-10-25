// UI module - Display functions

import { kgToLbs, cmToInches, formatWeight, formatLength, formatHeadCircumference, getSelectedUnit } from './conversions.js';
import { getPercentileDescription } from './calculations.js';
import { createGrowthChart } from './charts.js';

// Helper function to get practical context for weight
function getWeightContext(weightKg, age) {
    const weightLbs = kgToLbs(weightKg);
    const contexts = [];

    // Car seat recommendations
    if (weightLbs < 22) {
        contexts.push("Most infant car seats support up to 22-35 lbs");
    } else if (weightLbs < 40) {
        contexts.push("Convertible car seat recommended (up to 40-65 lbs)");
    }

    // Stroller weight capacity
    if (weightLbs < 35) {
        contexts.push("Standard strollers support 35-50 lbs");
    }

    return contexts;
}

// Helper function to get practical context for length
function getLengthContext(lengthCm, age) {
    const lengthInches = cmToInches(lengthCm);
    const contexts = [];

    // Sleep space recommendations
    if (lengthInches < 25) {
        contexts.push("Bassinet or cradle suitable (typically up to 25\")");
    } else if (lengthInches < 35) {
        contexts.push("Transition to crib recommended (fits up to ~35\")");
    } else {
        contexts.push("Standard crib appropriate (up to ~52\")");
    }

    return contexts;
}

// Helper function to get practical context for head circumference
function getHeadContext(headCm) {
    const contexts = [];

    // Note: Hat sizes vary significantly by brand
    // Removed specific recommendations to avoid inaccuracy

    return contexts;
}

// Function to show weight result
export function showWeightResult(weight, age, gender, percentile) {
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

    // Build info text with practical context
    const contexts = getWeightContext(weight, age);
    let infoHTML = `<p>A ${age}-month-old ${genderText} at the ${percentileDesc}</p>`;
    if (contexts.length > 0) {
        infoHTML += '<div class="practical-tips"><strong>Planning Tips:</strong><ul>';
        contexts.forEach(context => {
            infoHTML += `<li>${context}</li>`;
        });
        infoHTML += '</ul></div>';
    }
    document.getElementById('weight-info').innerHTML = infoHTML;

    // Create chart
    createGrowthChart('weight-chart', 'weight', gender, age, percentile, weight);

    resultDiv.classList.remove('hidden');
}

// Function to show weight percentile result
export function showWeightPercentileResult(weight, percentile, age, gender) {
    const resultDiv = document.getElementById('weight-result');
    const errorDiv = document.getElementById('weight-error');

    errorDiv.classList.add('hidden');

    // Update title
    resultDiv.querySelector('h3').textContent = 'Percentile Result';

    // Show measurement section and info
    const measurementSection = resultDiv.querySelector('.measurement-section');
    const measurementInfo = resultDiv.querySelector('.measurement-info');
    measurementSection.style.display = 'block';
    measurementInfo.style.display = 'block';

    const weightValue = document.getElementById('weightValue');
    const weightUnit = document.getElementById('weightUnit');
    const convertedWeight = document.getElementById('convertedWeight');
    const convertedUnit = document.getElementById('convertedUnit');

    // Display the percentile prominently
    weightValue.textContent = percentile.toFixed(1);
    weightUnit.textContent = getPercentileDescription(percentile).replace(`${Math.round(percentile)}`, '').trim();
    convertedWeight.textContent = `${weight} kg`;
    convertedUnit.textContent = '';
    weightValue.parentElement.classList.remove('lbs-oz');
    convertedWeight.parentElement.classList.remove('lbs-oz');

    const genderText = gender === 'boy' ? 'boy' : 'girl';
    document.getElementById('weight-info').textContent = `A ${age}-month-old ${genderText} weighing ${weight} kg is at the ${getPercentileDescription(percentile)}`;

    // Create chart
    createGrowthChart('weight-chart', 'weight', gender, age, percentile, weight);

    resultDiv.classList.remove('hidden');
}

// Function to show length result
export function showLengthResult(length, age, gender, percentile) {
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

    // Build info text with practical context
    const contexts = getLengthContext(length, age);
    let infoHTML = `<p>A ${age}-month-old ${genderText} at the ${percentileDesc}</p>`;
    if (contexts.length > 0) {
        infoHTML += '<div class="practical-tips"><strong>Planning Tips:</strong><ul>';
        contexts.forEach(context => {
            infoHTML += `<li>${context}</li>`;
        });
        infoHTML += '</ul></div>';
    }
    document.getElementById('length-info').innerHTML = infoHTML;

    // Create chart
    createGrowthChart('length-chart', 'length', gender, age, percentile, length);

    resultDiv.classList.remove('hidden');
}

// Function to show length percentile result
export function showLengthPercentileResult(length, percentile, age, gender) {
    const resultDiv = document.getElementById('length-result');
    const errorDiv = document.getElementById('length-error');

    errorDiv.classList.add('hidden');

    // Update title
    resultDiv.querySelector('h3').textContent = 'Percentile Result';

    // Show measurement section and info
    const measurementSection = resultDiv.querySelector('.measurement-section');
    const measurementInfo = resultDiv.querySelector('.measurement-info');
    measurementSection.style.display = 'block';
    measurementInfo.style.display = 'block';

    const lengthValue = document.getElementById('lengthValue');
    const lengthUnit = document.getElementById('lengthUnit');
    const convertedLength = document.getElementById('convertedLength');
    const convertedLengthUnit = document.getElementById('convertedLengthUnit');

    // Display the percentile prominently
    lengthValue.textContent = percentile.toFixed(1);
    lengthUnit.textContent = getPercentileDescription(percentile).replace(`${Math.round(percentile)}`, '').trim();
    convertedLength.textContent = `${length} cm`;
    convertedLengthUnit.textContent = '';

    const genderText = gender === 'boy' ? 'boy' : 'girl';
    document.getElementById('length-info').textContent = `A ${age}-month-old ${genderText} with length ${length} cm is at the ${getPercentileDescription(percentile)}`;

    // Create chart
    createGrowthChart('length-chart', 'length', gender, age, percentile, length);

    resultDiv.classList.remove('hidden');
}

// Function to show head circumference result
export function showHeadResult(head, age, gender, percentile) {
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

    // Build info text with practical context
    const contexts = getHeadContext(head);
    let infoHTML = `<p>A ${age}-month-old ${genderText} at the ${percentileDesc}</p>`;
    if (contexts.length > 0) {
        infoHTML += '<div class="practical-tips"><strong>Planning Tips:</strong><ul>';
        contexts.forEach(context => {
            infoHTML += `<li>${context}</li>`;
        });
        infoHTML += '</ul></div>';
    }
    document.getElementById('head-info').innerHTML = infoHTML;

    // Create chart
    createGrowthChart('head-chart', 'head', gender, age, percentile, head);

    resultDiv.classList.remove('hidden');
}

// Function to show head circumference percentile result
export function showHeadPercentileResult(head, percentile, age, gender) {
    const resultDiv = document.getElementById('head-result');
    const errorDiv = document.getElementById('head-error');

    errorDiv.classList.add('hidden');

    // Update title
    resultDiv.querySelector('h3').textContent = 'Percentile Result';

    // Show measurement section and info
    const measurementSection = resultDiv.querySelector('.measurement-section');
    const measurementInfo = resultDiv.querySelector('.measurement-info');
    measurementSection.style.display = 'block';
    measurementInfo.style.display = 'block';

    const headValue = document.getElementById('headValue');
    const headUnit = document.getElementById('headUnit');
    const convertedHead = document.getElementById('convertedHead');
    const convertedHeadUnit = document.getElementById('convertedHeadUnit');

    // Display the percentile prominently
    headValue.textContent = percentile.toFixed(1);
    headUnit.textContent = getPercentileDescription(percentile).replace(`${Math.round(percentile)}`, '').trim();
    convertedHead.textContent = `${head} cm`;
    convertedHeadUnit.textContent = '';

    const genderText = gender === 'boy' ? 'boy' : 'girl';
    document.getElementById('head-info').textContent = `A ${age}-month-old ${genderText} with head circumference ${head} cm is at the ${getPercentileDescription(percentile)}`;

    // Create chart
    createGrowthChart('head-chart', 'head', gender, age, percentile, head);

    resultDiv.classList.remove('hidden');
}

// Function to show error for specific tab
export function showError(tabName, message) {
    const resultDiv = document.getElementById(`${tabName}-result`);
    const errorDiv = document.getElementById(`${tabName}-error`);
    const errorMessage = document.getElementById(`${tabName}-error-message`);

    resultDiv.classList.add('hidden');
    errorMessage.textContent = message;
    errorDiv.classList.remove('hidden');
}
