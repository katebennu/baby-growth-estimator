# Baby Growth Estimator

A web application that estimates baby growth measurements (weight, length, and head circumference) based on WHO (World Health Organization) growth standards using age, gender, and percentile data.

**[View Live Application](https://katebennu.github.io/baby-growth-estimator/)**

## Features

- **Modern React UI**: Built with React 18 for fast, interactive experience
- **Tabbed Interface**: Separate tabs for weight, length, and head circumference measurements
- **Interactive Growth Charts**: Visual percentile curves (5th, 25th, 50th, 75th, 95th) with your baby's position highlighted
- **Default Charts**: View WHO growth curves immediately on page load
- **Age Slider**: Interactive slider for ages 0-24 months with real-time display
- **Percentile Slider**: Visual percentile selection with quick preset buttons (25th, 50th, 75th)
- **Future Growth Estimates**: Age comparison table showing projected measurements at 3-month intervals
- **Practical Planning Tips**: Car seat, stroller, and crib recommendations based on measurements
- **Gender Support**: Boys and Girls with different growth patterns
- **Comprehensive Measurements**: Weight, length, and head circumference estimates
- **Unit Display**: Shows both imperial (lbs/oz, feet/inches) and metric (kg, cm) simultaneously
- **Lbs/Oz Format**: Displays pounds and ounces instead of decimal pounds
- **Synchronized Inputs**: Age, gender, and percentile sync across all tabs
- **Print-Friendly**: Print button for saving or sharing results
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Real-time Calculation**: Instant estimates based on WHO data

## How to Use

1. **Open the Application**: Visit the [live site](https://katebennu.github.io/baby-growth-estimator/) or open `index.html` in your web browser
2. **View Growth Curves**: WHO percentile curves are displayed immediately on page load
3. **Select a Tab**: Choose between Weight, Length, or Head Circumference
4. **Enter Baby's Age**: Input the baby's age in months (0-24)
5. **Select Gender**: Choose between Boy or Girl
6. **Choose Percentile**: Select the desired percentile for the estimate
7. **Select Unit**: Toggle between metric and imperial units for your preference
8. **Calculate**: Click the calculate button to get the measurement
9. **View Results**: See the estimate with both units displayed, plus your baby's position on the growth chart

## Data Source

The application uses [WHO Child Growth Standards data from the CDC](https://www.cdc.gov/growthcharts/who-data-files.htm), loaded from CSV files:
- `WHO-Boys-Weight-for-age-Percentiles.csv`
- `WHO-Girls-Weight-for-age Percentiles.csv`
- `WHO-Boys-Length-for-age-Percentiles.csv`
- `WHO-Girls-Length-for-age-Percentiles.csv`
- `WHO-Boys-Head-Circumference-for-age-Percentiles.csv`
- `WHO-Girls-Head-Circumference-for-age-Percentiles.csv`

## Technical Details

- **Framework**: React 18 with Vite
- **Frontend**: Modern JavaScript (ES6+), React Hooks
- **Charting**: Chart.js for interactive growth curve visualization
- **Data Processing**: Direct integration of WHO percentile data
- **Calculation Method**: Uses WHO LMS (Lambda-Mu-Sigma) method for growth standards
- **Build Tool**: Vite for fast development and optimized production builds
- **Testing**: Vitest with comprehensive test coverage
- **Browser Support**: Modern browsers with ES6 support
- **Deployment**: GitHub Pages (static hosting)

## Running the Application

### Development Server
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Then open the URL shown in the terminal (typically `http://localhost:5173`).

### Production Build
```bash
# Build for production
npm run build

# Preview production build locally
npm run preview
```

## Deployment to GitHub Pages

### Quick Deploy
```bash
npm run deploy
```

This will:
1. Build the production version
2. Push the build to the `gh-pages` branch
3. Deploy to https://katebennu.github.io/baby-growth-estimator

### First-Time Setup

1. **Commit your changes**:
   ```bash
   git add .
   git commit -m "Update app"
   git push origin main
   ```

2. **Deploy**:
   ```bash
   npm run deploy
   ```

3. **Enable GitHub Pages** (first time only):
   - Go to repository Settings → Pages
   - Under "Source", select the `gh-pages` branch
   - Click "Save"
   - Your site will be live in a few minutes

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions and troubleshooting.

## Development

### Running Tests
```bash
# Run tests once
npm test

# Run tests in watch mode
npm run test

# Run tests with UI
npm run test:ui

# Generate coverage report
npm run test:coverage
```

### Test Coverage
The project includes comprehensive test coverage for:
- **calculations.js**: WHO LMS formulas, percentile conversions, z-score calculations
- **conversions.js**: Unit conversion functions (kg/lbs, cm/inches, formatting)
- **data.js**: CSV loading and parsing

Coverage excludes UI-related modules (forms.js, ui.js, charts.js, main.js) which require browser DOM environment.

## File Structure

```
baby-weight-predictor/
├── index.html          # Vite entry point
├── styles.css          # CSS styling
├── vite.config.js      # Vite configuration
├── src/                # React application source
│   ├── main.jsx        # React entry point
│   ├── App.jsx         # Root component
│   ├── components/     # React components
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── WelcomeSection.jsx
│   │   ├── TabButtons.jsx
│   │   ├── MeasurementTab.jsx
│   │   ├── MeasurementForm.jsx
│   │   ├── MeasurementResult.jsx
│   │   └── DefaultChart.jsx
│   ├── data.js         # CSV loading and parsing
│   ├── calculations.js # WHO LMS formulas
│   ├── conversions.js  # Unit conversion functions
│   └── charts.js       # Chart.js integration
├── public/             # Static assets
│   └── WHO-*.csv       # WHO growth data files
├── tests/              # Test suite (Vitest)
│   ├── calculations.test.js
│   ├── conversions.test.js
│   └── data.test.js
├── package.json        # Dependencies and scripts
├── README.md           # This file
├── DEPLOYMENT.md       # Deployment instructions
└── CLAUDE.md          # Developer documentation
```

### React Component Architecture

The application uses React with functional components and hooks:

- **App.jsx**: Root component managing global state (active tab, shared inputs, data loading)
- **Header.jsx**: Application header
- **Footer.jsx**: Footer with GitHub link
- **WelcomeSection.jsx**: Welcome text and collapsible help sections
- **TabButtons.jsx**: Tab navigation (Weight/Length/Head Circumference)
- **MeasurementTab.jsx**: Container for each measurement type
- **MeasurementForm.jsx**: Reusable form component with sliders and inputs
- **MeasurementResult.jsx**: Displays results with charts and practical tips
- **DefaultChart.jsx**: Shows default WHO percentile curves before calculation

### Core Modules

- **data.js**: Loads and parses WHO CSV data files
- **calculations.js**: Implements WHO LMS (Lambda-Mu-Sigma) method
- **conversions.js**: Unit conversions (kg/lbs, cm/inches)
- **charts.js**: Chart.js integration for growth curves

## Example Usage

- **6-month-old boy at 50th percentile**: 
  - Weight: ~7.93 kg (~17 lbs 8 oz)
  - Length: ~67.6 cm (~2' 2.6")
  - Head Circumference: ~43.3 cm (~17.0")
- **12-month-old girl at 75th percentile**:
  - Weight: ~10.38 kg (~22 lbs 14 oz)
  - Length: ~75.8 cm (~2' 5.8")
  - Head Circumference: ~45.8 cm (~18.0")

## Notes

- The application provides estimates based on WHO growth standards
- Results are for reference only and should not replace professional medical advice
- The data covers ages 0-24 months as per WHO standards
- All calculations are performed client-side for privacy and speed
