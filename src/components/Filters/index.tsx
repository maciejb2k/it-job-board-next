'use client';

import {
  Button,
  Collapse,
  Modal,
  Checkbox,
  Loader,
  ScrollArea,
  Box,
  RangeSlider,
  Group,
  Input,
  Space,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronRight, IconChevronUp, IconAdjustments, IconX } from '@tabler/icons-react';

import s from './styles.module.scss';
import { SeniorityTypes, useJobOffers } from '@/providers/JobOffersContext';
import { useQuery } from '@tanstack/react-query';
import { getCategories, getTechnologies } from '@/services/jobOffersService';
import { useState } from 'react';

type Category = {
  name: string;
  label: string;
  id: string;
};

type Technology = Category;

type SeniortyOptions = Array<{
  value: SeniorityTypes;
  label: string;
}>;

const seniorityOptions: SeniortyOptions = [
  {
    value: 1,
    label: 'Junior',
  },
  {
    value: 2,
    label: 'Mid',
  },
  {
    value: 3,
    label: 'Senior',
  },
  {
    value: 4,
    label: 'Principal',
  },
];

export default function Filters() {
  const {
    filters: {
      technologies,
      categories,
      seniorities,
      salary: { from, to },
    },
    setTechnologies,
    setCategories,
    setSeniorities,
    setSalary,
    hasFilters,
    clearFilters,
    hasFilter,
    clearFilter,
  } = useJobOffers();

  const [filtersOpened, { open: openFilters, close: closeFilters }] = useDisclosure(false);
  const [categoriesOpened, { toggle: categoriesToggle }] = useDisclosure(false);
  const [technologiesOpened, { toggle: technologiesToggle }] = useDisclosure(true);
  const [salaryOpened, { toggle: salaryToggle }] = useDisclosure(true);
  const [seniorityOpened, { toggle: seniorityToggle }] = useDisclosure(true);

  const [salaryFrom, setSalaryFrom] = useState(from || 0);
  const [salaryTo, setSalaryTo] = useState(to || 50000);

  const applySalaryFilter = () => {
    setSalary({ from: salaryFrom, to: salaryTo });
  };

  const updateTechnologies = (technology: string) => {
    const newTechnologies = technologies.includes(technology)
      ? technologies.filter((item) => item !== technology)
      : [...technologies, technology];

    setTechnologies(newTechnologies);
  };

  const updateCategories = (category: string) => {
    const newCategories = categories.includes(category)
      ? categories.filter((item) => item !== category)
      : [...categories, category];

    setCategories(newCategories);
  };

  const updateSeniorities = (seniority: SeniorityTypes) => {
    const newSeniorities = seniorities.includes(seniority)
      ? seniorities.filter((item) => item !== seniority)
      : [...seniorities, seniority];

    setSeniorities(newSeniorities);
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
          <header className={s.groupHeader}>
            <div className={s.groupLeft}>
              <h2 className={s.groupTitle}>Categories</h2>
              {hasFilter('categories') && (
                <Button color="red" size="compact-xs" variant="outline" onClick={() => clearFilter('categories')}>
                  <IconX size={14} />
                </Button>
              )}
            </div>
            <div className={s.groupButtons}>
              <Button size="compact-sm" variant="transparent" className={s.groupButton} onClick={categoriesToggle}>
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
                        checked={categories.includes(category.name)}
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
          <header className={s.groupHeader}>
            <div className={s.groupLeft}>
              <h2 className={s.groupTitle}>Technologies</h2>
              {hasFilter('technologies') && (
                <Button color="red" size="compact-xs" variant="outline" onClick={() => clearFilter('technologies')}>
                  <IconX size={14} />
                </Button>
              )}
            </div>
            <div className={s.groupButtons}>
              <Button size="compact-sm" variant="transparent" className={s.groupButton} onClick={technologiesToggle}>
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
                        checked={technologies.includes(technology.name)}
                        onChange={() => updateTechnologies(technology.name)}
                      />
                    ))}
                  </Box>
                </ScrollArea>
              )}
            </div>
          </Collapse>
        </div>
        <div className={s.group}>
          <header className={s.groupHeader}>
            <div className={s.groupLeft}>
              <h2 className={s.groupTitle}>Salary</h2>
              {hasFilter('salary') && (
                <Button color="red" size="compact-xs" variant="outline" onClick={() => clearFilter('salary')}>
                  <IconX size={14} />
                </Button>
              )}
            </div>
            <div className={s.groupButtons}>
              <Button size="compact-sm" variant="transparent" className={s.groupButton} onClick={salaryToggle}>
                <IconChevronUp className={`${s.groupToggleIcon} ${salaryOpened ? s.groupToggleIconOpened : ''}`} />
              </Button>
            </div>
          </header>
          <Collapse in={salaryOpened}>
            <div className={s.groupContent}>
              <Group grow>
                <Input.Wrapper label="From" size="xs">
                  <Input
                    size="xs"
                    value={salaryFrom}
                    onChange={(event) => setSalaryFrom(Number(event.currentTarget.value))}
                  ></Input>
                </Input.Wrapper>
                <Input.Wrapper label="To" size="xs">
                  <Input
                    size="xs"
                    value={salaryTo}
                    onChange={(event) => setSalaryTo(Number(event.currentTarget.value))}
                  ></Input>
                </Input.Wrapper>
              </Group>
              <Space h="sm" />
              <RangeSlider
                value={[salaryFrom, salaryTo]}
                onChange={(range) => {
                  setSalaryFrom(range[0]);
                  setSalaryTo(range[1]);
                }}
                min={0}
                max={50000}
              />
              <Space h="sm" />
              <Button onClick={applySalaryFilter}>Apply</Button>
            </div>
          </Collapse>
        </div>
        <div className={s.group}>
          <header className={s.groupHeader}>
            <div className={s.groupLeft}>
              <h2 className={s.groupTitle}>Seniority</h2>
              {hasFilter('seniorities') && (
                <Button color="red" size="compact-xs" variant="outline" onClick={() => clearFilter('seniorities')}>
                  <IconX size={14} />
                </Button>
              )}
            </div>
            <div className={s.groupButtons}>
              <Button size="compact-sm" variant="transparent" className={s.groupButton} onClick={seniorityToggle}>
                <IconChevronUp className={`${s.groupToggleIcon} ${seniorityOpened ? s.groupToggleIconOpened : ''}`} />
              </Button>
            </div>
          </header>
          <Collapse in={seniorityOpened}>
            <div className={s.groupContent}>
              <Box className={s.groupList}>
                {seniorityOptions.map((option) => (
                  <Checkbox
                    key={option.value}
                    label={option.label}
                    value={option.value}
                    checked={seniorities.includes(option.value)}
                    onChange={() => updateSeniorities(option.value)}
                  />
                ))}
              </Box>
            </div>
          </Collapse>
        </div>
      </div>
    </>
  );
}
