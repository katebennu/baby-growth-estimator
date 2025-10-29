// Charts module - Chart.js functions

import {
    Chart,
    LineController,
    LineElement,
    PointElement,
    LinearScale,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

import {
    boysWeightData, girlsWeightData,
    boysLengthData, girlsLengthData,
    boysHeadData, girlsHeadData
} from './data.js';
import { getPercentileDescription } from './calculations.js';
import { kgToLbs, cmToInches } from './conversions.js';

// Register Chart.js components
Chart.register(
    LineController,
    LineElement,
    PointElement,
    LinearScale,
    Title,
    Tooltip,
    Legend
);

// Store chart instances
let weightChart = null;
let lengthChart = null;
let headChart = null;

// Function to update just the selected point (no re-render of curves)
export function updateChartPoint(canvasOrId, measurementType, gender, selectedAge, selectedPercentile, selectedValue) {
    // Support both canvas element (from React ref) and canvas ID (from vanilla JS)
    const canvas = typeof canvasOrId === 'string'
        ? document.getElementById(canvasOrId)
        : canvasOrId;

    if (!canvas) {
        console.error('Canvas element not found:', canvasOrId);
        return;
    }

    // Get the existing chart instance
    let chart = canvas.chart;

    if (!chart) {
        // If no chart exists, create one
        createGrowthChart(canvasOrId, measurementType, gender, selectedAge, selectedPercentile, selectedValue);
        return;
    }

    // Find the "Your baby" dataset (it should be the last one)
    const yourBabyDatasetIndex = chart.data.datasets.findIndex(ds => ds.label && ds.label.includes('Your baby'));

    if (yourBabyDatasetIndex !== -1) {
        // Update existing dataset
        chart.data.datasets[yourBabyDatasetIndex].label = `Your baby (${getPercentileDescription(selectedPercentile)})`;
        chart.data.datasets[yourBabyDatasetIndex].data = [{
            x: selectedAge,
            y: measurementType === 'weight' ? kgToLbs(selectedValue) :
               measurementType === 'length' ? cmToInches(selectedValue) :
               cmToInches(selectedValue) // head circumference
        }];
    } else {
        // Add new dataset for selected point
        chart.data.datasets.push({
            label: `Your baby (${getPercentileDescription(selectedPercentile)})`,
            data: [{
                x: selectedAge,
                y: measurementType === 'weight' ? kgToLbs(selectedValue) :
                   measurementType === 'length' ? cmToInches(selectedValue) :
                   cmToInches(selectedValue) // head circumference
            }],
            borderColor: 'rgba(255, 0, 0, 1)',
            backgroundColor: 'rgba(255, 0, 0, 1)',
            pointRadius: 5,
            pointHoverRadius: 7,
            showLine: false
        });
    }

    // Update the chart without recreating it
    chart.update('none'); // 'none' mode = no animation for instant update
}

// Function to create growth chart
export function createGrowthChart(canvasOrId, measurementType, gender, selectedAge = null, selectedPercentile = null, selectedValue = null) {
    // Support both canvas element (from React ref) and canvas ID (from vanilla JS)
    const canvas = typeof canvasOrId === 'string'
        ? document.getElementById(canvasOrId)
        : canvasOrId;

    if (!canvas) {
        console.error('Canvas element not found:', canvasOrId);
        return;
    }

    const ctx = canvas.getContext('2d');

    // Destroy existing chart if it exists (check by measurement type or canvas)
    if (measurementType === 'weight' && weightChart) {
        weightChart.destroy();
        weightChart = null;
    } else if (measurementType === 'length' && lengthChart) {
        lengthChart.destroy();
        lengthChart = null;
    } else if (measurementType === 'head' && headChart) {
        headChart.destroy();
        headChart = null;
    }

    // Also check if there's a chart instance already attached to this canvas
    if (canvas.chart) {
        canvas.chart.destroy();
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
        { percentile: 5, index: 5, color: 'rgba(255, 99, 132, 0.8)', label: '5th' },
        { percentile: 25, index: 7, color: 'rgba(54, 162, 235, 0.8)', label: '25th' },
        { percentile: 50, index: 8, color: 'rgba(75, 192, 192, 0.8)', label: '50th' },
        { percentile: 75, index: 9, color: 'rgba(153, 102, 255, 0.8)', label: '75th' },
        { percentile: 95, index: 11, color: 'rgba(255, 159, 64, 0.8)', label: '95th' }
    ];

    // Generate datasets for percentile curves
    const datasets = percentilesToShow.map(p => {
        const isSelectedPercentile = selectedPercentile !== null && Math.abs(p.percentile - selectedPercentile) < 5;

        return {
            label: `${p.label} percentile`,
            data: data.map(row => ({
                x: row[0],
                y: measurementType === 'weight' ? kgToLbs(row[p.index]) :
                   measurementType === 'length' ? cmToInches(row[p.index]) :
                   cmToInches(row[p.index]) // head circumference
            })),
            borderColor: isSelectedPercentile ? p.color : p.color.replace('0.8)', '0.3)'),
            backgroundColor: 'transparent',
            borderWidth: isSelectedPercentile ? 3 : 2,
            pointRadius: 0,
            tension: 0.4
        };
    });

    // If the selected percentile doesn't match a standard curve, calculate and add it
    if (selectedPercentile !== null && selectedValue !== null) {
        const isStandardPercentile = percentilesToShow.some(p => Math.abs(p.percentile - selectedPercentile) < 5);

        if (!isStandardPercentile) {
            // Calculate values for the selected percentile curve
            const selectedCurveData = data.map(row => {
                const age = row[0];
                const L = row[1];
                const M = row[2];
                const S = row[3];

                // Convert percentile to z-score
                const p = selectedPercentile / 100;
                let z;
                if (p < 0.5) {
                    const t = Math.sqrt(-2 * Math.log(p));
                    z = -(t - ((0.010328 * t + 0.802853) * t + 2.515517) / (((0.001308 * t + 0.189269) * t + 1.432788) * t + 1));
                } else {
                    const t = Math.sqrt(-2 * Math.log(1 - p));
                    z = t - ((0.010328 * t + 0.802853) * t + 2.515517) / (((0.001308 * t + 0.189269) * t + 1.432788) * t + 1);
                }

                // Calculate measurement using LMS formula
                let value;
                if (Math.abs(L) < 0.01) {
                    value = M * Math.exp(S * z);
                } else {
                    value = M * Math.pow(1 + L * S * z, 1 / L);
                }

                return {
                    x: age,
                    y: measurementType === 'weight' ? kgToLbs(value) :
                       measurementType === 'length' ? cmToInches(value) :
                       cmToInches(value) // head circumference
                };
            });

            datasets.push({
                label: `${selectedPercentile}th percentile`,
                data: selectedCurveData,
                borderColor: 'rgba(0, 150, 0, 0.9)',
                backgroundColor: 'transparent',
                borderWidth: 3,
                pointRadius: 0,
                tension: 0.4
            });
        }
    }

    // Add the selected point only if values are provided
    if (selectedAge !== null && selectedPercentile !== null && selectedValue !== null) {
        datasets.push({
            label: `Your baby (${getPercentileDescription(selectedPercentile)})`,
            data: [{
                x: selectedAge,
                y: measurementType === 'weight' ? kgToLbs(selectedValue) :
                   measurementType === 'length' ? cmToInches(selectedValue) :
                   cmToInches(selectedValue) // head circumference
            }],
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
        yAxisLabel = 'Weight (lbs)';
    } else if (measurementType === 'length') {
        yAxisLabel = 'Length (inches)';
    } else {
        yAxisLabel = 'Head Circumference (inches)';
    }

    // Create chart
    const chart = new Chart(ctx, {
        type: 'line',
        data: { datasets },
        options: {
            responsive: true,
            maintainAspectRatio: false,
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

    // Store chart instance (by measurement type and also on the canvas element)
    if (measurementType === 'weight') {
        weightChart = chart;
    } else if (measurementType === 'length') {
        lengthChart = chart;
    } else if (measurementType === 'head') {
        headChart = chart;
    }

    // Also store on canvas element for easier cleanup in React
    canvas.chart = chart;
}

// Function to update percentile highlighting without recreating the entire chart
export function updatePercentileHighlight(canvasOrId, measurementType, gender, selectedAge, selectedPercentile, selectedValue) {
    const canvas = typeof canvasOrId === 'string'
        ? document.getElementById(canvasOrId)
        : canvasOrId;

    if (!canvas) {
        console.error('Canvas element not found:', canvasOrId);
        return;
    }

    let chart = canvas.chart;

    if (!chart) {
        createGrowthChart(canvasOrId, measurementType, gender, selectedAge, selectedPercentile, selectedValue);
        return;
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

    const percentilesToShow = [
        { percentile: 5, index: 5, color: 'rgba(255, 99, 132, 0.8)', label: '5th' },
        { percentile: 25, index: 7, color: 'rgba(54, 162, 235, 0.8)', label: '25th' },
        { percentile: 50, index: 8, color: 'rgba(75, 192, 192, 0.8)', label: '50th' },
        { percentile: 75, index: 9, color: 'rgba(153, 102, 255, 0.8)', label: '75th' },
        { percentile: 95, index: 11, color: 'rgba(255, 159, 64, 0.8)', label: '95th' }
    ];

    // Determine if we'll show a custom curve
    const willShowCustomCurve = selectedPercentile !== null &&
                                 (selectedPercentile < 5 ||
                                  selectedPercentile > 95 ||
                                  !percentilesToShow.some(p => Math.abs(p.percentile - selectedPercentile) < 5));

    // Update the styling of standard percentile curves
    percentilesToShow.forEach((p, index) => {
        const dataset = chart.data.datasets[index];

        if (dataset) {
            // Only highlight if this exact percentile matches AND we're not showing a custom curve
            const isSelectedPercentile = !willShowCustomCurve &&
                                          selectedPercentile !== null &&
                                          Math.abs(p.percentile - selectedPercentile) < 5;

            dataset.borderColor = isSelectedPercentile ? p.color : p.color.replace('0.8)', '0.3)');
            dataset.borderWidth = isSelectedPercentile ? 3 : 2;
        }
    });

    // Handle custom percentile curve
    // Consider it a standard percentile if it's within 5 points AND within the 5-95 range
    const isStandardPercentile = selectedPercentile >= 5 &&
                                  selectedPercentile <= 95 &&
                                  percentilesToShow.some(p => Math.abs(p.percentile - selectedPercentile) < 5);

    // Find ALL custom curves (not just the first one)
    const standardLabels = percentilesToShow.map(p => `${p.label} percentile`);
    const customCurveIndices = chart.data.datasets
        .map((ds, index) => ({
            index,
            isCustom: ds.label &&
                     ds.label.includes('th percentile') &&
                     !ds.label.includes('Your baby') &&
                     !standardLabels.includes(ds.label)
        }))
        .filter(item => item.isCustom)
        .map(item => item.index);

    // Remove all existing custom curves first
    for (let i = customCurveIndices.length - 1; i >= 0; i--) {
        chart.data.datasets.splice(customCurveIndices[i], 1);
    }

    if (!isStandardPercentile && selectedPercentile !== null && selectedValue !== null) {
        // Calculate values for the selected percentile curve
        const selectedCurveData = data.map(row => {
            const age = row[0];
            const L = row[1];
            const M = row[2];
            const S = row[3];

            const p = selectedPercentile / 100;
            let z;
            if (p < 0.5) {
                const t = Math.sqrt(-2 * Math.log(p));
                z = -(t - ((0.010328 * t + 0.802853) * t + 2.515517) / (((0.001308 * t + 0.189269) * t + 1.432788) * t + 1));
            } else {
                const t = Math.sqrt(-2 * Math.log(1 - p));
                z = t - ((0.010328 * t + 0.802853) * t + 2.515517) / (((0.001308 * t + 0.189269) * t + 1.432788) * t + 1);
            }

            let value;
            if (Math.abs(L) < 0.01) {
                value = M * Math.exp(S * z);
            } else {
                value = M * Math.pow(1 + L * S * z, 1 / L);
            }

            return {
                x: age,
                y: measurementType === 'weight' ? kgToLbs(value) :
                   measurementType === 'length' ? cmToInches(value) :
                   cmToInches(value) // head circumference
            };
        });

        // Add new custom curve (insert before the red dot)
        const redDotIndex = chart.data.datasets.findIndex(ds => ds.label && ds.label.includes('Your baby'));
        const insertIndex = redDotIndex !== -1 ? redDotIndex : chart.data.datasets.length;

        chart.data.datasets.splice(insertIndex, 0, {
            label: `${selectedPercentile}th percentile`,
            data: selectedCurveData,
            borderColor: 'rgba(0, 150, 0, 0.9)',
            backgroundColor: 'transparent',
            borderWidth: 3,
            pointRadius: 0,
            tension: 0.4
        });
    }

    // Update the red dot
    const yourBabyDatasetIndex = chart.data.datasets.findIndex(ds => ds.label && ds.label.includes('Your baby'));
    if (yourBabyDatasetIndex !== -1) {
        chart.data.datasets[yourBabyDatasetIndex].label = `Your baby (${getPercentileDescription(selectedPercentile)})`;
        chart.data.datasets[yourBabyDatasetIndex].data = [{
            x: selectedAge,
            y: measurementType === 'weight' ? kgToLbs(selectedValue) :
               measurementType === 'length' ? cmToInches(selectedValue) : selectedValue
        }];
    }

    chart.update('none'); // 'none' mode = no animation for instant update
}

// Function to show chart with just percentile curves (no selected point)
export function showPercentileChart(canvasId, measurementType) {
    const defaultGender = 'girl';  // Show girls' curves by default
    createGrowthChart(canvasId, measurementType, defaultGender);
}

// Function to show default chart (just percentile curves, no values)
export function showDefaultChart(tabName) {
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
