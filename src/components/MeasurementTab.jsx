import { useState } from 'react'
import MeasurementForm from './MeasurementForm'
import MeasurementResult from './MeasurementResult'
import DefaultChart from './DefaultChart'

function MeasurementTab({ type, active, sharedInputs, onInputChange }) {
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const labels = {
    weight: 'Weight',
    length: 'Length',
    head: 'Head Circumference'
  }

  const handleSubmit = (measurement) => {
    setError(null)
    setResult({
      measurement,
      age: sharedInputs.age,
      gender: sharedInputs.gender,
      percentile: sharedInputs.percentile
    })
  }

  const handleError = (errorMessage) => {
    setResult(null)
    setError(errorMessage)
  }

  return (
    <div id={`${type}-tab`} className={`tab-content ${active ? 'active' : ''}`}>
      <MeasurementForm
        type={type}
        label={labels[type]}
        sharedInputs={sharedInputs}
        onInputChange={onInputChange}
        onSubmit={handleSubmit}
        onError={handleError}
      />

      {result ? (
        <MeasurementResult
          type={type}
          {...result}
        />
      ) : (
        <DefaultChart type={type} />
      )}

      {error && (
        <div className="error">
          <p>{error}</p>
        </div>
      )}
    </div>
  )
}

export default MeasurementTab
