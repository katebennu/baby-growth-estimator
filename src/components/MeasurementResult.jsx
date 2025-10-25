import { useEffect, useRef } from 'react'
import { kgToLbs, cmToInches, formatWeight, formatLength, formatHeadCircumference, getSelectedUnit } from '../conversions'
import { getPercentileDescription, generateAgeComparison } from '../calculations'
import { createGrowthChart } from '../charts'

function MeasurementResult({ type, measurement, age, gender, percentile }) {
  const chartRef = useRef(null)
  const selectedUnit = getSelectedUnit(type)

  useEffect(() => {
    if (chartRef.current) {
      createGrowthChart(chartRef.current, type, gender, age, percentile, measurement)
    }

    // Cleanup function to destroy chart when component unmounts
    return () => {
      if (chartRef.current && chartRef.current.chart) {
        chartRef.current.chart.destroy()
      }
    }
  }, [type, gender, age, percentile, measurement])

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
    if (type === 'weight') {
      const weightLbs = kgToLbs(measurement)

      if (selectedUnit === 'kg') {
        return (
          <>
            <div className="weight-display">
              <span>{measurement}</span>
              <span className="unit">kg</span>
            </div>
            <div className="weight-conversion lbs-oz">
              <span>{formatWeight(weightLbs, 'lbs')}</span>
            </div>
          </>
        )
      } else {
        return (
          <>
            <div className="weight-display lbs-oz">
              <span>{formatWeight(weightLbs, 'lbs')}</span>
            </div>
            <div className="weight-conversion">
              <span>{measurement}</span>
              <span className="unit">kg</span>
            </div>
          </>
        )
      }
    } else if (type === 'length') {
      if (selectedUnit === 'cm') {
        return (
          <>
            <div className="length-display">
              <span>{measurement}</span>
              <span className="unit">cm</span>
            </div>
            <div className="length-conversion">
              <span>{formatLength(measurement, 'inches')}</span>
            </div>
          </>
        )
      } else {
        return (
          <>
            <div className="length-display">
              <span>{formatLength(measurement, 'inches')}</span>
            </div>
            <div className="length-conversion">
              <span>{measurement}</span>
              <span className="unit">cm</span>
            </div>
          </>
        )
      }
    } else if (type === 'head') {
      if (selectedUnit === 'cm') {
        return (
          <>
            <div className="head-display">
              <span>{measurement}</span>
              <span className="unit">cm</span>
            </div>
            <div className="head-conversion">
              <span>{formatHeadCircumference(measurement, 'inches')}</span>
            </div>
          </>
        )
      } else {
        return (
          <>
            <div className="head-display">
              <span>{formatHeadCircumference(measurement, 'inches')}</span>
            </div>
            <div className="head-conversion">
              <span>{measurement}</span>
              <span className="unit">cm</span>
            </div>
          </>
        )
      }
    }
  }

  const renderAgeComparison = () => {
    const comparisons = generateAgeComparison(age, gender, percentile, type)

    if (comparisons.length === 0) {
      return null
    }

    return (
      <div className="age-comparison">
        <h4>Future Growth Estimates</h4>
        <table>
          <thead>
            <tr>
              <th>Age</th>
              <th>Estimated {type === 'weight' ? 'Weight' : type === 'length' ? 'Length' : 'Head Circumference'}</th>
            </tr>
          </thead>
          <tbody>
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
                <tr key={compAge}>
                  <td>{compAge} months</td>
                  <td>{displayValue}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
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
    <div className="result">
      <div className="result-header">
        <h3>{titleMap[type]}</h3>
        <button type="button" className="print-btn" onClick={() => window.print()}>📄 Print</button>
      </div>

      <div className="measurement-section">
        {renderMeasurementDisplay()}
      </div>

      <div className="chart-container">
        <canvas ref={chartRef}></canvas>
        <p className="data-source">
          Data source: <a href="https://www.cdc.gov/growthcharts/who-data-files.htm" target="_blank" rel="noopener noreferrer">WHO Child Growth Standards (CDC)</a>
        </p>
      </div>

      <div className="measurement-info">
        <p>A {age}-month-old {genderText} at the {percentileDesc}</p>
        {contexts.length > 0 && (
          <div className="practical-tips">
            <strong>Planning Tips:</strong>
            <ul>
              {contexts.map((context, index) => (
                <li key={index}>{context}</li>
              ))}
            </ul>
          </div>
        )}
        {renderAgeComparison()}
      </div>
    </div>
  )
}

export default MeasurementResult
