import yup from 'yup';

export const userDtoSchema = yup.object({
  fname: yup
    .string()
    .required('First name is required')
    .max(20, 'First name cannot be longer than 20 characters'),
  lname: yup
    .string()
    .required('Last name is required')
    .max(20, 'Last name cannot be longer than 20 characters'),
  email: yup
    .string()
    .required('Email is required')
    .email('Email must be a valid email'),
  rawPassword: yup
    .string()
    .required('Password is required')
    .min(9, 'Password must be at least 9 characters'),
});
