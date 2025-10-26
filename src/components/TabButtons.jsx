import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'

function TabButtons({ activeTab, onTabChange }) {
  const tabs = [
    { id: 'weight', label: 'Weight' },
    { id: 'length', label: 'Length' },
    { id: 'head', label: 'Head' }
  ]

  const handleChange = (event, newValue) => {
    onTabChange(newValue)
  }

  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
      <Tabs
        value={activeTab}
        onChange={handleChange}
        variant="fullWidth"
        textColor="primary"
        indicatorColor="primary"
      >
        {tabs.map(tab => (
          <Tab key={tab.id} value={tab.id} label={tab.label} />
        ))}
      </Tabs>
    </Box>
  )
}

export default TabButtons
