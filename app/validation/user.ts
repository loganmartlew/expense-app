import { object, string } from 'yup';

export const userDtoSchema = object({
  fname: string()
    .required('First name is required')
    .max(20, 'First name cannot be longer than 20 characters'),
  lname: string()
    .required('Last name is required')
    .max(20, 'Last name cannot be longer than 20 characters'),
  email: string()
    .required('Email is required')
    .email('Email must be a valid email'),
  rawPassword: string()
    .required('Password is required')
    .min(9, 'Password must be at least 9 characters'),
});
