# Baby Weight Predictor

A simple web application that estimates baby weight based on WHO (World Health Organization) growth standards using age, gender, and percentile data.

## Features

- **Age Range**: 0-24 months
- **Gender Support**: Boys and Girls
- **Percentile Options**: 2nd, 5th, 10th, 25th, 50th (median), 75th, 90th, 95th, and 98th percentiles
- **Unit Conversion**: Toggle between kg and lbs with automatic conversion
- **Dual Display**: Shows weight in both selected and converted units
- **Lbs/Oz Format**: Displays pounds and ounces instead of decimal pounds
- **Responsive Design**: Works on desktop and mobile devices
- **Real-time Calculation**: Instant weight estimates based on WHO data

## How to Use

1. **Open the Application**: Open `index.html` in your web browser or run a local server
2. **Enter Baby's Age**: Input the baby's age in months (0-24)
3. **Select Gender**: Choose between Boy or Girl
4. **Choose Percentile**: Select the desired percentile for weight estimation
5. **Select Unit**: Toggle between kg and lbs for your preferred weight unit
6. **Calculate**: Click the "Calculate Weight" button to get the estimated weight
7. **View Results**: See weight in both your selected unit and the converted unit

## Data Source

The application uses WHO Child Growth Standards data from the CSV files:
- `WHO-Boys-Weight-for-age-Percentiles.csv`
- `WHO-Girls-Weight-for-age Percentiles.csv`

## Technical Details

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Data Processing**: Direct integration of WHO percentile data
- **Calculation Method**: Uses WHO LMS (Lambda-Mu-Sigma) method for growth standards
- **Browser Support**: Modern browsers with ES6 support

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

- **6-month-old boy at 50th percentile**: ~7.93 kg (~17 lbs 8 oz)
- **12-month-old girl at 75th percentile**: ~10.38 kg (~22 lbs 14 oz)
- **18-month-old boy at 25th percentile**: ~8.75 kg (~19 lbs 5 oz)

## Notes

- The application provides estimates based on WHO growth standards
- Results are for reference only and should not replace professional medical advice
- The data covers ages 0-24 months as per WHO standards
- All calculations are performed client-side for privacy and speed
