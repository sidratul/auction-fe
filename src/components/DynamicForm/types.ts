import { AnyObject, AnyObjectSchema, ObjectSchema } from 'yup';
import { FormControl } from './FormControl';

export type ValidationType<T> = AnyObjectSchema;

export interface UseFormProps<T extends AnyObject>{
  fields: FormFields<T>;
  validations?: ObjectSchema<T>;
  defaultValue?: T,
}

export type FormFields<T> = Record<keyof T, Field<T>>;
export type ComponentType = (props: any) => JSX.Element;
export type InputProps<C extends ComponentType> = Parameters<C>[0];

export interface Field<T> {
  component: ComponentType;
  label?: string;
  props: (form: AvailableProps<T>) => Record<string, any>;
}

export interface FormObject<T> {
  onChange: (name: keyof T, value: any) => void;
  errors: FormErrors<T>;
  control: FormControl<T>;
}

export interface AvailableProps<T> {
  handleChange: (value: T[keyof T]) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  ref: React.MutableRefObject<undefined>;
  defaultValue: T[keyof T];
  name: keyof T;
}

export interface FieldError{
  message: string;
}

export type FormErrors<T> = Record<keyof T, string>;
