import { useState, useMemo, useCallback } from 'react';
import { Autocomplete, Button, ActionIcon, Container, Title, Group } from '@mantine/core';
import { startOfToday, isBefore } from 'date-fns';
import { Cross1Icon } from '@radix-ui/react-icons';
import areas from '../../data/areas.json';
import schedules from '../../data/schedule.json';
import ScheduleCard from './ScheduleCard';

interface ScheduleTypes {
  group: string;
  date: string;
  startTime: string;
  endTime: string;
}

const Finder = () => {
  const [area, setArea] = useState('');
  const [upcomingSchedules, setUpcomingSchedules] = useState<ScheduleTypes[]>([]);

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
      .filter((sch) =>
         !isBefore(sch.Date, startOfCurrentDay)
    )
    .map((sch) => ({
        group: sch.Group,
        date: sch.Date,
        startTime: sch['Start Time'],
        endTime: sch['End Time'],
    }));

    setUpcomingSchedules(filteredSchedules);
  }, [area]);

  return (
    <Container size={600} my={40}>
      <Title mb="md">Find Load Shedding Schedule</Title>
      <Autocomplete
        placeholder="Search for an area..."
        data={allAreas}
        value={area}
        onChange={setArea}
        rightSectionPointerEvents="all"
        rightSection={
          <ActionIcon
            variant="transparent"
            size="sm"
            aria-label="clear-area"
            onClick={() => setArea('')}
          >
            <Cross1Icon style={{ width: '70%', height: '70%' }} />
          </ActionIcon>
        }
        size="md"
        mb="md"
      />
      <Group mb="md">
        <Button onClick={findSchedule}>Find Schedule</Button>
      </Group>
      <br />
      {upcomingSchedules.length ? upcomingSchedules.map((schedule, index) => (
        <ScheduleCard key={index} data={schedule} area={area} />
      )) : area && 'No upcoming schedules found for this area'}
    </Container>
  );
};

export default Finder;
