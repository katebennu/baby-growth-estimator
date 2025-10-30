# Baby Growth Estimator

**[View Live Application](https://katebennu.github.io/baby-growth-estimator/)**

An intuitive web application for estimating baby growth measurements based on WHO (World Health Organization) growth standards. Unlike typical percentile calculators that only show where your baby falls on a growth curve, this tool goes further by performing advanced calculations with WHO data to **predict future growth** and visualize growth trajectories across any percentile.

## Why This Tool is Different

Most growth calculators simply tell you what percentile your baby is in based on their current measurements. This application takes a planning-focused approach:

- **Forward-Looking**: Choose a target percentile (any value from 1st to 99th) and see estimated measurements for your baby's current and future ages
- **Interactive Visualization**: Real-time charts with dynamic percentile highlighting let you instantly see growth trajectories as you adjust inputs
- **Comprehensive Planning**: Generates growth projections at 3-month intervals to help with planning ahead
- **Intuitive Design**: Material-UI interface with smooth sliders, synchronized tabs, and instant calculations - no page refreshes needed
- **Precise Calculations**: Applies the WHO LMS statistical model to compute any
  percentile (1st-99th), not just pre-calculated values

<img width="755" height="757" alt="Screenshot 2025-10-30 at 11 49 18 AM" src="https://github.com/user-attachments/assets/5554d696-aa1c-46c8-9f96-29be5f51c826" />


## Key Features

### Interactive Data Visualization
- **Real-Time Growth Charts**: Beautiful, responsive charts powered by Chart.js showing WHO percentile curves (5th, 25th, 50th, 75th, 95th)
- **Dynamic Percentile Highlighting**: Watch the selected percentile curve highlight instantly as you move the slider - see exactly which growth path you're viewing
- **Custom Percentile Curves**: Automatically generates precise curves for any percentile from 1st to 99th, not just the standard five
- **Smart Chart Updates**: Optimized rendering that only updates what changed - no flickering or full redraws

### Planning & Projections
- **Future Growth Estimates**: Interactive table showing projected measurements at 3-month intervals
- **Dual Unit Display**: All results show both imperial (lbs/oz, feet/inches) and metric (kg, cm) units simultaneously
- **Print-Friendly**: One-click printing for sharing with caregivers or healthcare providers

### Intuitive Interface
- **Smooth Sliders**: Interactive age (0-24 months) and percentile (1st-99th) sliders with real-time visual feedback
- **Quick Percentile Presets**: One-click buttons for common percentiles (25th, 50th, 75th)
- **Tabbed Navigation**: Seamlessly switch between weight, length, and head circumference
- **Synchronized Inputs**: Age, gender, and percentile settings stay consistent across all measurement tabs
- **Instant Calculations**: No loading spinners or page refreshes - results appear immediately

### Technical Excellence
- **WHO LMS Method**: Uses the official Lambda-Mu-Sigma formula for mathematically precise calculations
- **Modern React Stack**: Built with React 18, Material-UI, and Vite for a fast, polished experience
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Client-Side Processing**: All calculations happen in your browser for speed and privacy

## How to Use

1. **Visit the [Live Application](https://katebennu.github.io/baby-growth-estimator/)** - Growth curves display immediately
2. **Select your baby's gender** (Boy/Girl) and **age** (0-24 months) using the interactive sliders
3. **Choose a percentile** (1st-99th) - use the slider or quick-select buttons
4. **View instant results**:
   - Current estimated measurement in both imperial and metric units
   - Position on WHO growth curves with dynamic highlighting
   - Future growth projections at 3-month intervals
5. **Switch tabs** to see weight, length, or head circumference - your inputs stay synchronized
6. **Print or share** results using the print button

## Use Cases

Perfect for parents, caregivers, and healthcare providers who want to:

- **Plan ahead**: See projected weights and sizes for the next 6-12 months to prepare for gear purchases or developmental milestones
- **Explore scenarios**: Adjust the percentile slider to visualize different growth trajectories and understand what's typical vs. exceptional
- **Track trends**: Compare your baby's current measurements against projected growth paths
- **Communicate with healthcare providers**: Print clear, visual summaries to discuss at pediatric appointments
- **Educational purposes**: Understand how WHO growth standards work and how percentiles relate to actual measurements

## Data Source

The application uses [WHO Child Growth Standards data from the CDC](https://www.cdc.gov/growthcharts/who-data-files.htm), loaded from CSV files in `public/data/`:
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
├── vite.config.js      # Vite configuration
├── cypress.config.js   # Cypress E2E test configuration
├── src/                # React application source
│   ├── main.jsx        # React entry point
│   ├── App.jsx         # Root component
│   ├── theme.js        # Material-UI theme configuration
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
│   ├── data/           # WHO growth data files
│   │   ├── WHO-Boys-Weight-for-age-Percentiles.csv
│   │   ├── WHO-Girls-Weight-for-age Percentiles.csv
│   │   ├── WHO-Boys-Length-for-age-Percentiles.csv
│   │   ├── WHO-Girls-Length-for-age-Percentiles.csv
│   │   ├── WHO-Boys-Head-Circumference-for-age-Percentiles.csv
│   │   └── WHO-Girls-Head-Circumference-for-age-Percentiles.csv
│   └── .nojekyll       # GitHub Pages configuration
├── tests/              # Test suite (Vitest)
│   ├── calculations.test.js
│   ├── conversions.test.js
│   └── data.test.js
├── cypress/            # E2E tests (Cypress)
│   ├── e2e/
│   │   └── app.cy.js   # Comprehensive E2E test suite
│   ├── support/
│   │   └── e2e.js      # Cypress support file
│   └── fixtures/       # Test fixtures
├── package.json        # Dependencies and scripts
├── README.md           # This file
├── DEPLOYMENT.md       # Deployment instructions
└── CLAUDE.md           # Developer documentation
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
