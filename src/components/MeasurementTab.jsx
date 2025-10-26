import { useState, useCallback } from 'react'
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
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

  const handleSubmit = useCallback((measurement) => {
    setError(null)
    setResult({
      measurement,
      age: sharedInputs.age,
      gender: sharedInputs.gender,
      percentile: sharedInputs.percentile
    })
  }, [sharedInputs.age, sharedInputs.gender, sharedInputs.percentile])

  const handleError = useCallback((errorMessage) => {
    setResult(null)
    setError(errorMessage)
  }, [])

  if (!active) return null

  return (
    <Box id={`${type}-tab`}>
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
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
    </Box>
  )
}

export default MeasurementTab
