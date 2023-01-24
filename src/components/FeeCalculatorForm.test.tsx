import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import FeeCalculatorForm from './FeeCalculatorForm'

test('should have a calculate button', async () => {
  render(<FeeCalculatorForm />)
  expect(
    await screen.findByText('Calculate delivery price'),
  ).toBeInTheDocument()
})

test('when form is submitted, callback has correct data', () => {
  const handleSubmit = jest.fn()

  render(<FeeCalculatorForm />)

  const calculatorToCreate = {
    cartValue: '8.90',
    distance: '900',
    itemCount: '4',
    time: '2023-01-24T11:00',
  }

  const cartValueInput = screen.getByLabelText('Cart value')
  userEvent.type(cartValueInput, calculatorToCreate.cartValue)

  const distanceInput = screen.getByLabelText('Deliver distance')
  userEvent.type(distanceInput, calculatorToCreate.distance)

  const itemCountInput = screen.getByLabelText('Number of items')
  userEvent.type(itemCountInput, calculatorToCreate.itemCount)

  const deliverTimeInput = screen.getByLabelText('Time') as HTMLInputElement
  fireEvent.change(deliverTimeInput, {
    target: { value: calculatorToCreate.time },
  })

  expect(deliverTimeInput.value).toBe('24/01/2023')

  const calculateButton = screen.getByText(/Calculate delivery price/i)

  fireEvent.click(calculateButton)
})
