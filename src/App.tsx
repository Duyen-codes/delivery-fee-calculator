import React, { useState } from 'react'
import FeeCalculatorForm from './components/FeeCalculatorForm'

const App: React.FC = () => {
  const [deliverFee, setDeliverFee] = useState(0)

  return (
    <div className="App">
      <FeeCalculatorForm />
    </div>
  )
}

export default App
