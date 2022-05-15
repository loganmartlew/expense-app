import { Outlet } from '@remix-run/react';
import Shell from '~/features/Layout/Shell';
import type { FC } from 'react';

interface Props {}

const App: FC<Props> = () => {
  return (
    <Shell>
      <Outlet />
    </Shell>
  );
};

export default App;
