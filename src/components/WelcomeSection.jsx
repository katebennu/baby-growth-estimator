import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Alert from '@mui/material/Alert'
import StrollerIcon from '@mui/icons-material/Stroller'

function WelcomeSection() {
  return (
    <Box sx={{ mb: 4 }}>
      <Alert severity="info" sx={{ mb: 2 }} icon={<StrollerIcon />}>
        Use WHO growth standards to estimate your baby's future measurements, whether you're shopping for clothes, choosing a stroller, or planning for a car seat upgrade.
      </Alert>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography sx={{ fontWeight: 600 }}>How to Use This Tool</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box component="ul" sx={{ pl: 2 }}>
            <li><strong>Choose a measurement type:</strong> Weight, Length, or Head Circumference</li>
            <li><strong>Enter baby's age:</strong> Any age from 0-24 months (whole months only)</li>
            <li><strong>Select gender:</strong> Growth patterns differ between boys and girls</li>
            <li><strong>Pick a percentile:</strong> Use 50th for average, or match your baby's current growth curve</li>
            <li><strong>Get estimates:</strong> See predicted measurements with helpful charts</li>
          </Box>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography sx={{ fontWeight: 600 }}>Understanding Percentiles</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="subtitle2" gutterBottom><strong>What do percentiles mean?</strong></Typography>
          <Box component="ul" sx={{ pl: 2, mb: 2 }}>
            <li><strong>50th percentile:</strong> Average size - half of babies are larger, half are smaller</li>
            <li><strong>75th percentile:</strong> Larger than average - bigger than 75% of babies</li>
            <li><strong>25th percentile:</strong> Smaller than average - smaller than 75% of babies</li>
          </Box>
          <Alert severity="success">
            All percentiles are healthy! Babies grow at different rates, and consistency matters more than the specific percentile.
          </Alert>
        </AccordionDetails>
      </Accordion>
    </Box>
  )
}

export default WelcomeSection
