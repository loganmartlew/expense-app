import { Card, Title } from '@mantine/core';
import type { Household } from '@prisma/client';
import type { FC } from 'react';

interface Props {
  household: Household;
}

const HouseholdCard: FC<Props> = ({ household }) => {
  return (
    <Card sx={{ minWidth: 'max-content' }}>
      <Title order={3}>{household.name}</Title>
    </Card>
  );
};

export default HouseholdCard;
