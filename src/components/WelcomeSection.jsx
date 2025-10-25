function WelcomeSection() {
  return (
    <div className="welcome-section">
      <p className="welcome-text">
        Use WHO growth standards to estimate your baby's future measurements and plan ahead for important purchases.
        Whether you're shopping for clothes, choosing a stroller, or planning for a car seat upgrade, knowing your baby's
        expected size helps you make informed decisions.
      </p>

      <details className="help-section">
        <summary>How to Use This Tool</summary>
        <div className="help-content">
          <ul>
            <li><strong>Choose a measurement type:</strong> Weight, Length, or Head Circumference</li>
            <li><strong>Enter baby's age:</strong> Any age from 0-24 months (whole months only)</li>
            <li><strong>Select gender:</strong> Growth patterns differ between boys and girls</li>
            <li><strong>Pick a percentile:</strong> Use 50th for average, or match your baby's current growth curve</li>
            <li><strong>Get estimates:</strong> See predicted measurements with helpful charts</li>
          </ul>
        </div>
      </details>

      <details className="help-section">
        <summary>Understanding Percentiles</summary>
        <div className="help-content">
          <p><strong>What do percentiles mean?</strong></p>
          <ul>
            <li><strong>50th percentile:</strong> Average size - half of babies are larger, half are smaller</li>
            <li><strong>75th percentile:</strong> Larger than average - bigger than 75% of babies</li>
            <li><strong>25th percentile:</strong> Smaller than average - smaller than 75% of babies</li>
          </ul>
          <p className="help-note">All percentiles are healthy! Babies grow at different rates, and consistency matters more than the specific percentile.</p>
        </div>
      </details>
    </div>
  )
}

export default WelcomeSection
