import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import 'react-datepicker/dist/react-datepicker.css'
import DatePicker from 'react-datepicker'
import Calculator from './utils/Calculator'

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
  console.log(new Calculator(10, 1499, 3, new Date()).getDeliverFee()) // 3
  console.log(new Calculator(110, 1501, 13, new Date()).getDeliverFee()) // 0
  console.log(
    new Calculator(
      50,
      2000,
      20,
      new Date('2022-12-16T18:00:00'),
    ).getDeliverFee(),
  ) // 15

  const onSubmit = (data: CalculateSubmitForm) => {
    console.log('form submit')

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
            min={0}
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
            min={0}
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
            min={0}
            {...register('itemCount')}
            className={`form-control ${errors.itemCount ? 'is-invalid' : ''}`}
          />
          <div className="invalid-feedback">{errors.itemCount?.message}</div>
        </div>

        <div className="form-group">
          <label>Time</label>

          <Controller
            render={(ref) => (
              <DatePicker
                className={`form-control ${errors.time ? 'is-invalid' : ''}`}
                {...register('time')}
                selected={
                  ref.field.value
                    ? new Date(Number(ref.field.value))
                    : undefined
                }
                onChange={(date: Date) => ref.field.onChange(date.getTime())}
                // dateFormat={'MM d, yyyy'}
                dateFormat={'d/MM/yyyy'}
                placeholderText="Select"
                showTimeSelect={true}
                showTimeInput
              ></DatePicker>
            )}
            name={'time'}
            control={control}
            rules={{ required: true }}
          ></Controller>
          <div className="invalid-feedback">{errors.time?.message}</div>
        </div>

        <Button variant="primary" type="submit" style={{ margin: '4rem' }}>
          Calculate delivery price
        </Button>
        <Button
          type="button"
          onClick={() => reset()}
          className="btn btn-warning float-right"
        >
          Clear inputs
        </Button>
        <h3>Deliver Fee: {deliverFee}</h3>
      </form>
    </div>
  )
}

export default App
