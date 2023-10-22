'use client';

import { useState } from 'react';
import { Input, InputBase, Combobox, useCombobox, VisuallyHidden } from '@mantine/core';

const sortingOptions = ['Newest', 'Oldest', 'Highest salary', 'Lowest salary'];

import { SegmentedControl } from '@mantine/core';

import { useJobOffersStore } from '@/store/jobOffers';

import { IconEye, IconCode, IconExternalLink, IconLayoutList, IconLayoutGrid } from '@tabler/icons-react';

import s from './Header.module.scss';

const employmentOptions = [
  {
    label: 'B2B',
    value: 'b2b',
  },
  {
    label: 'UoP',
    value: 'uop',
  },
];

const viewOptions = [
  {
    value: 'preview',
    label: (
      <>
        <IconLayoutGrid size="12" />
        <VisuallyHidden>Preview</VisuallyHidden>
      </>
    ),
  },
  {
    value: 'code',
    label: (
      <>
        <IconLayoutList size="12" />
        <VisuallyHidden>Code</VisuallyHidden>
      </>
    ),
  },
];

export default function Header() {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: (eventSource) => {
      if (eventSource === 'keyboard') {
        combobox.selectActiveOption();
      } else {
        combobox.updateSelectedOptionIndex('active');
      }
    },
  });

  const [value, setValue] = useState<string | null>(sortingOptions[0]);

  const options = sortingOptions.map((item) => (
    <Combobox.Option value={item} key={item}>
      {item}
    </Combobox.Option>
  ));

  const employmentType = useJobOffersStore((state) => state.employmentType);
  const setEmploymentType = useJobOffersStore((state) => state.setEmploymentType);

  return (
    <header className={s.header}>
      <div className={s.headerLeft}>
        <Combobox
          store={combobox}
          onOptionSubmit={(val) => {
            setValue(val);
            combobox.closeDropdown();
          }}
        >
          <Combobox.Target>
            <InputBase
              size="xs"
              component="button"
              pointer
              rightSection={<Combobox.Chevron />}
              onClick={() => combobox.toggleDropdown()}
              className={s.sort}
            >
              {value || <Input.Placeholder>Pick value</Input.Placeholder>}
            </InputBase>
          </Combobox.Target>

          <Combobox.Dropdown>
            <Combobox.Options>{options}</Combobox.Options>
          </Combobox.Dropdown>
        </Combobox>
      </div>
      <div className={s.headerRight}>
        <SegmentedControl value={employmentType} onChange={setEmploymentType} data={employmentOptions} />
        <SegmentedControl data={viewOptions} />
      </div>
    </header>
  );
}
