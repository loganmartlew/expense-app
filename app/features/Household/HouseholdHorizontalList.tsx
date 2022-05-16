import { Group, ScrollArea } from '@mantine/core';
import HouseholdCard from './HouseholdCard';
import type { FC } from 'react';
import type { HouseholdCardData } from '~/types/Household';

interface Props {
  households: HouseholdCardData[];
}

const HouseholdHorizontalList: FC<Props> = ({ households }) => {
  return (
    <ScrollArea sx={{ width: '100%', paddingBottom: '1em' }}>
      <Group noWrap>
        {households.map(household => (
          <HouseholdCard key={household.id} household={household} />
        ))}
      </Group>
    </ScrollArea>
  );
};

export default HouseholdHorizontalList;
