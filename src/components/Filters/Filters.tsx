'use client';

import { Button, Collapse, Modal, Checkbox } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronRight, IconChevronUp, IconAdjustments } from '@tabler/icons-react';

import s from './Filters.module.scss';

export default function Filters() {
  const [technologiesOpened, { toggle: technologiesToggle }] = useDisclosure(false);
  const [categoriesOpened, { toggle: categoriesToggle }] = useDisclosure(false);
  const [filtersOpened, { open: openFilters, close: closeFilters }] = useDisclosure(false);

  return (
    <>
      <Modal
        opened={filtersOpened}
        onClose={closeFilters}
        centered
        withCloseButton={false}
        size="xl"
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
        transitionProps={{ transition: 'rotate-left' }}
      >
        {/* Modal content */}
      </Modal>

      <div className={s.panel}>
        <div className={s.group}>
          <header className={s.groupHeader}>
            <h2 className={s.groupTitle}>Filters</h2>
            <div className={s.groupButtons}>
              <Button color="gray" size="compact-xs" variant="outline">
                Clear all
              </Button>
            </div>
          </header>
          <div className={s.groupContent}>
            <Button
              size="sm"
              leftSection={<IconAdjustments size={14} />}
              rightSection={<IconChevronRight size={14} />}
              onClick={openFilters}
              fullWidth
            >
              See all filters
            </Button>
          </div>
        </div>
        <div className={s.group}>
          <header className={s.groupHeader} onClick={categoriesToggle}>
            <h2 className={s.groupTitle}>Categories</h2>
            <div className={s.groupButtons}>
              <Button size="compact-sm" variant="transparent" className={s.groupButton}>
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
          <header className={s.groupHeader} onClick={technologiesToggle}>
            <h2 className={s.groupTitle}>Technologies</h2>
            <div className={s.groupButtons}>
              <Button size="compact-sm" variant="transparent" className={s.groupButton}>
                <IconChevronUp
                  className={`${s.groupToggleIcon} ${technologiesOpened ? s.groupToggleIconOpened : ''}`}
                />
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
    </>
  );
}
