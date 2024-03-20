import { useState, useMemo, useCallback } from 'react';
import { Autocomplete, Button, ActionIcon, Container, Text, Center, Flex } from '@mantine/core';
import { startOfToday, isBefore } from 'date-fns';
import { IconX } from '@tabler/icons-react';
import ScheduleCard from './ScheduleCard';
import { ScheduleCardProps } from '@/types';
import areas from '@/data/areas.json';
import schedules from '@/data/schedule.json';
import RecentSearchTab from '../RecentSearch/RecentSearch';
import { COOKIE_EXPIRY_DAYS, COOKIE_SEARCH_KEY, MAX_RECENT_AREAS_NO } from '../../constants';
import useCookie from '../../hooks/useCookie';

const Finder = () => {
  const [area, setArea] = useState('');
  const [currentProvince, setCurrentProvince] = useState('');
  const [upcomingSchedules, setUpcomingSchedules] = useState<ScheduleCardProps['data'][]>([]);
  const [cookie, setCookie] = useCookie(COOKIE_SEARCH_KEY);
  const [recentSearches, setRecentSearches] = useState(cookie);

  const allAreas = useMemo(() => {
    const allAreasList = [] as string[];
    Object.values(areas).forEach((groups) => {
      Object.values(groups).forEach((areaList) => {
        allAreasList.push(...areaList);
      });
    });
    return [...new Set(allAreasList)].sort();
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const findSchedule = useCallback((area: string) => {
    let foundGroup = '';

    // Find the province and group
    const provArea = Object.entries(areas).find(([, groups]) =>
      Object.entries(groups).some(([group, ars]) => {
        if (ars.includes(area)) {
          foundGroup = group;
          return true;
        }
        return false;
      })
    );

    if (!provArea) {
      setUpcomingSchedules([]);
      return;
    }

    const provinceSchedules = schedules.find((s) => s.Province === provArea[0])?.Schedules;
    if (!provinceSchedules) {
      setUpcomingSchedules([]);
      return;
    }

    const startOfCurrentDay = startOfToday();
    const filteredSchedules = provinceSchedules
      .filter((sch) => sch.Group === foundGroup.split(' ')[1])
      .filter(
        (sch) =>
          !isBefore(new Date(sch.Start), startOfCurrentDay) ||
          !isBefore(new Date(sch.End), new Date())
      )
      .map((sch) => ({
        group: sch.Group,
        startDate: new Date(sch.Start).toISOString(),
        endDate: new Date(sch.End).toISOString(),
        area,
      }));

    setUpcomingSchedules(filteredSchedules);
    setCurrentProvince(provArea[0]);
  }, [area]);

  const onOptionSelect = async (place: string) => {
    if (place !== area) {
      setArea(place);
      setUpcomingSchedules([]);
      findSchedule(place);
    }
  };

  const onTabBtnDelete = (place: string) => {
    const recentAreas = recentSearches?.split('|');
    const indexToRemove = recentAreas?.indexOf(place);

    if (indexToRemove !== undefined && indexToRemove > -1) {
      recentAreas?.splice(indexToRemove, 1);
    }
    const updatedAreas = recentAreas?.join('|') || '';
    setRecentSearches(updatedAreas);
    setCookie(updatedAreas, COOKIE_EXPIRY_DAYS);
  };

  const setRecentSearchesLogic = () => {
    let searchedAreas = recentSearches?.split('|') || [];
    const isSearchedAlready = searchedAreas?.includes(area);
    const newArea = isSearchedAlready ? '' : area;
    if (newArea) {
      if (searchedAreas?.length === MAX_RECENT_AREAS_NO) {
        searchedAreas = searchedAreas.slice(1, searchedAreas.length);
      }
      const joinedArea = searchedAreas?.join('|');
      const updatedAreas = joinedArea ? `${areas}|${newArea}` : newArea;
      setRecentSearches(updatedAreas);
      setCookie(updatedAreas, COOKIE_EXPIRY_DAYS);
    }
  };

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
      <Flex
        mih={50}
        gap="xs"
        justify="flex-start"
        align="center"
        direction="row"
        wrap="wrap"
        style={{
          marginBottom: '10px',
        }}
      >
        {
          recentSearches && recentSearches.split('|').map((place) =>
            <RecentSearchTab
              key={place}
              onTabSelect={onOptionSelect}
              onTabDelete={onTabBtnDelete}
              place={place}
            />
          )
        }
      </Flex>
      <Center mb="md">
        <Button
          disabled={!area}
          data-umami-event={`${area.toLowerCase()}`}
          onClick={() => {
            setRecentSearchesLogic();
            findSchedule(area);
          }}
        >
          Find Schedule
        </Button>
      </Center>
      <br />

      {upcomingSchedules.length && area
        ? upcomingSchedules.map((schedule, index) => (
          <ScheduleCard key={index} data={schedule} province={currentProvince} />
        ))
        : null}

      <Text size="sm" mt={10} ta="center" c="dimmed">
        Disclaimer: The schedule used here is{' '}
        <a href="https://www.zesco.co.zm/assets/LoadManagement/ZESCO_8_hr_Loadshedding%20_Schedule_final.pdf">
          prepared by Zesco
        </a>
        {'  '}and may not be 100% accurate.
      </Text>

      <br />
      <Text c="dimmed" ta="center" size="lg">
        Made with ♥ by OlivierJM
      </Text>
    </Container>
  );
};

export default Finder;
