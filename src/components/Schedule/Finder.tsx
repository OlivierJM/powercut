import { useCallback, useMemo, useState } from 'react';
import { ActionIcon, Autocomplete, Button, Center, Container, Text } from '@mantine/core';
import { IconX } from '@tabler/icons-react';
import { isBefore, startOfToday } from 'date-fns';
import ScheduleCard from './ScheduleCard';
import { ScheduleCardProps } from '@/types';
import areas from '@/data/areas.json';
import schedules from '@/data/schedule.json';

const Finder = () => {
  const [area, setArea] = useState('');
  const [currentProvince, setCurrentProvince] = useState('');
  const [upcomingSchedules, setUpcomingSchedules] = useState<ScheduleCardProps['data'][]>([]);

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

  return (
    <Container my={40} p={2}>
      <Autocomplete
        placeholder="Search for an area..."
        data-umami-event="search-area"
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
      <Center mb="md">
        <Button disabled={!area} data-umami-event={`${area.toLowerCase()}`} onClick={findSchedule}>
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
