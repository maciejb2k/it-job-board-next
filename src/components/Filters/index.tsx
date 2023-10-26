'use client';

import { Button, Collapse, Modal, Checkbox, Loader, ScrollArea, Box } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronRight, IconChevronUp, IconAdjustments } from '@tabler/icons-react';

import s from './styles.module.scss';
import { useJobOffers } from '@/providers/JobOffersContext';
import { useQuery } from '@tanstack/react-query';
import { getCategories, getTechnologies } from '@/services/jobOffersService';

type Category = {
  name: string;
  label: string;
  id: string;
};

type Technology = Category;

export default function Filters() {
  const [technologiesOpened, { toggle: technologiesToggle }] = useDisclosure(true);
  const [categoriesOpened, { toggle: categoriesToggle }] = useDisclosure(false);
  const [filtersOpened, { open: openFilters, close: closeFilters }] = useDisclosure(false);

  const {
    filters: { by_technology, by_category },
    setTechnologies,
    setCategories,
    hasFilters,
    clearFilters,
  } = useJobOffers();

  const updateTechnologies = (technology: string) => {
    const newTechnologies = by_technology.includes(technology)
      ? by_technology.filter((item) => item !== technology)
      : [...by_technology, technology];

    setTechnologies(newTechnologies);
  };

  const updateCategories = (category: string) => {
    const newCategories = by_category.includes(category)
      ? by_category.filter((item) => item !== category)
      : [...by_category, category];

    setCategories(newCategories);
  };

  const getTechnologiesQuery = useQuery({
    queryKey: ['technologies'],
    queryFn: getTechnologies,
  });

  const getCategoriesQuery = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

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
              {hasFilters() && (
                <Button color="gray" size="compact-xs" variant="outline" onClick={clearFilters}>
                  Clear all
                </Button>
              )}
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
              {getCategoriesQuery.isLoading ? (
                <div className={s.groupLoading}>
                  <Loader color="blue" />
                </div>
              ) : (
                <ScrollArea h={300} offsetScrollbars>
                  <Box className={s.groupList}>
                    {getCategoriesQuery.data.map((category: Category) => (
                      <Checkbox
                        key={category.id}
                        label={category.label}
                        value={category.name}
                        checked={by_category.includes(category.name)}
                        onChange={() => updateCategories(category.name)}
                      />
                    ))}
                  </Box>
                </ScrollArea>
              )}
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
              {getTechnologiesQuery.isLoading ? (
                <div className={s.groupLoading}>
                  <Loader color="blue" />
                </div>
              ) : (
                <ScrollArea h={300} offsetScrollbars>
                  <Box className={s.groupList}>
                    {getTechnologiesQuery.data.map((technology: Technology) => (
                      <Checkbox
                        key={technology.id}
                        label={technology.label}
                        value={technology.name}
                        checked={by_technology.includes(technology.name)}
                        onChange={() => updateTechnologies(technology.name)}
                      />
                    ))}
                  </Box>
                </ScrollArea>
              )}
            </div>
          </Collapse>
        </div>
      </div>
    </>
  );
}
