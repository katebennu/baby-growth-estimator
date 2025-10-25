# Baby Growth Estimator

A comprehensive web application that estimates baby growth measurements (weight, length, and head circumference) based on WHO (World Health Organization) growth standards using age, gender, and percentile data.

## 🌐 Live Demo

**[View Live Application](https://katebennu.github.io/baby-growth-estimator/)**

## Features

- **Tabbed Interface**: Separate tabs for weight, length, and head circumference measurements
- **Interactive Growth Charts**: Visual percentile curves (5th, 25th, 50th, 75th, 95th) with your baby's position highlighted
- **Age Range**: 0-24 months
- **Gender Support**: Boys and Girls
- **Percentile Options**: 2nd, 5th, 10th, 25th, 50th (median), 75th, 90th, 95th, and 98th percentiles
- **Comprehensive Measurements**: Weight, length, and head circumference estimates
- **Unit Conversion**: Toggle between metric and imperial units with automatic conversion
- **Dual Display**: Shows measurements in both selected and converted units
- **Lbs/Oz Format**: Displays pounds and ounces instead of decimal pounds
- **Length Display**: Shows length in feet/inches or cm format
- **Synchronized Inputs**: Age, gender, and percentile sync across all tabs
- **Compact Design**: Optimized layout to view results without scrolling
- **Responsive Design**: Works on desktop and mobile devices
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

The application uses WHO Child Growth Standards data from the CSV files:
- `WHO-Boys-Weight-for-age-Percentiles.csv`
- `WHO-Girls-Weight-for-age Percentiles.csv`
- `WHO-Boys-Length-for-age-Percentiles.csv`
- `WHO-Girls-Length-for-age-Percentiles.csv`
- `WHO-Boys-Head-Circumference-for-age-Percentiles.csv`
- `WHO-Girls-Head-Circumference-for-age-Percentiles.csv`

## Technical Details

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Charting**: Chart.js for interactive growth curve visualization
- **Data Processing**: Direct integration of WHO percentile data
- **Calculation Method**: Uses WHO LMS (Lambda-Mu-Sigma) method for growth standards
- **Browser Support**: Modern browsers with ES6 support
- **Deployment**: GitHub Pages (static hosting)

## Running the Application

### Option 1: Direct File Access
Simply open `index.html` in your web browser.

### Option 2: Local Server (Recommended)
```bash
# Using Python 3
python3 -m http.server 8000

# Using Node.js (if you have http-server installed)
npx http-server

# Using PHP
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

## File Structure

```
baby-weight-predictor/
├── index.html          # Main HTML file
├── styles.css          # CSS styling
├── script.js           # JavaScript logic
├── README.md           # This file
├── WHO-Boys-Weight-for-age-Percentiles.csv
└── WHO-Girls-Weight-for-age Percentiles.csv
```

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
