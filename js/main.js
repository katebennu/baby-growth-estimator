// Main module - Application initialization

import { loadAllData } from './data.js';
import { showDefaultChart } from './charts.js';
import {
    syncInputs,
    setupWeightForm,
    setupLengthForm,
    setupHeadForm,
    setupUnitToggles,
    setupTabButtons
} from './forms.js';

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
    setupTabButtons();

    // Initialize form submissions
    setupWeightForm();
    setupLengthForm();
    setupHeadForm();

    // Initialize unit toggles
    setupUnitToggles();

    // Initialize input synchronization
    syncInputs();

    // Show default chart on page load
    showDefaultChart('weight');
});
