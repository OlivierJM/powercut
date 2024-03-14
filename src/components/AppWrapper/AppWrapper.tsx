import { AppShell } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Header } from './Header';

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { desktop: true, mobile: !opened } }}
      padding="md"
    >
      <Header opened={opened} onToggle={toggle} />
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
