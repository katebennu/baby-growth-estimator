import { calculateMeasurement } from '../calculations'

function MeasurementForm({ type, label, sharedInputs, onInputChange, onSubmit, onError }) {
  const handleAgeChange = (e) => {
    onInputChange({ ...sharedInputs, age: parseInt(e.target.value) })
  }

  const handleGenderChange = (e) => {
    onInputChange({ ...sharedInputs, gender: e.target.value })
  }

  const handlePercentileChange = (e) => {
    onInputChange({ ...sharedInputs, percentile: parseInt(e.target.value) })
  }

  const handlePresetClick = (percentile) => {
    onInputChange({ ...sharedInputs, percentile })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const { age, gender, percentile } = sharedInputs

    // Validation
    if (!age || age < 0 || age > 24) {
      onError('Please enter a valid age between 0 and 24 months')
      return
    }

    if (!gender) {
      onError('Please select a gender')
      return
    }

    if (!percentile || percentile < 1 || percentile > 99) {
      onError('Please enter a valid percentile between 1 and 99')
      return
    }

    try {
      const measurement = calculateMeasurement(age, gender, percentile, type)
      onSubmit(measurement)
    } catch (error) {
      onError(`Error calculating ${label.toLowerCase()}: ${error.message}`)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-grid">
        <div className="form-group">
          <label htmlFor={`${type}-age`}>
            Age: <span id={`${type}-age-display`}>{sharedInputs.age}</span> months
            <span className="tooltip" aria-label="Slide to select your baby's age from 0 to 24 months.">ⓘ</span>
          </label>
          <input
            type="range"
            id={`${type}-age`}
            name="age"
            min="0"
            max="24"
            value={sharedInputs.age}
            onChange={handleAgeChange}
            className="age-slider"
            aria-describedby={`${type}-age-hint`}
          />
          <span className="input-hint" id={`${type}-age-hint`}>0-24 months</span>
        </div>

        <div className="form-group">
          <label>
            Gender
            <span className="tooltip" aria-label="Boys and girls have different growth patterns according to WHO standards.">ⓘ</span>
          </label>
          <div className="unit-toggle" role="radiogroup" aria-label="Select baby's gender">
            <input
              type="radio"
              id={`${type}-gender-girl`}
              name={`${type}-gender`}
              value="girl"
              checked={sharedInputs.gender === 'girl'}
              onChange={handleGenderChange}
            />
            <label htmlFor={`${type}-gender-girl`} className="toggle-label">Girl</label>
            <input
              type="radio"
              id={`${type}-gender-boy`}
              name={`${type}-gender`}
              value="boy"
              checked={sharedInputs.gender === 'boy'}
              onChange={handleGenderChange}
            />
            <label htmlFor={`${type}-gender-boy`} className="toggle-label">Boy</label>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor={`${type}-percentile`}>
            Percentile: <span id={`${type}-percentile-display`}>{sharedInputs.percentile}</span>th
            <span className="tooltip" aria-label="50th percentile = average. Higher numbers = larger baby. Lower numbers = smaller baby. All percentiles are healthy!">ⓘ</span>
          </label>
          <input
            type="range"
            id={`${type}-percentile`}
            name="percentile"
            min="1"
            max="99"
            value={sharedInputs.percentile}
            onChange={handlePercentileChange}
            className="percentile-slider"
            aria-describedby={`${type}-percentile-hint`}
          />
          <div className="slider-labels">
            <span>1st</span>
            <span>25th</span>
            <span>50th</span>
            <span>75th</span>
            <span>99th</span>
          </div>
          <div className="preset-buttons">
            <button type="button" className="preset-btn" onClick={() => handlePresetClick(25)}>25th</button>
            <button type="button" className="preset-btn" onClick={() => handlePresetClick(50)}>50th</button>
            <button type="button" className="preset-btn" onClick={() => handlePresetClick(75)}>75th</button>
          </div>
        </div>
      </div>

      <button type="submit">Calculate {label}</button>
    </form>
  )
}

export default MeasurementForm
