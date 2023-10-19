import { Button, Group } from '@mantine/core';

import s from './Hero.module.scss';
import { IconApps, IconUserDollar } from '@tabler/icons-react';

export default function Hero() {
  return (
    <div className={s.hero}>
      <div className={s.heroBg}></div>
      <h1 className={s.title}>The Next Level Job Board</h1>
      <p className={s.description}>With us, you'll find a job even during the worst crisis.</p>
      <Group>
        <Button rightSection={<IconApps size={14} />}>Browse offers</Button>
        <Button color="white" variant="outline" rightSection={<IconUserDollar size={14} />}>
          Employer panel
        </Button>
      </Group>
    </div>
  );
}
