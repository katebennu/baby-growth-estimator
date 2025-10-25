# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Baby Growth Predictor is a client-side web application that estimates baby growth measurements (weight, length, head circumference) based on WHO (World Health Organization) growth standards. The app covers ages 0-24 months with support for both genders and multiple percentiles (2nd through 98th).

**Data Source**: [WHO Child Growth Standards (CDC)](https://www.cdc.gov/growthcharts/who-data-files.htm)

## Running the Application

### Local Development Server (Recommended)
```bash
# Python 3
python3 -m http.server 8000

# Node.js
npx http-server

# PHP
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

### Direct File Access
Open `index.html` directly in a web browser (may have CORS issues with CSV loading in some browsers).

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

### Data Layer
- **WHO Growth Data**: Loaded from CSV files at runtime using the Fetch API, containing WHO LMS (Lambda-Mu-Sigma) method data
  - Weight data: `boysWeightData`, `girlsWeightData` (loaded from WHO-*-Weight-for-age-Percentiles.csv)
  - Length data: `boysLengthData`, `girlsLengthData` (loaded from WHO-*-Length-for-age-Percentiles.csv)
  - Head circumference data: `boysHeadData`, `girlsHeadData` (loaded from WHO-*-Head-Circumference-for-age-Percentiles.csv)
- Each data array contains rows of [age, L, M, S, P2.3, P5, P10, P25, P50, P75, P90, P95, P97.7] values
- CSV files are parsed into numeric arrays by `data.js` module

### Calculation Engine
- `calculateMeasurement(age, gender, percentile, measurementType)`: Core function that looks up the appropriate data array, finds the age row, and returns the percentile value
- `calculateAllMeasurements(age, gender, percentile)`: Wrapper that calculates weight, length, and head circumference in one call
- Direct array lookup approach (not interpolation) - only whole month ages are supported

### Unit Conversion
- Weight: `kgToLbs()`, `lbsToKg()`, `lbsToLbsOz()` (converts decimal pounds to pounds + ounces format)
- Length: `cmToInches()`, `inchesToCm()`
- Head: Uses same cm/inches conversion as length
- Display formatters: `formatWeight()`, `formatLength()`, `formatHead()`

### UI Layer
- Form-based input (age, gender, percentile, unit preference)
- Results displayed with both primary unit and converted unit
- Error handling with user-friendly messages
- Responsive design with CSS in `styles.css`

## File Structure

```
baby-weight-predictor/
├── index.html          # Main HTML structure and form
├── styles.css          # All styling and responsive design
├── js/                 # JavaScript modules (ES6)
│   ├── main.js         # Application initialization
│   ├── data.js         # CSV loading and parsing
│   ├── calculations.js # WHO LMS formulas
│   ├── conversions.js  # Unit conversion functions
│   ├── charts.js       # Chart.js functions
│   ├── ui.js          # Display functions
│   └── forms.js       # Form handling and validation
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

### Module Dependencies

```
main.js
├── data.js (loads CSV files)
├── charts.js
│   ├── data.js (uses growth data)
│   └── calculations.js (getPercentileDescription)
└── forms.js
    ├── calculations.js (calculateMeasurement, calculatePercentile)
    ├── ui.js (showResult functions)
    └── charts.js (showDefaultChart)

ui.js
├── conversions.js (formatting functions)
├── calculations.js (getPercentileDescription)
└── charts.js (createGrowthChart)
```

## Important Implementation Details

1. **Data loading**: WHO CSV files are loaded at runtime using the Fetch API in `data.js`. The app requires a local server to avoid CORS issues.

2. **ES6 Modules**: The codebase uses ES6 module syntax (`import`/`export`) for better organization and maintainability.

3. **Age must be whole months**: The lookup logic expects exact month values (0-24). No interpolation is performed for fractional months.

4. **LMS Method**: Uses WHO's Lambda-Mu-Sigma method for calculating growth measurements from percentiles and vice versa.

5. **Client-side only**: No backend or API calls (except for loading CSV files). All calculations happen in the browser.

6. **Bidirectional calculations**:
   - Enter percentile → calculate measurement (forward LMS)
   - Enter measurement → calculate percentile (inverse LMS)

7. **Unit display philosophy**: Always show both the selected unit and the converted unit for user convenience.
