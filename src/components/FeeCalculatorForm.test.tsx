import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import FeeCalculatorForm from './FeeCalculatorForm'

test('renders the form correctly', () => {
  render(<FeeCalculatorForm />)

  const cartValueInput = screen.getByLabelText(/cart value/i)
  const distanceInput = screen.getByLabelText(/delivery distance/i)
  const itemCountInput = screen.getByLabelText(/number of items/i)
  const timeInput = screen.getByLabelText(/delivery time/i)

  const calculateButton = screen.getByText(/calculate/i)
  const clearButton = screen.getByText(/clear/i)

  expect(cartValueInput).toBeInTheDocument()
  expect(distanceInput).toBeInTheDocument()
  expect(itemCountInput).toBeInTheDocument()
  expect(timeInput).toBeInTheDocument()

  expect(calculateButton).toBeInTheDocument()
  expect(clearButton).toBeInTheDocument()
})
