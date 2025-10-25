// Forms module - Form handling, validation, and event listeners

import { calculateMeasurement, calculatePercentile } from './calculations.js';
import {
    showWeightResult, showWeightPercentileResult,
    showLengthResult, showLengthPercentileResult,
    showHeadResult, showHeadPercentileResult,
    showError
} from './ui.js';
import { showDefaultChart } from './charts.js';

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
export function switchTab(tabName) {
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

// Setup percentile preset buttons
function setupPresetButtons() {
    const presetButtons = document.querySelectorAll('.preset-btn');

    presetButtons.forEach(button => {
        button.addEventListener('click', function() {
            const percentile = this.getAttribute('data-percentile');

            // Update all percentile sliders and displays
            const percentileInputs = [
                document.getElementById('weight-percentile'),
                document.getElementById('length-percentile'),
                document.getElementById('head-percentile')
            ];

            const percentileDisplays = [
                document.getElementById('weight-percentile-display'),
                document.getElementById('length-percentile-display'),
                document.getElementById('head-percentile-display')
            ];

            percentileInputs.forEach(input => {
                input.value = percentile;
            });

            percentileDisplays.forEach(display => {
                display.textContent = percentile;
            });
        });
    });
}

// Synchronize inputs across tabs
export function syncInputs() {
    // Setup preset buttons
    setupPresetButtons();
    // Age synchronization with slider display update
    const ageInputs = [
        document.getElementById('weight-age'),
        document.getElementById('length-age'),
        document.getElementById('head-age')
    ];

    const ageDisplays = [
        document.getElementById('weight-age-display'),
        document.getElementById('length-age-display'),
        document.getElementById('head-age-display')
    ];

    ageInputs.forEach((input, index) => {
        input.addEventListener('input', function() {
            const value = this.value;
            // Update this slider's display
            ageDisplays[index].textContent = value;
            // Sync to other tabs
            ageInputs.forEach((otherInput, otherIndex) => {
                if (otherInput !== input) {
                    otherInput.value = value;
                    ageDisplays[otherIndex].textContent = value;
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

    // Percentile synchronization with slider display update
    const percentileInputs = [
        document.getElementById('weight-percentile'),
        document.getElementById('length-percentile'),
        document.getElementById('head-percentile')
    ];

    const percentileDisplays = [
        document.getElementById('weight-percentile-display'),
        document.getElementById('length-percentile-display'),
        document.getElementById('head-percentile-display')
    ];

    percentileInputs.forEach((input, index) => {
        input.addEventListener('input', function() {
            const value = this.value;
            // Update this slider's display
            percentileDisplays[index].textContent = value;
            // Sync to other tabs
            percentileInputs.forEach((otherInput, otherIndex) => {
                if (otherInput !== input) {
                    otherInput.value = value;
                    percentileDisplays[otherIndex].textContent = value;
                }
            });
        });
    });
}

// Weight form submission
export function setupWeightForm() {
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
}

// Length form submission
export function setupLengthForm() {
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
}

// Head circumference form submission
export function setupHeadForm() {
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
}

// Unit toggle change handlers - No longer needed, always using imperial units
export function setupUnitToggles() {
    // Function kept for backwards compatibility but does nothing
    // Units are now hardcoded to imperial (lbs/inches) in getSelectedUnit()
}

// Tab button event listeners
export function setupTabButtons() {
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
}
