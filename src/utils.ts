import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  format,
  isToday,
  isTomorrow,
  isYesterday,
  setHours,
  setMinutes,
} from 'date-fns';

export const createTimeFromDate = (timeString: string, currentDate: string) => {
  if (!timeString) {
    return new Date();
  }
  const [hours, minutes] = timeString.split(':').map(Number);
  let date = new Date(currentDate);

  date = setHours(date, hours);
  date = setMinutes(date, minutes);

  return date;
};

export const remainingTime = (scheduleStartDate: Date, currentDate: Date) => {
  const remainingDays = differenceInDays(scheduleStartDate, currentDate);
  const remainingHours = differenceInHours(scheduleStartDate, currentDate) % 24;
  const remainingMinutes = differenceInMinutes(scheduleStartDate, currentDate) % 60;

  if (remainingDays < 0 || remainingHours < 0 || remainingMinutes < 0) {
    return {
      text: 'No more outages today',
      color: 'teal',
    };
  }
  if (remainingDays > 0) {
    return {
      text: `Starts in approximately ${remainingDays} day(s)`,
      color: 'teal',
    };
  }
  if (remainingHours > 0) {
    return {
      text: `Starts in approximately ${remainingHours} hour(s)`,
      color: remainingHours < 3 ? 'orange' : 'teal',
    };
  }
  return {
    text: `Starts in approximately ${remainingMinutes} minute(s)`,
    color: remainingMinutes < 30 ? 'red' : 'teal',
  };
};

export const removeProvince = (text: string) => text.replace(/\sProvince$/, '');

export const toTitleCase = (text: string) =>
  text.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());

export const formatDay = (date: Date): string => {
  if (isToday(date)) return 'Today';
  if (isTomorrow(date)) return 'Tomorrow';
  if (isYesterday(date)) return 'Yesterday';
  return format(date, 'MMMM do, yyyy');
};

export const remainingTimePercent = (startDate: Date, endDate: Date) => {
  const totalTimeDiff = differenceInMinutes(endDate, startDate);
  const timeDiffToEnd = differenceInMinutes(endDate, new Date());
  const timeDiffPercent = Number(((totalTimeDiff - timeDiffToEnd) / totalTimeDiff) * 100);
  return timeDiffPercent;
};
