import React, { useState } from 'react'

import Button from 'react-bootstrap/Button'

import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

import 'react-datepicker/dist/react-datepicker.css'
import DatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'
import Calculator from './Calculator'

type CalculateSubmitForm = {
  cartValue: number
  distance: number
  itemCount: number
  time: number
}

const App: React.FC = () => {
  const [deliverFee, setDeliverFee] = useState(0)
  const validationSchema = Yup.object().shape({
    cartValue: Yup.string().required('Cart value is required'),
    distance: Yup.string().required('Delivery distance is required'),
    itemCount: Yup.string().required('Number of items is required'),
    time: Yup.string().required('Delivery time is required'),
  })

  const calculateDeliveryFee = (
    cartValue: number,
    itemCount: number,
    distance: number,
    time: Date,
  ) => {
    let fee = 0

    if (cartValue < 10) {
      fee += 10 - cartValue
    }

    fee += 2

    if (distance > 1000) {
      fee += Math.ceil((distance - 1000) / 500)
    }

    if (itemCount >= 5) {
      fee += (itemCount - 4) * 0.5

      if (itemCount > 12) {
        fee += 1.2
      }
    }

    if (
      time.getUTCHours() >= 15 &&
      time.getUTCHours() <= 19 &&
      time.getUTCDay() === 5
    ) {
      console.log('time.getUTCHours() ', time.getUTCHours())
      fee *= 1.2
      console.log('Friday 15-19: ')
    }
    if (fee > 15) {
      fee = 15
    }

    if (cartValue >= 100) {
      fee = 0
    }
    console.log('fee: ', fee)

    return fee
  }

  const onSubmit = (data: CalculateSubmitForm) => {
    console.log('data: ', data)
    const { cartValue, distance, itemCount, time } = data

    const dateTime = new Date(Number(time))
    console.log(dateTime.getUTCDay())
    console.log(dateTime.getUTCHours())

    // calculateDeliveryFee(cartValue, itemCount, distance, dateTime)
    const fee = new Calculator(
      cartValue,
      itemCount,
      distance,
      dateTime,
    ).getDeliverFee()
    console.log('fee', fee)
    setDeliverFee(fee)
  }

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<CalculateSubmitForm>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver(validationSchema),
  })

  return (
    <div className="App">
      <h1>Delivery Fee Calculator</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Cart value</label>
          <input
            type="number"
            step="0.01"
            placeholder="20€"
            {...register('cartValue')}
            className={`form-control ${errors.cartValue ? 'is-invalid' : ''}`}
          />
          <div className="invalid-feedback">{errors.cartValue?.message}</div>
        </div>

        <div className="form-group">
          <label>Delivery distance</label>
          <input
            type="number"
            placeholder="900m"
            {...register('distance')}
            className={`form-control ${errors.distance ? 'is-invalid' : ''}`}
          />
          <div className="invalid-feedback">{errors.distance?.message}</div>
        </div>

        <div className="form-group">
          <label>Number of items</label>
          <input
            type="number"
            {...register('itemCount')}
            className={`form-control ${errors.itemCount ? 'is-invalid' : ''}`}
          />
          <div className="invalid-feedback">{errors.itemCount?.message}</div>
        </div>

        <div>
          <label>Time</label>
          <Controller
            render={(ref) => (
              <DatePicker
                className="form-group"
                selected={
                  ref.field.value
                    ? new Date(Number(ref.field.value))
                    : undefined
                }
                onChange={(date: Date) => ref.field.onChange(date.getTime())}
                // dateFormat={'MMMM d, yyyy hh:mm'}
                placeholderText="Select"
                showTimeSelect={true}
                showTimeInput
                customTimeInput={
                  <input
                    className={`form-control ${
                      errors.time ? 'is-invalid' : ''
                    }`}
                  />
                }
              />
            )}
            name={'time'}
            control={control}
            rules={{ required: true }}
          />

          <div className="invalid-feedback">{errors.time?.message}</div>
        </div>

        <Button variant="primary" type="submit">
          Calculate delivery price
        </Button>
        <button
          type="button"
          onClick={() => reset()}
          className="btn btn-warning float-right"
        >
          Clear inputs
        </button>
        <div>{deliverFee !== 0 && <h3>Deliver Fee: {deliverFee}</h3>}</div>
      </form>
    </div>
  )
}

export default App
