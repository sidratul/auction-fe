import React, { useCallback, useEffect } from 'react'
import { FormControl, useError, useInputRef } from './FormControl'
import { Field } from './types';

interface DynamicFormProps<T>{
  control: FormControl<T>;
  onSubmit: (data: T) => void;
}
export const DynamicForm = <T extends unknown>(props: DynamicFormProps<T>) => {
  const { control, onSubmit } = props;
  control.submitFunction = onSubmit;

  return (
    <form onSubmit={(e)=>{
      e.preventDefault();
      control.submit();
    }}>
      <div className='grid gap-4'>
        {Object.keys(control.fields).map(key => {
          const field = control.getField(key as keyof T);
          return (
            <ComponentSection field={field} key={key} control={control} name={key as keyof T}/>
          )
        })}
      </div>
    </form>
  )
}

const ComponentSection = <T extends unknown>(props: {
  field: Field<T>,
  control: FormControl<T>,
  name: keyof T,
}) => {
  return (
    <div className='grid gap-1'>
      {
        props.field.label && (
          <div className='font-medium'>{props.field.label}</div>
        )
      }
      <InputComponent {...props}/>
      <ErrorComponent {...props} />
    </div>
  )
}

const InputComponent = <T extends unknown>(props: {
  field: Field<T>,
  control: FormControl<T>,
  name: keyof T,
}) => {
  const Component = props.field.component;
  useInputRef({
    control: props.control,
    name: props.name,
  });

  const componentProps = props.field.props(props.control.getComponentProps(props.name));

  return (
    <Component {...componentProps}/>
  )
}

const ErrorComponent = <T extends unknown>(props: {
  field: Field<T>,
  control: FormControl<T>,
  name: keyof T,
}) => {
  const error = useError<T>({
    control: props.control,
    name: props.name,
  });

  console.log("error", error)

  return (
    <span role='alert' className='text-red-500 first-letter:capitalize'>{error}</span>
  )
}