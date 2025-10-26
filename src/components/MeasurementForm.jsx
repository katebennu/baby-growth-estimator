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

  const handlePresetClick = (percentile) => {
    onInputChange({ ...sharedInputs, percentile })
  }

  // Auto-calculate when inputs change
  useEffect(() => {
    const { age, gender, percentile } = sharedInputs

    // Validate inputs
    if (!age || age < 0 || age > 24) return
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
        {/* Age Slider */}
        <Grid item xs={12} md={4}>
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
              marks
              valueLabelDisplay="auto"
              color="primary"
            />
            <Typography variant="caption" color="text.secondary">
              0-24 months
            </Typography>
          </Box>
        </Grid>

        {/* Gender Toggle */}
        <Grid item xs={12} md={4}>
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

        {/* Percentile Slider */}
        <Grid item xs={12} md={4}>
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
              <Typography variant="caption" color="text.secondary">1st</Typography>
              <Typography variant="caption" color="text.secondary">25th</Typography>
              <Typography variant="caption" color="text.secondary">50th</Typography>
              <Typography variant="caption" color="text.secondary">75th</Typography>
              <Typography variant="caption" color="text.secondary">99th</Typography>
            </Box>
            <ButtonGroup size="small" fullWidth variant="outlined">
              <Button onClick={() => handlePresetClick(25)}>25th</Button>
              <Button onClick={() => handlePresetClick(50)}>50th</Button>
              <Button onClick={() => handlePresetClick(75)}>75th</Button>
            </ButtonGroup>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default MeasurementForm
