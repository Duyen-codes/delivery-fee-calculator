import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import 'react-datepicker/dist/react-datepicker.css'
import DatePicker from 'react-datepicker'
import Calculator from '../Calculator'

type CalculateSubmitForm = {
  cartValue: number
  distance: number
  itemCount: number
  time: number
}

const FeeCalculatorForm: React.FC = () => {
  const [deliverFee, setDeliverFee] = useState<number>(0)

  const validationSchema = Yup.object().shape({
    cartValue: Yup.string().required('Cart value is required'),
    distance: Yup.string().required('Delivery distance is required'),
    itemCount: Yup.string().required('Number of items is required'),
    time: Yup.string().required('Delivery time is required'),
  })

  const onSubmit = (data: CalculateSubmitForm) => {
    const { cartValue, distance, itemCount, time } = data
    const dateTime = new Date(Number(time))

    const fee = new Calculator(
      cartValue,
      distance,
      itemCount,
      dateTime,
    ).getDeliverFee()

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

  const clearInputs = () => {
    reset()
    setDeliverFee(0)
  }

  return (
    <div style={{ maxWidth: '768px' }}>
      <h5 className="display-5 text-center mb-5">Delivery Fee Calculator</h5>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="row g-3 border rounded-top shadow p-3 bg-white"
      >
        <div className="form-group">
          <label htmlFor="cartValue" className="form-label">
            Cart value
          </label>
          <div className="input-group">
            <input
              type="number"
              min="1"
              step="0.01"
              placeholder="20"
              {...register('cartValue')}
              className={`form-control form-control-lg ${
                errors.cartValue ? 'is-invalid' : ''
              }`}
              id="cartValue"
            />
            <span className="input-group-text">€</span>
            <div className="invalid-feedback">{errors.cartValue?.message}</div>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="distance" className="form-label">
            Delivery distance
          </label>
          <div className="input-group">
            <span className="input-group-text">$</span>
            <input
              id="distance"
              type="number"
              min="1"
              placeholder="900"
              {...register('distance')}
              className={`form-control form-control-lg ${
                errors.distance ? 'is-invalid' : ''
              }`}
            />
            <span className="input-group-text">m</span>

            <div className="invalid-feedback">{errors.distance?.message}</div>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="itemCount" className="form-label">
            Number of items
          </label>
          <input
            id="itemCount"
            type="number"
            min={0}
            {...register('itemCount')}
            className={`form-control form-control-lg ${
              errors.itemCount ? 'is-invalid' : ''
            }`}
            placeholder="4"
          />
          <div className="invalid-feedback">{errors.itemCount?.message}</div>
        </div>

        <div className="form-group">
          <label htmlFor="time" className="form-label">
            Delivery time
          </label>

          <Controller
            render={(ref) => (
              <DatePicker
                id="time"
                className={`form-control form-control-lg ${
                  errors.time ? 'is-invalid' : ''
                }`}
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
          />

          <div className="invalid-feedback" style={{ display: 'block' }}>
            {errors.time?.message}
          </div>
        </div>
        <div className="row g-3 mb-3">
          <div className="col-auto">
            <Button type="submit" className="btn btn-info btn-lg text-white">
              Calculate delivery price
            </Button>
          </div>
          <div className="col-auto">
            <Button
              type="button"
              //   onClick={() => reset()}
              onClick={clearInputs}
              className="btn btn-warning btn-lg"
            >
              Clear inputs
            </Button>
          </div>
        </div>
        <div
          style={{
            backgroundColor: 'hsl(183, 100%, 15%)',
            color: 'hsl(172, 67%, 45%)',
          }}
        >
          <p className="display-6 text-center p-2">
            Delivery Fee: €{deliverFee.toFixed(2)}
          </p>
        </div>
      </form>
    </div>
  )
}

export default FeeCalculatorForm
