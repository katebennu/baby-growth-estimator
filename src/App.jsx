import { useState, useEffect } from 'react'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'
import theme from './theme'
import { loadAllData } from './data'
import Header from './components/Header'
import WelcomeSection from './components/WelcomeSection'
import TabButtons from './components/TabButtons'
import MeasurementTab from './components/MeasurementTab'
import Footer from './components/Footer'

function App() {
  const [activeTab, setActiveTab] = useState('weight')
  const [sharedInputs, setSharedInputs] = useState({
    age: 6,
    gender: 'girl',
    percentile: 50
  })
  const [dataLoaded, setDataLoaded] = useState(false)
  const [dataError, setDataError] = useState(false)

  useEffect(() => {
    // Load WHO growth data on mount
    const initializeData = async () => {
      console.log('Baby Growth Estimator loading...')
      const loaded = await loadAllData()

      if (!loaded) {
        console.error('Failed to load WHO growth data')
        setDataError(true)
      } else {
        console.log('Baby Growth Estimator loaded successfully')
        setDataLoaded(true)
      }
    }

    initializeData()
  }, [])

  if (dataError) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: 3 }}>
          <Container maxWidth="md">
            <Header />
            <Box sx={{ mt: 3 }}>
              <Alert severity="error">
                Failed to load WHO growth data. Please refresh the page or try again later.
              </Alert>
              <Alert severity="info" sx={{ mt: 2 }}>
                Make sure you're running this application through a local server.
              </Alert>
            </Box>
          </Container>
        </Box>
      </ThemeProvider>
    )
  }

  if (!dataLoaded) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Box sx={{ textAlign: 'center' }}>
            <CircularProgress size={60} />
            <Box sx={{ mt: 2, color: 'primary.main', fontSize: '1.1rem' }}>
              Loading WHO growth data...
            </Box>
          </Box>
        </Box>
      </ThemeProvider>
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: 3 }}>
        <Container maxWidth="md">
          <Header />
          <Box sx={{ bgcolor: 'background.paper', borderRadius: 3, p: 2, mt: 3, boxShadow: 3 }}>
            <WelcomeSection />

            <TabButtons
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />

            <MeasurementTab
              type="weight"
              active={activeTab === 'weight'}
              sharedInputs={sharedInputs}
              onInputChange={setSharedInputs}
            />

            <MeasurementTab
              type="length"
              active={activeTab === 'length'}
              sharedInputs={sharedInputs}
              onInputChange={setSharedInputs}
            />

            <MeasurementTab
              type="head"
              active={activeTab === 'head'}
              sharedInputs={sharedInputs}
              onInputChange={setSharedInputs}
            />
          </Box>

          <Footer />
        </Container>
      </Box>
    </ThemeProvider>
  )
}

export default App
