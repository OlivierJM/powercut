import { useEffect, useState } from 'react';
import {
  Badge,
  Button,
  Card,
  Group,
  Paper,
  Progress,
  Stack,
  Text,
  Transition,
  useMantineTheme,
} from '@mantine/core';
import { format, isWithinInterval } from 'date-fns';
import { ScheduleCardProps } from '@/types';
import {
  formatDay,
  remainingTime,
  remainingTimePercent,
  removeProvince,
  toTitleCase,
} from '@/utils';
import ScheduleCardProgess from './ScheduleCardProgress';

const ScheduleCard = ({ data, province }: ScheduleCardProps) => {
  const theme = useMantineTheme();
  const currentDate = new Date();
  const scheduleStartDate = new Date(data?.startDate);
  const scheduleEndDate = new Date(data?.endDate);

  const isCurrentlyShedding = isWithinInterval(currentDate, {
    start: scheduleStartDate,
    end: scheduleEndDate,
  });

  const timeToGo = remainingTime(scheduleStartDate, currentDate);
  const progressValue = remainingTimePercent(scheduleStartDate, scheduleEndDate);

  return (
    <Card shadow="sm" padding="lg" radius="md" mb={10}>
      <Group style={{ marginBottom: 10, marginTop: theme.spacing.sm }}>
        <Text data-testid="area-province">
          {`${toTitleCase(data?.area)} - ${removeProvince(province)}`}
        </Text>
        <Badge
          color={isCurrentlyShedding ? 'red' : timeToGo.color}
          variant="light"
          data-testid="schedule-date"
          size="lg"
        >
          {formatDay(scheduleStartDate)}
        </Badge>
      </Group>
      <Stack gap="xs">
        <Text size="sm" style={{ marginBottom: 1 }} data-testid="start-time">
          Start Time: {format(scheduleStartDate, 'HH:mm')}
        </Text>
        <Text size="sm" style={{ marginBottom: 1 }}>
          End Time: {format(scheduleEndDate, 'HH:mm')}
        </Text>
        <Badge
          color={isCurrentlyShedding ? 'red' : timeToGo.color}
          variant="light"
          size="lg"
          fullWidth
        >
          {isCurrentlyShedding ? 'Load Shedding In Progress' : timeToGo.text}
        </Badge>
      </Stack>
      {isCurrentlyShedding && <ScheduleCardProgess value={progressValue} />}
    </Card>
  );
};

export default ScheduleCard;
