import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

function Header() {
  return (
    <Box sx={{ textAlign: 'center', mb: 3 }}>
      <Typography variant="h3" component="h1" sx={{ fontWeight: 700, color: 'primary.main' }}>
        Baby Growth Estimator
      </Typography>
      <Typography variant="subtitle1" sx={{ color: 'text.secondary', mt: 1 }}>
        Based on WHO Growth Standards
      </Typography>
    </Box>
  )
}

export default Header
