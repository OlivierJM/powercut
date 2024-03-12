import { Card, Text, Badge, Group, useMantineTheme } from '@mantine/core';
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  isWithinInterval,
  setHours,
  setMinutes,
} from 'date-fns';

interface ScheduleCardProps {
  data: {
    group: string;
    date: string;
    startTime: string;
    endTime: string;
    area: string;
  };
}

const createTimeFromDate = (timeString: string, currentDate: string) => {
  if (!timeString) {
    return new Date();
  }
  const [hours, minutes] = timeString.split(':').map(Number);
  let date = new Date(currentDate);

  date = setHours(date, hours);
  date = setMinutes(date, minutes);

  return date;
};

const remainingTime = (scheduleStartDate: Date, currentDate: Date) => {
  const remainingDays = differenceInDays(scheduleStartDate, currentDate);
  const remainingHours = differenceInHours(scheduleStartDate, currentDate) % 24;
  const remainingMinutes = differenceInMinutes(scheduleStartDate, currentDate) % 60;

  if (remainingDays > 0) {
    return `Starts in approximately ${remainingDays} day(s)`;
  }
  if (remainingHours > 0) {
    return `Starts in approximately ${remainingHours} hour(s)`;
  }
  return `Starts in approximately ${remainingMinutes} minute(s)`;
};

const ScheduleCard = ({ data }: ScheduleCardProps) => {
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
        <Text>{data?.area}</Text>
        <Badge color={isCurrentlyShedding ? 'red' : 'teal'} variant="light">
          {data?.date}
        </Badge>
      </Group>

      <Text size="sm" style={{ marginBottom: 5 }}>
        Start Time: {data?.startTime}
      </Text>
      <Text size="sm" style={{ marginBottom: 5 }}>
        End Time: {data?.endTime}
      </Text>

      <Badge color={isCurrentlyShedding ? 'red' : 'teal'} variant="light" size="lg">
        {isCurrentlyShedding ? 'Load Shedding Currently In Progress' : timeToGo}
      </Badge>
    </Card>
  );
};

export default ScheduleCard;
