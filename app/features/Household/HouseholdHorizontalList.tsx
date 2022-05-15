import { Box, Group, ScrollArea } from '@mantine/core';
import type { Household } from '@prisma/client';
import type { FC } from 'react';
import HouseholdCard from './HouseholdCard';

interface Props {
  households: Household[];
}

const HouseholdHorizontalList: FC<Props> = ({ households }) => {
  return (
    <ScrollArea sx={{ width: '100%' }}>
      <Group noWrap>
        {households.map(household => (
          <HouseholdCard key={household.id} household={household} />
        ))}
      </Group>
    </ScrollArea>
  );
};

export default HouseholdHorizontalList;
