import { Button, Group } from '@mantine/core';
import { IconApps, IconUserDollar } from '@tabler/icons-react';

import s from './styles.module.scss';

export default function Hero() {
  return (
    <div className={s.hero}>
      <div className={s.heroBg}></div>
      <div className={s.heroBgGradients}>
        <div className={s.gradient}></div>
        <div className={s.gradient}></div>
      </div>
      <h1 className={s.title}>
        The Next Level <span className={s.titleGradient}>Job Board</span>
      </h1>
      <p className={s.description}>Don't worry, you'll find a dream job, even during the worst crisis.</p>
      <Group>
        <Button rightSection={<IconApps size={14} />}>Browse offers</Button>
        <Button color="white" variant="outline" rightSection={<IconUserDollar size={14} />}>
          Employer panel
        </Button>
      </Group>
    </div>
  );
}
