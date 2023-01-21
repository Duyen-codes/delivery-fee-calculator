import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import 'react-datepicker/dist/react-datepicker.css'
import DatePicker from 'react-datepicker'
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

  const onSubmit = (data: CalculateSubmitForm) => {
    console.log('data: ', data)
    const { cartValue, distance, itemCount, time } = data
    const dateTime = new Date(Number(time))
    // calculateDeliveryFee(cartValue, itemCount, distance, dateTime)
    const fee = new Calculator(
      cartValue,
      distance,
      itemCount,
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
        <h3>Deliver Fee: {deliverFee}</h3>
      </form>
    </div>
  )
}

export default App
