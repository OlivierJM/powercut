export interface ScheduleCardProps {
  data: {
    group: string;
    startDate: string;
    endDate: string;
    area: string;
  };
  province: string;
}

export interface QuoteType {
  id: string;
  content: string;
  author: string;
}
