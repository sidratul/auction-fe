import React, { useRef, useState } from 'react';
import { AnyObject, AnyObjectSchema, ValidationError } from 'yup';
import { Field, FormErrors, FormFields, ValidationType, AvailableProps, UseFormProps, FormObject } from './types';


export class FormControl<T> {
  fields: FormFields<T> = {} as FormFields<T>;
  validations?: ValidationType<T>;
  defaultValue: T = {} as T;
  componentProps: AvailableProps<T> = {} as AvailableProps<T>;
  data: T = {} as T;
  setErrorObj: Record<keyof T, React.Dispatch<React.SetStateAction<string | undefined>>> = {} as Record<keyof T, React.Dispatch<React.SetStateAction<string | undefined>>>;
  refs: Record<keyof T, React.MutableRefObject<any>> = {} as Record<keyof T, React.MutableRefObject<any>>;
  submitFunction: (data: T) => void = (data) => {};

  constructor(){}

  setFields(fields: FormFields<T>) {
    this.fields = fields;
  }

  setDefaultValue(defaultValue: T) {
    this.defaultValue = defaultValue;
    if(!this.defaultValue){
      return;
    }

    this.data = {
      ...this.defaultValue,
    };
  }

  submit() {
    if(this.validations) {
      const errors = this.validate(this.validations, this.data);
      if(errors) {
        this.setFormError(errors);
        return;
      }
    }
    this.submitFunction(this.data);
  }

  validate(validations: AnyObject, data: any) {
    try{
      this.validations?.validateSync(this.data, {
        abortEarly: false,
      });
    } catch(e) {
      const error = this.generateError(e as ValidationError);
      return error;
    }
    return;
  }

  setFormError(errors: FormErrors<T>) {
    Object.keys(errors).map(name => {
      const error = errors[name as keyof T];
      this.setErrorField(name as keyof T, error);
    })
  }

  setErrorField(name: keyof T, error: string | undefined) {
    console.log("this.setErrorObj", this.setErrorObj)
    this.setErrorObj[name] && this.setErrorObj[name](error);
  }

  generateError(errors: ValidationError): FormErrors<T> {
    return errors.inner.reduce((data, err) =>{
      data[err.path as keyof T] =  err.message;
      return data;
    },{} as FormErrors<T>);
  }

  getField(key: keyof T): Field<T> {
    return this.fields[key];
  }

  setValue(name: keyof T,value: T[keyof T]): void {
    this.data[name] = value;
  }

  getValue(name: keyof T): T[keyof T] {
    return this.data[name];
  }

  getDefaultValue(name: keyof T): T[keyof T] {
    if( !this.defaultValue ) {
      return undefined as T[keyof T];
    }

    return this.defaultValue[name];
  }

  getComponentProps(name: keyof T):  AvailableProps<T> {
    const self = this;
    return {
      name,
      defaultValue: self.getDefaultValue(name),
      ref: self.refs[name],
      handleChange(value: T[keyof T]){
        self.setValue(name, value);
        self.validateIput(name, value);
      },
      onChange(event){
        const value = event.target.value as T[keyof T];
        self.setValue(name, value);
        self.validateIput(name, value);
      }
    }
  }

  validateIput(name: keyof T, value: T[keyof T]) {
    const validation = this.validations?.pick([name]);
    const errors = this.validate(validation as unknown as AnyObjectSchema, {
      [name]: value
    });

    this.setErrorField(name, errors && errors[name]);
  }
}

export const useForm = <T extends AnyObject>(props: UseFormProps<T>): FormObject<T> => {
  const control = new FormControl<T>();
  control.setFields(props.fields);
  control.setDefaultValue(props.defaultValue ? props.defaultValue : {} as T);
  control.validations = props.validations as unknown as AnyObjectSchema;

  return {
    control,
    errors: {} as any,
    onChange(name, value) {
      return '';
    },
  }
};

export const useError = <T extends unknown>(props: {
  control: FormControl<T>,
  name: keyof T,
}): string | undefined => {
  const [error, setError] = useState<string>();
  props.control.setErrorObj[props.name] = setError;
  return error;
};

export const useInputRef = <T extends unknown>(props: {
  control: FormControl<T>,
  name: keyof T,
}) => {
  const ref = useRef();
  props.control.refs[props.name] = ref;
  return ref;
};

