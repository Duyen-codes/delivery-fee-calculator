import React from 'react'
import FeeCalculatorForm from './components/FeeCalculatorForm'

const App: React.FC = () => {
  return (
    <div
      className="App row justify-content-center align-items-center"
      style={{ minHeight: '100vh' }}
    >
      <FeeCalculatorForm />
    </div>
  )
}

export default App
