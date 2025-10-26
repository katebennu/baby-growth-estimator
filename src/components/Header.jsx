import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

function Header() {
  return (
    <Box sx={{ textAlign: 'center', mb: 3 }}>
      <Typography variant="h5" component="h1" sx={{ fontWeight: 700, color: 'primary.main' }}>
        Baby Growth Estimator
      </Typography>
    </Box>
  )
}

export default Header
