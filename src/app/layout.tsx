import type { Metadata } from "next";
import { ColorSchemeScript } from "@mantine/core";

import { inter, oenosBold, oenosRegular, roboto_mono } from "./fonts";
import ThemeRegistry from "@/providers/ThemeRegistry";

import "@mantine/core/styles.css";
import "@/css/app.scss";

export const metadata: Metadata = {
  title: "IT job board",
  description: "Find your dream job as a software engineer!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body
        className={[
          inter.variable,
          oenosBold.variable,
          oenosRegular.variable,
          roboto_mono.variable,
        ].join(" ")}
      >
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
