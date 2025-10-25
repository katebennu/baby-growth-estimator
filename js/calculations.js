// Calculations module - WHO LMS formulas and percentile conversions

import {
    boysWeightData, girlsWeightData,
    boysLengthData, girlsLengthData,
    boysHeadData, girlsHeadData
} from './data.js';

// Function to convert percentile to z-score using approximation
export function percentileToZScore(percentile) {
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

// Function to convert z-score to percentile using normal CDF approximation
export function zScoreToPercentile(z) {
    // Using the error function approximation
    const t = 1 / (1 + 0.2316419 * Math.abs(z));
    const d = 0.3989423 * Math.exp(-z * z / 2);
    const prob = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));

    let p;
    if (z >= 0) {
        p = 1 - prob;
    } else {
        p = prob;
    }

    // Convert to percentile (0-100)
    const percentile = p * 100;

    // Clamp to 1-99 range
    return Math.max(1, Math.min(99, Math.round(percentile * 10) / 10));
}

// Function to calculate measurement using WHO LMS method
export function calculateMeasurement(age, gender, percentile, measurementType) {
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

// Function to calculate percentile from measurement (inverse LMS)
export function calculatePercentile(age, gender, measurement, measurementType) {
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

    // Calculate z-score from measurement (inverse LMS formula)
    let z;
    if (Math.abs(L) < 0.01) {
        // When L is close to 0, use logarithmic formula
        z = Math.log(measurement / M) / S;
    } else {
        // Standard inverse LMS formula
        z = (Math.pow(measurement / M, L) - 1) / (L * S);
    }

    // Convert z-score to percentile
    const percentile = zScoreToPercentile(z);

    return percentile;
}

// Function to get percentile description
export function getPercentileDescription(percentile) {
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
