import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import GitHubIcon from '@mui/icons-material/GitHub'

function Footer() {
  return (
    <Box sx={{ textAlign: 'center', mt: 4, py: 2 }}>
      <Link
        href="https://github.com/katebennu/baby-growth-estimator"
        target="_blank"
        rel="noopener noreferrer"
        sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, textDecoration: 'none' }}
      >
        <GitHubIcon fontSize="small" />
        <Typography variant="body2">
          View on GitHub
        </Typography>
      </Link>
    </Box>
  )
}

export default Footer
