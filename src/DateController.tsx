import React from 'react'
import DatePicker from 'react-datepicker'
import { Controller, useForm } from 'react-hook-form'
import 'react-datepicker/dist/react-datepicker.css'

export default function DateController() {
  const {
    handleSubmit,
    setValue,
    watch,
    register,
    formState,
    control,
    getValues,
  } = useForm<{ date: number }>({
    mode: 'all',
  })
  watch(['date'])
  return (
    <>
      <Controller
        render={(ref) => (
          <DatePicker
            className="form-group"
            selected={
              ref.field.value ? new Date(Number(ref.field.value)) : undefined
            }
            onChange={(date: Date) => ref.field.onChange(date.getTime())}
            dateFormat={'MMMM d, yyyy hh:mm'}
            placeholderText="Select"
            showTimeSelect={true}
            showTimeInput
            customTimeInput={<input />}
          />
        )}
        name={'date'}
        control={control}
        rules={{ required: true }}
      />
    </>
  )
}
