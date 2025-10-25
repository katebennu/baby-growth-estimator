import { useState, useEffect } from 'react'
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
      <div className="container">
        <Header />
        <main style={{ background: 'white', padding: '40px', textAlign: 'center', borderRadius: '15px' }}>
          <p style={{ color: '#ff6b6b', fontSize: '1.1rem' }}>
            Failed to load WHO growth data. Please refresh the page or try again later.
          </p>
          <p style={{ marginTop: '20px', fontSize: '0.9rem', color: '#666' }}>
            Make sure you're running this application through a local server.
          </p>
        </main>
      </div>
    )
  }

  if (!dataLoaded) {
    return (
      <div className="container">
        <Header />
        <main style={{ background: 'white', padding: '40px', textAlign: 'center', borderRadius: '15px' }}>
          <p style={{ fontSize: '1.1rem', color: '#11998e' }}>Loading WHO growth data...</p>
        </main>
      </div>
    )
  }

  return (
    <div className="container">
      <Header />
      <main>
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
      </main>

      <Footer />
    </div>
  )
}

export default App
