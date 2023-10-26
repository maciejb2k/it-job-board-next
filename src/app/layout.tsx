import '@mantine/core/styles.css';

import type { Metadata } from 'next';
import { ColorSchemeScript } from '@mantine/core';

import { inter, oenosBold, oenosRegular, roboto_mono } from './fonts';
import ThemeRegistry from '@/providers/ThemeRegistry';

import '@/css/app.scss';
import 'devicon/devicon.min.css';
import Header from '@/components/Header';
import QueryProvider from '@/providers/QueryProvider';

export const metadata: Metadata = {
  title: 'IT job board',
  description: 'Find your dream job as a software engineer!',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body className={[inter.variable, oenosBold.variable, oenosRegular.variable, roboto_mono.variable].join(' ')}>
        <ThemeRegistry>
          <QueryProvider>
            <Header />
            {children}
          </QueryProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
