import { useEffect, useRef, useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import PrintIcon from '@mui/icons-material/Print'
import { kgToLbs, cmToInches, formatWeight, formatLength, formatHeadCircumference, getSelectedUnit } from '../conversions'
import { getPercentileDescription, generateAgeComparison } from '../calculations'
import { createGrowthChart, updateChartPoint } from '../charts'

function MeasurementResult({ type, measurement, age, gender, percentile }) {
  const chartRef = useRef(null)
  const selectedUnit = getSelectedUnit(type)
  const [chartInitialized, setChartInitialized] = useState(false)
  const prevGenderRef = useRef(gender)

  useEffect(() => {
    if (!chartRef.current) return

    const genderChanged = prevGenderRef.current !== gender

    // If gender changed or chart not initialized, recreate the entire chart
    if (!chartInitialized || genderChanged) {
      createGrowthChart(chartRef.current, type, gender, age, percentile, measurement)
      setChartInitialized(true)
      prevGenderRef.current = gender
    } else {
      // Otherwise, just update the point
      updateChartPoint(chartRef.current, type, gender, age, percentile, measurement)
    }
  }, [type, gender, age, percentile, measurement, chartInitialized])

  // Separate cleanup effect that only runs on unmount
  useEffect(() => {
    return () => {
      if (chartRef.current && chartRef.current.chart) {
        chartRef.current.chart.destroy()
      }
    }
  }, [])

  const getContext = () => {
    if (type === 'weight') {
      const weightLbs = kgToLbs(measurement)
      const contexts = []

      if (weightLbs < 22) {
        contexts.push("Most infant car seats support up to 22-35 lbs")
      } else if (weightLbs < 40) {
        contexts.push("Convertible car seat recommended (up to 40-65 lbs)")
      }

      if (weightLbs < 35) {
        contexts.push("Standard strollers support 35-50 lbs")
      }

      return contexts
    } else if (type === 'length') {
      const lengthInches = cmToInches(measurement)
      const contexts = []

      if (lengthInches < 25) {
        contexts.push("Bassinet or cradle suitable (typically up to 25\")")
      } else if (lengthInches < 35) {
        contexts.push("Transition to crib recommended (fits up to ~35\")")
      } else {
        contexts.push("Standard crib appropriate (up to ~52\")")
      }

      return contexts
    }

    return []
  }

  const renderMeasurementDisplay = () => {
    // Configuration for each measurement type
    const config = {
      weight: {
        metricUnit: 'kg',
        imperialUnit: 'lbs',
        convertToImperial: kgToLbs,
        formatImperial: (val) => formatWeight(val, 'lbs'),
        formatMetric: (val) => `${val} kg`
      },
      length: {
        metricUnit: 'cm',
        imperialUnit: 'inches',
        convertToImperial: cmToInches,
        formatImperial: (val) => formatLength(val, 'inches'),
        formatMetric: (val) => `${val} cm`
      },
      head: {
        metricUnit: 'cm',
        imperialUnit: 'inches',
        convertToImperial: cmToInches,
        formatImperial: (val) => formatHeadCircumference(val, 'inches'),
        formatMetric: (val) => `${val} cm`
      }
    }

    const typeConfig = config[type]
    const convertedValue = typeConfig.convertToImperial(measurement)
    const isMetricSelected = selectedUnit === typeConfig.metricUnit

    // For metric display: show metric in primary box with unit, imperial below
    // For imperial display: show imperial formatted in primary box, metric below
    let primaryDisplay, secondaryDisplay

    if (isMetricSelected) {
      primaryDisplay = (
        <Typography variant="h3" component="div" sx={{ fontWeight: 700 }}>
          {measurement}
          <Typography component="span" variant="h5" sx={{ ml: 1 }}>
            {typeConfig.metricUnit}
          </Typography>
        </Typography>
      )
      secondaryDisplay = typeConfig.formatImperial(convertedValue)
    } else {
      primaryDisplay = (
        <>
          <Typography variant="h5" component="div" sx={{ fontWeight: 700 }}>
            {typeConfig.formatImperial(convertedValue)}
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            {typeConfig.formatMetric(measurement)}
          </Typography>
        </>
      )
      secondaryDisplay = null
    }

    return (
      <Box sx={{ textAlign: 'center', my: 3 }}>
        <Box sx={{
          bgcolor: 'primary.main',
          color: 'white',
          p: isMetricSelected ? 3 : 1,
          borderRadius: 2,
          display: 'inline-block',
          minWidth: 200
        }}>
          {primaryDisplay}
        </Box>
        {secondaryDisplay && (
          <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
            {secondaryDisplay}
          </Typography>
        )}
      </Box>
    )
  }

  const renderAgeComparison = () => {
    const comparisons = generateAgeComparison(age, gender, percentile, type)

    if (comparisons.length === 0) {
      return null
    }

    return (
      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
          Future Growth Estimates
        </Typography>
        <TableContainer component={Paper} variant="outlined">
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell><strong>Age</strong></TableCell>
                <TableCell><strong>Estimated {type === 'weight' ? 'Weight' : type === 'length' ? 'Length' : 'Head Circumference'}</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {comparisons.map(({ age: compAge, measurement: compMeasurement }) => {
                let displayValue
                if (type === 'weight') {
                  displayValue = selectedUnit === 'lbs'
                    ? formatWeight(kgToLbs(compMeasurement), 'lbs')
                    : compMeasurement + ' kg'
                } else if (type === 'length') {
                  displayValue = selectedUnit === 'inches'
                    ? formatLength(compMeasurement, 'inches')
                    : compMeasurement + ' cm'
                } else if (type === 'head') {
                  displayValue = selectedUnit === 'inches'
                    ? formatHeadCircumference(compMeasurement, 'inches')
                    : compMeasurement + ' cm'
                }

                return (
                  <TableRow key={compAge}>
                    <TableCell>{compAge} months</TableCell>
                    <TableCell>{displayValue}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    )
  }

  const genderText = gender === 'boy' ? 'boy' : 'girl'
  const percentileDesc = getPercentileDescription(percentile)
  const contexts = getContext()

  const titleMap = {
    weight: 'Weight Estimate',
    length: 'Length Estimate',
    head: 'Head Circumference Estimate'
  }

  return (
    <Box sx={{ mt: 3 }}>
      {/* Header with Title and Print Button */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5" component="h3" sx={{ fontWeight: 600 }}>
          {titleMap[type]}
        </Typography>
        <Button
          variant="outlined"
          size="small"
          startIcon={<PrintIcon />}
          onClick={() => window.print()}
        >
          Print
        </Button>
      </Box>

      {/* Measurement Display */}
      {renderMeasurementDisplay()}

      <Typography variant="body1" gutterBottom sx={{ textAlign: 'center' }}>
        A {age}-month-old {genderText} at the {percentileDesc}
      </Typography>

      {/* Chart */}
      <Paper variant="outlined" sx={{ p: 2, my: 3 }}>
        <canvas ref={chartRef}></canvas>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1, textAlign: 'center' }}>
          Data source:{' '}
          <Link href="https://www.cdc.gov/growthcharts/who-data-files.htm" target="_blank" rel="noopener noreferrer">
            WHO Child Growth Standards (CDC)
          </Link>
        </Typography>
      </Paper>

      {/* Information Section */}
      <Box sx={{ mt: 3 }}>
        {/* Planning Tips */}
        {contexts.length > 0 && (
          <Paper variant="outlined" sx={{ p: 2, mt: 2, bgcolor: 'grey.50' }}>
            <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
              Planning Tips:
            </Typography>
            <List dense disablePadding>
              {contexts.map((context, index) => (
                <ListItem key={index} disableGutters>
                  <ListItemText primary={context} />
                </ListItem>
              ))}
            </List>
          </Paper>
        )}

        {/* Age Comparison Table */}
        {renderAgeComparison()}
      </Box>
    </Box>
  )
}

export default MeasurementResult
