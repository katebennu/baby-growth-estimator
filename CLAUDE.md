# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Baby Growth Predictor is a client-side web application that estimates baby growth measurements (weight, length, head circumference) based on WHO (World Health Organization) growth standards. The app covers ages 0-24 months with support for both genders and multiple percentiles (2nd through 98th).

**Data Source**: [WHO Child Growth Standards (CDC)](https://www.cdc.gov/growthcharts/who-data-files.htm)

## Running the Application

This is a React application built with Vite.

### Development Server
```bash
npm run dev
```

Then open the URL shown in the terminal (typically `http://localhost:5173`).

### Production Build
```bash
npm run build
npm run preview
```

The build command creates an optimized production build in the `dist/` folder.

## Development

### Installation
```bash
npm install
```

### Running Tests
```bash
# Run all tests
npm test

# Run tests with UI
npm run test:ui

# Generate coverage report
npm run test:coverage
```

### Test Suite
- **calculations.test.js**: Tests for WHO LMS formulas, z-score conversions, percentile calculations
- **conversions.test.js**: Tests for unit conversions (kg/lbs, cm/inches) and formatting
- **data.test.js**: Tests for CSV loading, parsing, and data validation

The test suite uses Vitest and covers core calculation and data handling logic. UI modules are excluded from coverage as they require DOM environment.

## Architecture

This is a React single-page application built with Vite.

### React Component Structure
- **App.jsx**: Root component managing tab state and shared inputs (age, gender, percentile)
- **Header.jsx**: Simple header component
- **Footer.jsx**: Footer with GitHub link
- **WelcomeSection.jsx**: Welcome text and collapsible help sections
- **TabButtons.jsx**: Tab switcher for Weight/Length/Head Circumference
- **MeasurementTab.jsx**: Container for each measurement type (weight, length, head)
- **MeasurementForm.jsx**: Reusable form component with age slider, gender selection, and percentile slider
- **MeasurementResult.jsx**: Displays calculation results, charts, practical tips, and age comparison table

### Data Layer
- **WHO Growth Data**: Loaded from CSV files at runtime using the Fetch API, containing WHO LMS (Lambda-Mu-Sigma) method data
  - Weight data: `boysWeightData`, `girlsWeightData` (loaded from WHO-*-Weight-for-age-Percentiles.csv)
  - Length data: `boysLengthData`, `girlsLengthData` (loaded from WHO-*-Length-for-age-Percentiles.csv)
  - Head circumference data: `boysHeadData`, `girlsHeadData` (loaded from WHO-*-Head-Circumference-for-age-Percentiles.csv)
- Each data array contains rows of [age, L, M, S, P2.3, P5, P10, P25, P50, P75, P90, P95, P97.7] values
- CSV files are parsed into numeric arrays by `src/data.js` module

### Calculation Engine
- `calculateMeasurement(age, gender, percentile, measurementType)`: Core function that looks up the appropriate data array, finds the age row, and returns the percentile value
- `generateAgeComparison(currentAge, gender, percentile, measurementType)`: Generates future growth estimates at 3-month intervals
- Direct array lookup approach (not interpolation) - only whole month ages are supported

### Unit Conversion
- Weight: `kgToLbs()`, `lbsToKg()`, `lbsToLbsOz()` (converts decimal pounds to pounds + ounces format)
- Length: `cmToInches()`, `inchesToCm()`
- Head: Uses same cm/inches conversion as length
- Display formatters: `formatWeight()`, `formatLength()`, `formatHeadCircumference()`

## File Structure

```
baby-weight-predictor/
├── index.html          # Vite entry point (mounts React app)
├── styles.css          # All styling and responsive design
├── vite.config.js      # Vite configuration with React plugin and test settings
├── src/                # React application source
│   ├── main.jsx        # React entry point (renders App)
│   ├── App.jsx         # Root React component
│   ├── components/     # React components
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── WelcomeSection.jsx
│   │   ├── TabButtons.jsx
│   │   ├── MeasurementTab.jsx
│   │   ├── MeasurementForm.jsx
│   │   └── MeasurementResult.jsx
│   ├── data.js         # CSV loading and parsing
│   ├── calculations.js # WHO LMS formulas
│   ├── conversions.js  # Unit conversion functions
│   └── charts.js       # Chart.js functions
├── tests/             # Test suite (Vitest)
│   ├── calculations.test.js
│   ├── conversions.test.js
│   └── data.test.js
├── package.json       # Dependencies and scripts
├── vitest.config.js   # Test configuration
├── .gitignore        # Git ignore rules
├── README.md         # User documentation
├── CLAUDE.md         # Developer documentation
├── WHO-Boys-Weight-for-age-Percentiles.csv
├── WHO-Girls-Weight-for-age-Percentiles.csv
├── WHO-Boys-Length-for-age-Percentiles.csv
├── WHO-Girls-Length-for-age-Percentiles.csv
├── WHO-Boys-Head-Circumference-for-age-Percentiles.csv
└── WHO-Girls-Head-Circumference-for-age-Percentiles.csv
```

### Component Dependencies

```
App.jsx (root component)
├── Header.jsx
├── WelcomeSection.jsx
├── TabButtons.jsx
└── MeasurementTab.jsx (3 instances: weight, length, head)
    ├── MeasurementForm.jsx
    │   └── calculations.js (calculateMeasurement)
    └── MeasurementResult.jsx
        ├── conversions.js (formatters, unit conversions)
        ├── calculations.js (getPercentileDescription, generateAgeComparison)
        └── charts.js (createGrowthChart)
```

## Important Implementation Details

1. **React + Vite**: The app uses React 18 with Vite for fast development and optimized builds. Vite handles module bundling, hot module replacement, and asset optimization.

2. **State Management**: Uses React's built-in `useState` hook. Shared inputs (age, gender, percentile) are lifted to the App component and synced across all three tabs.

3. **Data loading**: WHO CSV files are loaded at runtime using the Fetch API in `src/data.js`. Vite's dev server handles serving these files during development.

4. **Age must be whole months**: The lookup logic expects exact month values (0-24). No interpolation is performed for fractional months.

5. **LMS Method**: Uses WHO's Lambda-Mu-Sigma method for calculating growth measurements from percentiles.

6. **Client-side only**: No backend or API calls (except for loading CSV files). All calculations happen in the browser.

7. **Component Reusability**: The refactor eliminated HTML repetition by creating reusable components. The same MeasurementForm and MeasurementResult components are used for all three measurement types (weight, length, head).

8. **Unit display philosophy**: Always show both the selected unit (lbs/inches) and the converted unit (kg/cm) for user convenience.
