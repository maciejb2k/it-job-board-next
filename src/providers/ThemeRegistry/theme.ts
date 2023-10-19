'use client';

import { createTheme, MantineColorsTuple } from '@mantine/core';
import { inter } from '@/app/fonts';

const myColor: MantineColorsTuple = [
  '#f0f0ff',
  '#dfdef4',
  '#bcbbe1',
  '#9695cf',
  '#7675bf',
  '#6260b6',
  '#5856b2',
  '#49479d',
  '#403f8d',
  '#35357e',
];

const theme = createTheme({
  fontFamily: inter.style.fontFamily,
  primaryColor: 'main',
  colors: {
    main: myColor,
  },
});

export default theme;
