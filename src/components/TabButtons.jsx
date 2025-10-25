function TabButtons({ activeTab, onTabChange }) {
  const tabs = [
    { id: 'weight', label: 'Weight' },
    { id: 'length', label: 'Length' },
    { id: 'head', label: 'Head Circumference' }
  ]

  return (
    <div className="tabs">
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}

export default TabButtons
