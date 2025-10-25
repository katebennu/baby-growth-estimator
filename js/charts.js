// Charts module - Chart.js functions

import {
    boysWeightData, girlsWeightData,
    boysLengthData, girlsLengthData,
    boysHeadData, girlsHeadData
} from './data.js';
import { getPercentileDescription } from './calculations.js';

// Store chart instances
let weightChart = null;
let lengthChart = null;
let headChart = null;

// Function to create growth chart
export function createGrowthChart(canvasId, measurementType, gender, selectedAge = null, selectedPercentile = null, selectedValue = null) {
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
