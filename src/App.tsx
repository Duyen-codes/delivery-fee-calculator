import React, { useState } from 'react'

import Button from 'react-bootstrap/Button'

import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import DatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'

import DateController from './DateController'

type CalculateSubmitForm = {
  cartValue: number
  deliveryDistance: number
  numberOfItems: number
  time: number
}

const App: React.FC = () => {
  const validationSchema = Yup.object().shape({
    cartValue: Yup.string().required('Cart value is required'),
    deliveryDistance: Yup.string().required('Delivery distance is required'),
    numberOfItems: Yup.string().required('Number of items is required'),
    time: Yup.string().required('Delivery time is required'),
  })

  const onSubmit = (data: CalculateSubmitForm) => {
    console.log('form submit')
    console.log('data: ', data)
    console.log(new Date(Number(data.time)).toISOString())
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Cart value</label>
          <input
            type="text"
            {...register('cartValue')}
            className={`form-control ${errors.cartValue ? 'is-invalid' : ''}`}
          />
          <div className="invalid-feedback">{errors.cartValue?.message}</div>
        </div>

        <div className="form-group">
          <label>Delivery distance</label>
          <input
            type="text"
            {...register('deliveryDistance')}
            className={`form-control ${
              errors.deliveryDistance ? 'is-invalid' : ''
            }`}
          />
          <div className="invalid-feedback">
            {errors.deliveryDistance?.message}
          </div>
        </div>

        <div className="form-group">
          <label>Number of items</label>
          <input
            type="text"
            {...register('numberOfItems')}
            className={`form-control ${
              errors.numberOfItems ? 'is-invalid' : ''
            }`}
          />
          <div className="invalid-feedback">
            {errors.numberOfItems?.message}
          </div>
        </div>

        <div className="form-group">
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
                dateFormat={'MMMM d, yyyy hh:mm'}
                placeholderText="Select"
                showTimeSelect={true}
                showTimeInput
                customTimeInput={
                  <input
                    className={`form-control ${
                      errors.numberOfItems ? 'is-invalid' : ''
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
          Submit
        </Button>
        <button
          type="button"
          onClick={() => reset()}
          className="btn btn-warning float-right"
        >
          Clear inputs
        </button>
      </form>
    </div>
  )
}

export default App
