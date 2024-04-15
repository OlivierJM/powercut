import { Title, Text, Center } from '@mantine/core';
import classes from './Welcome.module.css';
import { ColorSchemeToggle } from '../ColorSchemeToggle/ColorSchemeToggle';

export function Welcome() {
  return (
    <>
      <Title order={4} className={classes.title} ta="center" mt={70} mb={50}>
        <Text
          size="lg"
          inherit
          variant="gradient"
          component="span"
          gradient={{ from: 'pink', to: 'yellow' }}
        >
          Powercut
        </Text>
      </Title>
      <Center>
        <ColorSchemeToggle />
      </Center>
      {/* <Text c="dimmed" ta="center" size="lg" maw={580} mx="auto" mt="xl" p={10}>
        Easily track load shedding schedules in your area or elsewhere.
      </Text> */}
      <br />
      <Title order={3}>
        <Text c="dimmed" ta="center" size="xl" mx="auto" mt="xl" p={10}>
          Kindly note that the schedule has changed. Please check back later.
        </Text>
      </Title>
    </>
  );
}
