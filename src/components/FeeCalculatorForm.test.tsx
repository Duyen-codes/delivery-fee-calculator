import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Calculator from '../Calculator'
import FeeCalculatorForm from './FeeCalculatorForm'

describe('FeeCalculatorForm', () => {
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

  test('submits the form correctly', async () => {
    let calculator: Calculator
    let setDeliverFee = jest.fn()

    const { getByLabelText, getByText } = render(<FeeCalculatorForm />)

    const data = {
      cartValue: 20,
      distance: 1500,
      itemCount: 8,
      time: new Date('2023-01-24T11:00:00Z'),
    }

    const cartValueInput = getByLabelText(/cart value/i)
    const distanceInput = getByLabelText(/delivery distance/i)
    const itemCountInput = getByLabelText(/number of items/i)
    const timeInput = getByLabelText(/delivery time/i)

    // fill in the form inputs
    fireEvent.change(cartValueInput, { target: { value: data.cartValue } })
    fireEvent.change(distanceInput, { target: { value: data.distance } })
    fireEvent.change(itemCountInput, { target: { value: data.itemCount } })
    fireEvent.change(timeInput, {
      target: { value: data.time },
    })

    calculator = new Calculator(
      data.cartValue,
      data.distance,
      data.itemCount,
      data.time,
    )

    const calculateButton = getByText(/Calculate delivery price/i)
    fireEvent.click(calculateButton)

    await waitFor(() => {
      expect(getByText(/Delivery fee: €5.00/i)).toBeInTheDocument()
    })
  })

  test('form displays validation error messages when the required fields are left empty', () => {
    const { container } = render(<FeeCalculatorForm />)

    const cartValueError = container.querySelector('.invalid-feedback')

    const calculateButton = screen.getByText(/calculate/i)
    fireEvent.click(calculateButton)

    // // const cartValueError = screen.getByText(/cart value is required/i)
    // const distanceError = screen.getByText(/delivery distance is required/i)
    // const itemCountError = screen.getByText(/number of items is required/i)
    // const timeError = screen.getByText(/delivery time is required/i)

    // // expect(cartValueError).toBeInTheDocument()
    // expect(distanceError).toBeInTheDocument()
    // expect(itemCountError).toBeInTheDocument()
    // expect(timeError).toBeInTheDocument()
  })

  test('test form correctly resets the input values and delivery fee when clear inputs buttton is clicked', () => {})
})
