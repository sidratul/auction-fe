import React, { InputHTMLAttributes, useRef } from 'react'
import { BaseTextInput, BaseTextInputProps } from './BaseTextInput';

export interface TimeFieldProps {
  handleChange: (value: number) => void;
}

export const TimeField = (props: TimeFieldProps) => {
  const hourRef = useRef<HTMLInputElement>(null);
  const minuteRef = useRef<HTMLInputElement>(null);

  const onChange = () => {
    const hour = Number(hourRef.current?.value) || 0;
    const minute = Number(minuteRef.current?.value) || 0;
    const seconds = (isNaN(hour) ? 0 : hour ) * 60 * 60 + ((isNaN(minute) ? 0 : minute) * 60);
    props.handleChange(seconds);
  }

  return (
    <>
      <div className='grid grid-cols-2 gap-3'>
        <BaseTextInput
          onChange={()=>onChange()}
          innerRef={hourRef}
          type='number'
          label='Hour'
          placeholder='Hour'
        />
        <BaseTextInput
          onChange={()=>onChange()}
          innerRef={minuteRef}
          type='number'
          label='Minute'
          placeholder='Time'
        />

      </div>
      <div className="font-small">Bid duration start after item published</div>
    </>
  )
}
