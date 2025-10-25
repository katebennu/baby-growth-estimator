// UI module - Display functions

import { kgToLbs, formatWeight, formatLength, formatHeadCircumference, getSelectedUnit } from './conversions.js';
import { getPercentileDescription } from './calculations.js';
import { createGrowthChart } from './charts.js';

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
    document.getElementById('weight-info').textContent = `A ${age}-month-old ${genderText} at the ${percentileDesc}`;

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
    document.getElementById('length-info').textContent = `A ${age}-month-old ${genderText} at the ${percentileDesc}`;

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
    document.getElementById('head-info').textContent = `A ${age}-month-old ${genderText} at the ${percentileDesc}`;

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
