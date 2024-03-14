import { Card, Text, Badge, Group, useMantineTheme } from '@mantine/core';
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  isWithinInterval,
  setHours,
  setMinutes,
} from 'date-fns';

// TODO: Reuse these type
interface ScheduleCardProps {
  data: {
    group: string;
    date: string;
    startTime: string;
    endTime: string;
    area: string;
  };
  province: string;
}

// TODO: Move this into its own file
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

// TODO: Move this into its own file
const remainingTime = (scheduleStartDate: Date, currentDate: Date) => {
  const remainingDays = differenceInDays(scheduleStartDate, currentDate);
  const remainingHours = differenceInHours(scheduleStartDate, currentDate) % 24;
  const remainingMinutes = differenceInMinutes(scheduleStartDate, currentDate) % 60;

  if (remainingDays < 0 || remainingHours < 0 || remainingMinutes < 0) {
    return {
      text: 'No other Load shedding expected today.',
      color: 'teal',
    };
  }
  if (remainingDays > 0) {
    return {
      text: `Will start in approximately ${remainingDays} day(s)`,
      color: 'teal',
    };
  }
  if (remainingHours > 0) {
    return {
      text: `Will start in approximately ${remainingHours} hour(s)`,
      color: remainingHours < 3 ? 'orange' : 'teal',
    };
  }
  return {
    text: `Starts in approximately ${remainingMinutes} minute(s)`,
    color: remainingMinutes < 30 ? 'red' : 'teal',
  };
};

function removeProvince(text: string) {
    return text.replace(/\sProvince$/, '');
}

function toTitleCase(text: string) {
    return text.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
}

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
        <Text>{`${toTitleCase(data?.area)} - ${removeProvince(province)}`}</Text>
        <Badge color={isCurrentlyShedding ? 'red' : timeToGo.color} variant="light">
          {data?.date}
        </Badge>
      </Group>

      <Text size="sm" style={{ marginBottom: 5 }}>
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
