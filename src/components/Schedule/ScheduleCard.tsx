import { Card, Text, Badge, Group, useMantineTheme } from '@mantine/core';
import { isWithinInterval } from 'date-fns';
import { createTimeFromDate, remainingTime, removeProvince, toTitleCase } from '@/utils';
import { ScheduleCardProps } from '@/types';

const ScheduleCard = ({ data, province }: ScheduleCardProps) => {
  const theme = useMantineTheme();
  const currentDate = new Date();
  const scheduleStartDate = createTimeFromDate(data?.startTime, data?.date);
  const scheduleEndDate = createTimeFromDate(data?.endTime, data?.date);

  const isCurrentlyShedding = isWithinInterval(currentDate, {
    start: scheduleStartDate,
    end: scheduleEndDate,
  });

  const timeToGo = remainingTime(scheduleStartDate, currentDate);
  return (
    <Card shadow="sm" padding="lg" radius="md" mb={10}>
      <Group style={{ marginBottom: 5, marginTop: theme.spacing.sm }}>
        <Text data-testid="area-province">{`${toTitleCase(data?.area)} - ${removeProvince(province)}`}</Text>
        <Badge color={isCurrentlyShedding ? 'red' : timeToGo.color} variant="light" data-testid="schedule-date">
          {data?.date}
        </Badge>
      </Group>

      <Text size="sm" style={{ marginBottom: 5 }} data-testid="start-time">
        Start Time: {data?.startTime}
      </Text>
      <Text size="sm" style={{ marginBottom: 5 }}>
        End Time: {data?.endTime}
      </Text>

      <Badge color={isCurrentlyShedding ? 'red' : timeToGo.color} variant="light" size="lg">
        {isCurrentlyShedding ? 'Load Shedding Currently In Progress' : timeToGo.text}
      </Badge>
    </Card>
  );
};

export default ScheduleCard;
