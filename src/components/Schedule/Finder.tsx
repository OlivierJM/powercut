import { Autocomplete, Button, ActionIcon, Container, Text, Center, Flex } from '@mantine/core';
import { IconX } from '@tabler/icons-react';
import ScheduleCard from './ScheduleCard';
import RecentSearchTab from '../RecentSearch/RecentSearch';
import { useFinder } from './useFinder';
import RandomQuote from '../RandomQuote/RandomQuote';

const Finder = () => {
  const {
    area,
    setArea,
    currentProvince,
    upcomingSchedules,
    recentSearches,
    allAreas,
    findSchedule,
    onOptionSelect,
    onTabBtnDelete,
    handleRecentSearches,
    setUpcomingSchedules,
  } = useFinder();

  return (
    <Container my={40} p={2}>
      <Autocomplete
        placeholder="Search for an area..."
        data={allAreas}
        value={area}
        onChange={(value) => {
          setArea(value);
          setUpcomingSchedules([]);
        }}
        rightSectionPointerEvents="all"
        rightSection={
          Boolean(area) && (
            <ActionIcon
              variant="transparent"
              size="sm"
              aria-label="clear-area"
              onClick={() => {
                setArea('');
                setUpcomingSchedules([]);
              }}
            >
              <IconX style={{ width: '70%', height: '70%' }} />
            </ActionIcon>
          )
        }
        size="md"
        mb="md"
      />
      {recentSearches && (
        <Flex
          mih={50}
          gap="xs"
          justify="center"
          align="center"
          direction="row"
          wrap="wrap"
          style={{
            marginBottom: '10px',
          }}
        >
          {recentSearches.split('|').map((place) => (
            <RecentSearchTab
              key={place}
              onTabSelect={onOptionSelect}
              onTabDelete={onTabBtnDelete}
              place={place}
            />
          ))}
        </Flex>
      )}

      <Center mb="md">
        <Button
          disabled={!area}
          onClick={() => {
            handleRecentSearches();
            findSchedule(area);
          }}
        >
          Find Schedule
        </Button>
      </Center>

      {upcomingSchedules.length && area
        ? upcomingSchedules.map((schedule, index) => (
            <ScheduleCard key={index} data={schedule} province={currentProvince} />
          ))
        : null}
      <RandomQuote />
      <br />
      <Text size="sm" mt={10} ta="center" c="dimmed">
        Disclaimer: This schedule may not be 100% accurate.
      </Text>

      <br />
      <Text c="dimmed" ta="center" size="lg">
        Made with ♥ by OlivierJM
      </Text>
    </Container>
  );
};

export default Finder;
