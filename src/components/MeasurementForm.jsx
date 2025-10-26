import { useEffect } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Slider from '@mui/material/Slider'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import Tooltip from '@mui/material/Tooltip'
import InfoIcon from '@mui/icons-material/Info'
import { calculateMeasurement } from '../calculations'

function MeasurementForm({ type, label, sharedInputs, onInputChange, onSubmit, onError }) {
  const handleAgeChange = (event, newValue) => {
    onInputChange({ ...sharedInputs, age: newValue })
  }

  const handleGenderChange = (event, newValue) => {
    if (newValue !== null) {
      onInputChange({ ...sharedInputs, gender: newValue })
    }
  }

  const handlePercentileChange = (event, newValue) => {
    onInputChange({ ...sharedInputs, percentile: newValue })
  }

  const handlePercentilePresetClick = (percentile) => {
    onInputChange({ ...sharedInputs, percentile })
  }

  const handleAgePresetClick = (age) => {
    onInputChange({ ...sharedInputs, age })
  }

  // Auto-calculate when inputs change
  useEffect(() => {
    const { age, gender, percentile } = sharedInputs

    // Validate inputs
    if (age === null || age === undefined || age < 0 || age > 24) return
    if (!gender) return
    if (!percentile || percentile < 1 || percentile > 99) return

    try {
      const measurement = calculateMeasurement(age, gender, percentile, type)
      onSubmit(measurement)
    } catch (error) {
      onError(`Error calculating ${label.toLowerCase()}: ${error.message}`)
    }
  }, [sharedInputs.age, sharedInputs.gender, sharedInputs.percentile, type, label, onSubmit, onError])

  return (
    <Box component="form" onSubmit={(e) => e.preventDefault()}>
      <Grid container spacing={3}>
        {/* Gender Toggle */}
        <Grid item xs={12} md={3}>
          <Box>
            <Typography variant="body2" gutterBottom sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 0.5 }}>
              Gender
              <Tooltip title="Boys and girls have different growth patterns according to WHO standards.">
                <InfoIcon fontSize="small" color="action" />
              </Tooltip>
            </Typography>
            <ToggleButtonGroup
              value={sharedInputs.gender}
              exclusive
              onChange={handleGenderChange}
              fullWidth
              size="small"
              color="primary"
            >
              <ToggleButton value="girl">Girl</ToggleButton>
              <ToggleButton value="boy">Boy</ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </Grid>

        {/* Age Slider */}
        <Grid item xs={12} md={9}>
          <Box>
            <Typography variant="body2" gutterBottom sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 0.5 }}>
              Age: {sharedInputs.age} months
              <Tooltip title="Slide to select your baby's age from 0 to 24 months.">
                <InfoIcon fontSize="small" color="action" />
              </Tooltip>
            </Typography>
            <Slider
              value={sharedInputs.age}
              onChange={handleAgeChange}
              min={0}
              max={24}
              valueLabelDisplay="auto"
              color="primary"
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              {/* clickable age labels */}
              {[0, 6, 12, 18, 24].map((age) => (
                <Typography
                  key={age}
                  variant="caption"
                  color="text.secondary"
                  onClick={() => handleAgePresetClick(age)}
                  sx={{ cursor: 'pointer' }}
                >
                  {age}m
                </Typography>
              ))}
            </Box>
          </Box>
        </Grid>

        {/* Percentile Slider */}
        <Grid item xs={12}>
          <Box>
            <Typography variant="body2" gutterBottom sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 0.5 }}>
              Percentile: {sharedInputs.percentile}th
              <Tooltip title="50th percentile = average. Higher numbers = larger baby. Lower numbers = smaller baby. All percentiles are healthy!">
                <InfoIcon fontSize="small" color="action" />
              </Tooltip>
            </Typography>
            <Slider
              value={sharedInputs.percentile}
              onChange={handlePercentileChange}
              min={1}
              max={99}
              valueLabelDisplay="auto"
              color="primary"
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              {/* clickable percentile labels */}
              {[1, 25, 50, 75, 99].map((pct) => (
                <Typography
                  key={pct}
                  variant="caption"
                  color="text.secondary"
                  onClick={() => handlePercentilePresetClick(pct)}
                  sx={{ cursor: 'pointer' }}
                >
                  {pct}th
                </Typography>
              ))}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default MeasurementForm
