import { Card, Text, Badge, Group, useMantineTheme, Stack } from '@mantine/core';
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
          {data?.date}
        </Badge>
      </Group>
      <Stack gap="xs">
        <Text size="sm" style={{ marginBottom: 1 }} data-testid="start-time">
          Start Time: {data?.startTime}
        </Text>
        <Text size="sm" style={{ marginBottom: 1 }}>
          End Time: {data?.endTime}
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
    </Card>
  );
};

export default ScheduleCard;
