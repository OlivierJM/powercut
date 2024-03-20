import { useState, useMemo, useCallback } from 'react';
import { Autocomplete, Button, ActionIcon, Container, Text, Center, Grid, Flex } from '@mantine/core';
import { startOfToday, isBefore } from 'date-fns';
import { IconX } from '@tabler/icons-react';
import areas from '@/data/areas.json';
import schedules from '@/data/schedule.json';
import ScheduleCard from './ScheduleCard';
import { ScheduleCardProps } from '@/types';
import RecentSearch from '../RecentSearch/RecentSearch';
import RecentSearchTab from '../RecentSearch/RecentSearch';
import Cookies from 'js-cookie';
import { COOKIE_EXPIRY_DAYS, COOKIE_SEARCH_KEY, MAX_RECENT_AREAS_NO } from '../../constants'

const Finder = () => {
  const [area, setArea] = useState('');
  const [currentProvince, setCurrentProvince] = useState('');
  const [upcomingSchedules, setUpcomingSchedules] = useState<ScheduleCardProps['data'][]>([]);
  const [recentSearches, setRecentSearches] = useState(Cookies.get(COOKIE_SEARCH_KEY) ? Cookies.get(COOKIE_SEARCH_KEY) : "");
  console.log(recentSearches);

  const allAreas = useMemo(() => {
    const allAreasList = [] as string[];
    Object.values(areas).forEach((groups) => {
      Object.values(groups).forEach((areaList) => {
        allAreasList.push(...areaList);
      });
    });
    return [...new Set(allAreasList)].sort();
  }, []);

  const findSchedule = useCallback(() => {
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
      .filter((sch) => !isBefore(sch.Date, startOfCurrentDay))
      .map((sch) => ({
        group: sch.Group,
        date: sch.Date,
        startTime: sch['Start Time'],
        endTime: sch['End Time'],
        area,
      }));

    setUpcomingSchedules(filteredSchedules);
    setCurrentProvince(provArea[0]);
  }, [area]);

  const onOptionSelect = (place: string) => {
    console.log('inside selevt', place);

    if (place !== area) {
      setArea(place);
      setUpcomingSchedules([]);
      findSchedule();
    }
  }

  const onTabBtnDelete = (place: string) => {
    console.log(place);
    const recentAreas = recentSearches?.split("|");
    console.log(recentAreas);
    const indexToRemove = recentAreas?.indexOf(place)

    if (indexToRemove !== undefined && indexToRemove > -1) {
      recentAreas?.splice(indexToRemove, 1);
    }
    const updatedAreas = recentAreas?.join("|") || "";
    setRecentSearches(updatedAreas);
    Cookies.set(COOKIE_SEARCH_KEY, updatedAreas, { expires: COOKIE_EXPIRY_DAYS });

  }

  const setRecentSearchesLogic = () => {
    console.log("______________________________");

    let searchedAreas = recentSearches?.split("|") || [];
    const isSearchedAlready = searchedAreas?.includes(area);
    console.log(searchedAreas);

    const newArea = isSearchedAlready ? '' : area;
    if (newArea) {
      if (searchedAreas?.length == MAX_RECENT_AREAS_NO) {
        console.log('inside log');
        searchedAreas = searchedAreas.slice(1, searchedAreas.length)
        console.log(searchedAreas.slice(0, 1));
        console.log(searchedAreas);

      }
      const areas = searchedAreas?.join("|");
      console.log(areas);

      const updatedAreas = areas ? `${areas}|${newArea}` : newArea;
      console.log('updated area', updatedAreas);

      setRecentSearches(updatedAreas);
      Cookies.set(COOKIE_SEARCH_KEY, updatedAreas, { expires: COOKIE_EXPIRY_DAYS });
    }

  }

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
          marginBottom: '10px'
        }}
      >
        {
          recentSearches && recentSearches.split("|").map((place) =>
            <RecentSearchTab onTabSelect={onOptionSelect} onTabDelete={onTabBtnDelete} place={place} />
          )
        }
      </Flex>
      <Center mb="md">
        <Button
          disabled={!area}
          data-umami-event={`${area.toLowerCase()}`}
          onClick={() => {
            setRecentSearchesLogic();
            findSchedule();
          }}>
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
