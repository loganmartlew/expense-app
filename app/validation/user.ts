import { object, string } from 'yup';
import type UserDTO from '~/types/UserDTO';

export const userDtoSchema = object({
  fname: string()
    .trim()
    .required('First name is required')
    .max(20, 'First name cannot be longer than 20 characters'),
  lname: string()
    .trim()
    .required('Last name is required')
    .max(20, 'Last name cannot be longer than 20 characters'),
  email: string()
    .trim()
    .required('Email is required')
    .email('Email must be a valid email'),
  rawPassword: string()
    .trim()
    .required('Password is required')
    .min(9, 'Password must be at least 9 characters'),
});

export const validateUserDto = async (userDto: UserDTO) => {
  const trimmedUser: UserDTO = {
    fname: userDto.fname.trim(),
    lname: userDto.lname.trim(),
    email: userDto.email.trim(),
    rawPassword: userDto.rawPassword.trim(),
  };

  return (await userDtoSchema.validate(trimmedUser)) as UserDTO;
};
