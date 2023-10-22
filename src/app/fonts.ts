import { Inter, Roboto_Mono } from 'next/font/google';
import localFont from 'next/font/local';

export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
});

export const oenosRegular = localFont({
  src: '../fonts/oenos-regular.woff',
  variable: '--font-oenos-regular',
  weight: '400',
});

export const oenosBold = localFont({
  src: '../fonts/oenos-bold.woff',
  variable: '--font-oenos-bold',
  display: 'swap',
  weight: '700',
});
