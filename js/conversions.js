// Conversions module - Unit conversion functions

// Function to convert kg to lbs
export function kgToLbs(kg) {
    return Math.round(kg * 2.20462 * 100) / 100; // Round to 2 decimal places
}

// Function to convert lbs to kg
export function lbsToKg(lbs) {
    return Math.round(lbs / 2.20462 * 100) / 100; // Round to 2 decimal places
}

// Function to convert cm to inches
export function cmToInches(cm) {
    return Math.round(cm / 2.54 * 100) / 100; // Round to 2 decimal places
}

// Function to convert inches to cm
export function inchesToCm(inches) {
    return Math.round(inches * 2.54 * 100) / 100; // Round to 2 decimal places
}

// Function to convert decimal pounds to pounds and ounces
export function lbsToLbsOz(decimalLbs) {
    const pounds = Math.floor(decimalLbs);
    const ounces = Math.round((decimalLbs - pounds) * 16);
    return { pounds, ounces };
}

// Function to format weight display
export function formatWeight(weight, unit) {
    if (unit === 'lbs') {
        const { pounds, ounces } = lbsToLbsOz(weight);
        return `${pounds} lbs ${ounces} oz`;
    } else {
        return `${weight} kg`;
    }
}

// Function to format length display
export function formatLength(length, unit) {
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
export function formatHeadCircumference(head, unit) {
    if (unit === 'inches') {
        const inches = cmToInches(head);
        return `${inches}"`;
    } else {
        return `${head} cm`;
    }
}

// Function to get selected unit for a specific tab
export function getSelectedUnit(tabName) {
    // Always return imperial units (lbs for weight, inches for length/head)
    if (tabName === 'weight') {
        return 'lbs';
    } else {
        return 'inches';
    }
}
