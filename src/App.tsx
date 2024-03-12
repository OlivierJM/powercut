import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { Analytics } from '@vercel/analytics/react';
import { Router } from './Router';
import { theme } from './theme';

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <Router />
      <Analytics />
    </MantineProvider>
  );
}
