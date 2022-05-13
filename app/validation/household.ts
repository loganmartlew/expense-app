import { object, string } from 'yup';
import type HouseholdDTO from '~/types/HouseholdDTO';

export const householdDtoSchema = object({
  name: string()
    .trim()
    .required('Household name is required')
    .max(20, 'Household name must be less than 20 characters'),
  ownerId: string()
    .trim()
    .required('server error: User id was not provided')
    .uuid('Server error: User id is not a valid UUID'),
});

export const validateHouseholdDto = async (householdDto: HouseholdDTO) => {
  const trimmedHousehold: HouseholdDTO = {
    name: householdDto.name.trim(),
    ownerId: householdDto.ownerId.trim(),
  };

  return (await householdDtoSchema.validate(trimmedHousehold)) as HouseholdDTO;
};
