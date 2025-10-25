import { useEffect, useRef } from 'react'
import { createGrowthChart } from '../charts'

function DefaultChart({ type }) {
  const chartRef = useRef(null)

  useEffect(() => {
    if (chartRef.current) {
      // Show default chart with only percentile curves (no selected point)
      createGrowthChart(chartRef.current, type, 'girl', null, null, null)
    }

    // Cleanup
    return () => {
      if (chartRef.current && chartRef.current.chart) {
        chartRef.current.chart.destroy()
      }
    }
  }, [type])

  const titleMap = {
    weight: 'WHO Weight Growth Curves',
    length: 'WHO Length Growth Curves',
    head: 'WHO Head Circumference Growth Curves'
  }

  return (
    <div className="result">
      <div className="result-header">
        <h3>{titleMap[type]}</h3>
      </div>

      <div className="chart-container">
        <canvas ref={chartRef}></canvas>
        <p className="data-source">
          Data source: <a href="https://www.cdc.gov/growthcharts/who-data-files.htm" target="_blank" rel="noopener noreferrer">WHO Child Growth Standards (CDC)</a>
        </p>
      </div>

      <div className="measurement-info">
        <p style={{ fontSize: '0.9rem', color: '#666', textAlign: 'center' }}>
          Select age, gender, and percentile above, then click "Calculate {titleMap[type].split(' ')[1]}" to see your baby's projected measurement.
        </p>
      </div>
    </div>
  )
}

export default DefaultChart
