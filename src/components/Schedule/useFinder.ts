import { useState, useMemo, useCallback } from 'react';
import { startOfToday, isBefore } from 'date-fns';
import areas from '@/data/areas.json';
import schedules from '@/data/schedule.json';
import { COOKIE_EXPIRY_DAYS, COOKIE_SEARCH_KEY, MAX_RECENT_AREAS_NO } from '../../constants';
import useCookie from '../../hooks/useCookie';
import type { ScheduleCardProps } from '@/types';

export const useFinder = () => {
  const [area, setArea] = useState('');
  const [currentProvince, setCurrentProvince] = useState('');
  const [upcomingSchedules, setUpcomingSchedules] = useState<ScheduleCardProps['data'][]>([]);
  const [cookie, setCookie] = useCookie(COOKIE_SEARCH_KEY);
  const [recentSearches, setRecentSearches] = useState(cookie);

  const allAreas = useMemo(() => {
    const allAreasList = [] as string[];
    Object.values(areas).forEach((groups) => {
      Object.values(groups).forEach((areaList) => {
        allAreasList.push(...areaList);
      });
    });
    return [...new Set(allAreasList)].sort();
  }, []);

  const findSchedule = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-shadow
    (area: string) => {
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
    },
    [area]
  );

  const onOptionSelect = (place: string) => {
    if (place !== area) {
      setUpcomingSchedules([]);
      setArea(place);
      findSchedule(place);
    }
  };

  const onTabBtnDelete = (place: string) => {
    const recentAreas = recentSearches?.split('|');
    const indexToRemove = recentAreas?.indexOf(place);

    if (indexToRemove !== undefined && indexToRemove > -1) {
      recentAreas?.splice(indexToRemove, 1);
    }
    const updatedAreas = recentAreas?.join('|') || '';
    setRecentSearches(updatedAreas);
    setCookie(updatedAreas, COOKIE_EXPIRY_DAYS);
  };

  const handleRecentSearches = () => {
    let searchedAreas = recentSearches?.split('|') || [];
    const isSearchedAlready = searchedAreas?.includes(area);
    const newArea = isSearchedAlready ? '' : area;
    if (newArea) {
      if (searchedAreas?.length === MAX_RECENT_AREAS_NO) {
        searchedAreas = searchedAreas.slice(1, searchedAreas.length);
      }
      const joinedArea = searchedAreas?.join('|');
      const updatedAreas = joinedArea ? `${joinedArea}|${newArea}` : newArea;
      setRecentSearches(updatedAreas);
      setCookie(updatedAreas, COOKIE_EXPIRY_DAYS);
    }
  };

  return {
    area,
    setArea,
    currentProvince,
    upcomingSchedules,
    recentSearches,
    allAreas,
    findSchedule,
    onOptionSelect,
    onTabBtnDelete,
    handleRecentSearches,
    setUpcomingSchedules,
  };
};
