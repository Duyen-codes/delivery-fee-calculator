import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { act } from 'react-dom/test-utils'
import Calculator from '../utils/Calculator'
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
    const spy = jest.spyOn(Calculator.prototype, 'calculateDeliverFee')

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

    const calculateButton = getByText(/Calculate delivery price/i)

    // fill in the form inputs
    await act(async () => {
      {
        fireEvent.change(cartValueInput, { target: { value: data.cartValue } })
        fireEvent.change(distanceInput, { target: { value: data.distance } })
        fireEvent.change(itemCountInput, { target: { value: data.itemCount } })
        fireEvent.change(timeInput, {
          target: { value: data.time },
        })
        fireEvent.click(calculateButton)
      }
    })

    expect(getByText(/Delivery fee: €5.00/i)).toBeInTheDocument()
    expect(spy).toHaveBeenCalled()
  })

  test('form displays validation error messages when the required fields are left empty', () => {
    const { getByText, container } = render(<FeeCalculatorForm />)

    const calculateButton = getByText(/Calculate delivery price/i)
    fireEvent.click(calculateButton)

    const cartValueError = container.querySelector('#cartValue-error')
    const distanceError = container.querySelector('#distance-error')
    const itemCountError = container.querySelector('#itemCount-error')
    const timeError = container.querySelector('#time-error')

    expect(cartValueError).toBeInTheDocument()
    expect(distanceError).toBeInTheDocument()
    expect(itemCountError).toBeInTheDocument()
    expect(timeError).toBeInTheDocument()
  })

  describe('ClearInputs', () => {
    test.only('should reset the form inputs and set the deliverFee to 0', async () => {
      const { getByText, getByLabelText } = render(<FeeCalculatorForm />)

      const data = {
        cartValue: 20,
        distance: 1500,
        itemCount: 8,
        time: new Date('2023-01-24T11:00:00Z'),
      }

      const cartValueInput = getByLabelText(/cart value/i)

      screen.debug(cartValueInput)
      const distanceInput = getByLabelText(/delivery distance/i)
      const itemCountInput = getByLabelText(/number of items/i)
      const timeInput = getByLabelText(/delivery time/i)

      const clearButton = getByText(/Clear inputs/i)

      // fill in the form inputs
      await act(async () => {
        {
          fireEvent.change(cartValueInput, {
            target: { value: data.cartValue },
          })
          fireEvent.change(distanceInput, { target: { value: data.distance } })
          fireEvent.change(itemCountInput, {
            target: { value: data.itemCount },
          })
          fireEvent.change(timeInput, {
            target: { value: data.time },
          })

          fireEvent.click(clearButton)
        }
      })
    })
  })
})
