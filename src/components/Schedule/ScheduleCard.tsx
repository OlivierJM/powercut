import React from 'react';
import { Card, Text, Badge, Group, useMantineTheme } from '@mantine/core';
import { format, isWithinInterval } from 'date-fns';

interface ScheduleCardProps {
  data: {
    group: string;
    date: string;
    startTime: string;
    endTime: string;
  };
}

const ScheduleCard = ({ data }: ScheduleCardProps) => {
    // const { group, date, startTime, endTime } = data;

  const theme = useMantineTheme();
  const currentDate = new Date();
  const scheduleStartDate = new Date(`${data?.date}T${data?.startTime}:00`);
  const scheduleEndDate = new Date(`${data?.date}T${data?.endTime}:00`);
  const isCurrentlyShedding = isWithinInterval(currentDate, {
    start: scheduleStartDate,
    end: scheduleEndDate,
  });

// const isCurrentlyShedding = true;

  console.log(data);
  return (
    <Card
      shadow="sm"
      padding="lg"
      //   style={{ backgroundColor: isCurrentlyShedding ? theme.colors.red[1] : theme.colors.gray[0] }}
    >
      <Group style={{ marginBottom: 5, marginTop: theme.spacing.sm }}>
        <Text>Group {data?.group}</Text>
        <Badge color="pink" variant="light">
          {(data?.date)}
        </Badge>
      </Group>

      <Text size="sm" style={{ marginBottom: 5 }}>
        Start Time: {data?.startTime}
      </Text>
      <Text size="sm" style={{ marginBottom: 5 }}>
        End Time: {data?.endTime}
      </Text>

      {isCurrentlyShedding && (
        <Badge color="red" variant="filled" size="lg">
          Load Shedding Currently In Progress
        </Badge>
      )}
    </Card>
  );
};

export default ScheduleCard;
