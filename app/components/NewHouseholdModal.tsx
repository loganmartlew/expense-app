import { Form } from '@remix-run/react';
import { Button, Modal, Stack, TextInput } from '@mantine/core';
import { Home, ArrowRight } from 'tabler-icons-react';
import type { FC } from 'react';

interface Props {
  open: boolean;
  onClose: () => void;
}

const NewHouseholdModal: FC<Props> = ({ open, onClose }) => {
  return (
    <Modal opened={open} onClose={onClose} title='New Household'>
      <Form method='post' action=''>
        <Stack>
          <TextInput
            name='name'
            label='Name'
            placeholder='Household Name'
            icon={<Home size={16} />}
            required
          />
          <Button rightIcon={<ArrowRight size={18} />}>Create Household</Button>
        </Stack>
      </Form>
    </Modal>
  );
};

export default NewHouseholdModal;
