# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Baby Growth Predictor is a client-side web application that estimates baby growth measurements (weight, length, head circumference) based on WHO (World Health Organization) growth standards. The app covers ages 0-24 months with support for both genders and multiple percentiles (2nd through 98th).

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

## Architecture

### Data Layer
- **WHO Growth Data**: Hard-coded JavaScript arrays containing WHO LMS (Lambda-Mu-Sigma) method data
  - Weight data: `boysWeightData`, `girlsWeightData`
  - Length data: `boysLengthData`, `girlsLengthData`
  - Head circumference data: `boysHeadData`, `girlsHeadData`
- Each data array contains rows of [age, L, M, S, P2.3, P5, P10, P25, P50, P75, P90, P95, P97.7] values
- Percentile column indices are mapped via `percentileMap` object

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
├── script.js           # Data arrays, calculation logic, and UI handlers
└── WHO-*-Percentiles.csv  # Original CSV files (reference only, not loaded by app)
```

## Important Implementation Details

1. **Data is embedded in JavaScript**: The WHO CSV files exist in the repo but are NOT loaded at runtime. All data is hard-coded in `script.js` arrays.

2. **Age must be whole months**: The lookup logic expects exact month values (0-24). No interpolation is performed for fractional months.

3. **Percentile indices**: The `percentileMap` translates user-facing percentile values (2, 5, 10, etc.) to column indices (4-12) in the data arrays.

4. **Client-side only**: No backend, API calls, or data fetching. All calculations happen in the browser.

5. **Unit display philosophy**: Always show both the selected unit and the converted unit for user convenience.
