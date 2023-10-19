'use client';

import { Button, Collapse, Badge, Tooltip, Checkbox } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronUp } from '@tabler/icons-react';

import s from './Filters.module.scss';

export default function Filters() {
  const [technologiesOpened, { toggle: technologiesToggle }] = useDisclosure(false);
  const [categoriesOpened, { toggle: categoriesToggle }] = useDisclosure(false);

  return (
    <div className={s.panel}>
      <div className={s.group}>
        <header className={s.groupHeader}>
          <h2 className={s.groupTitle}>Filters</h2>
          <div className={s.groupButtons}>
            <Button size="compact-sm" variant="outline">
              Clear all
            </Button>
          </div>
        </header>
      </div>
      <div className={s.group}>
        <header className={s.groupHeader}>
          <h2 className={s.groupTitle}>Categories</h2>
          <div className={s.groupButtons}>
            <Button size="compact-sm" variant="transparent" onClick={categoriesToggle} className={s.groupButton}>
              <IconChevronUp className={`${s.groupToggleIcon} ${categoriesOpened ? s.groupToggleIconOpened : ''}`} />
            </Button>
          </div>
        </header>
        <Collapse in={categoriesOpened}>
          <div className={s.groupContent}>
            <Checkbox defaultChecked label="I agree to sell my privacy" />
          </div>
        </Collapse>
      </div>
      <div className={s.group}>
        <header className={s.groupHeader}>
          <h2 className={s.groupTitle}>Technologies</h2>
          <div className={s.groupButtons}>
            <Button size="compact-sm" variant="transparent" onClick={technologiesToggle} className={s.groupButton}>
              <IconChevronUp className={`${s.groupToggleIcon} ${technologiesOpened ? s.groupToggleIconOpened : ''}`} />
            </Button>
          </div>
        </header>
        <Collapse in={technologiesOpened}>
          <div className={s.groupContent}>
            <Checkbox defaultChecked label="I agree to sell my privacy" />
          </div>
        </Collapse>
      </div>
    </div>
  );
}
