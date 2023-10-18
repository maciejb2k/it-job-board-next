import { MantineProvider } from "@mantine/core";
import theme from "./theme";

export default function ThemeRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MantineProvider theme={theme}>{children}</MantineProvider>;
}
