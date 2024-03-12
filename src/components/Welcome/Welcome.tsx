import { Title, Text, Center } from '@mantine/core';
import classes from './Welcome.module.css';
import { ColorSchemeToggle } from '../ColorSchemeToggle/ColorSchemeToggle';

export function Welcome() {
  return (
    <>
      <Title className={classes.title} ta="center" mt={100}>
        <Text inherit variant="gradient" component="span" gradient={{ from: 'pink', to: 'yellow' }}>
          Powercut
        </Text>
      </Title>
      <Center>
        <ColorSchemeToggle />
      </Center>
      <Text c="dimmed" ta="center" size="lg" maw={580} mx="auto" mt="xl">
        Easily track load shedding schedules in your area or elsewhere.
      </Text>
    </>
  );
}
