import React, { useState, useMemo } from 'react';
import { Autocomplete, Button, Select, Container, Title, Group } from '@mantine/core';
import areas from '../../data/areas.json';
import schedules from '../../data/schedule.json';
import ScheduleCard from './ScheduleCard';

const Finder = () => {
  const [province, setProvince] = useState('');
  const [area, setArea] = useState('');
  const [selectedSchedule, setSelectedSchedule] = useState(null);

  // Memoize areas list to avoid recalculating on every render
  const allAreas = useMemo(() => {
    const allAreasList = [];
    Object.values(areas).forEach((groups) => {
      Object.values(groups).forEach((areaList) => {
        allAreasList.push(...areaList);
      });
    });
    return [...new Set(allAreasList)].sort();
  }, []);

  // Memoize provinces list to avoid recalculating on every render
  const provincesList = useMemo(() => Object.keys(areas), []);

  const findSchedule = () => {
    let foundGroup = '';

    // Find the province and group
    const provArea = Object.entries(areas).find(([_, groups]) =>
      Object.entries(groups).find(([group, ars]) => {
        if (ars.includes(area)) {
          foundGroup = group;
          return true;
        }
        return false;
      })
    );

    // Find the schedule for the area's group within the selected province
    const scheduleForArea = schedules
      .find((s) => s.Province === province)
      ?.Schedules.find((sch) => sch.Group === foundGroup.split(' ')[1]);

    setSelectedSchedule(
      scheduleForArea
        ? {
            group: scheduleForArea?.Group,
            date: scheduleForArea?.Date,
            startTime: scheduleForArea?.['Start Time'],
            endTime: scheduleForArea?.['End Time'],
          }
        : null
    );
  };

  return (
    <Container my={40}>
      <Title align="center" mb="md">
        Find Load Shedding Schedule
      </Title>
      <Select
        label="Select Province"
        placeholder="Province"
        data={provincesList}
        value={province}
        onChange={setProvince}
        searchable
        clearable
        mb="md"
      />
      <Autocomplete
        label="Search for an area"
        placeholder="Type to search..."
        data={allAreas}
        value={area}
        onChange={setArea}
        mb="md"
      />
      <Group position="right" mb="md">
        <Button onClick={findSchedule}>Find Schedule</Button>
      </Group>
      {selectedSchedule && <ScheduleCard data={selectedSchedule} />}
    </Container>
  );
};

export default Finder;
