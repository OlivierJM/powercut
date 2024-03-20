import { render, screen } from '@test-utils';
import { format } from 'date-fns';
import ScheduleCard from '../ScheduleCard';
import * as utils from '@/utils';

const mockData = {
  data: {
    group: 'A',
    startDate: '2024-03-15T04:00:00.000Z',
    endDate: '2024-03-15T12:00:00.000Z',
    area: 'Mitek',
  },
  province: 'Northern Province',
};

vi.mock('@/utils', () => ({
  createTimeFromDate: vi.fn(),
  formatDay: vi.fn().mockImplementation((date: string) => format(date, 'MMMM do, yyyy')),
  remainingTime: vi.fn(),
  remainingTimePercent: vi.fn().mockImplementation((): number => 50),
  removeProvince: vi
    .fn()
    .mockImplementation((province: string) => province.replace('Province', '')),
  toTitleCase: vi
    .fn()
    .mockImplementation(
      (text: string) => text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
    ),
}));

describe('ScheduleCard', () => {
  beforeEach(() => {
    vi.mocked(utils.createTimeFromDate).mockImplementation(
      (time: string, date: string) => new Date(`${date}T${time}`) as any
    );
    vi.mocked(utils.remainingTime).mockReturnValue({
      text: 'Load Shedding Currently In Progress',
      color: 'red',
    } as any);
  });
  it('displays load shedding status during load shedding', () => {
    render(<ScheduleCard data={mockData.data} province={mockData.province} />);

    expect(screen.getByTestId('area-province')).toHaveTextContent('Mitek - Northern');
    expect(screen.getByText('Load Shedding Currently In Progress')).toBeInTheDocument();
    expect(
      screen.getByText(utils.formatDay(new Date(mockData.data.startDate)))
    ).toBeInTheDocument();
    expect(
      screen.getByText(`Start Time: ${format(mockData.data.startDate, 'HH:mm')}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`End Time: ${format(mockData.data.endDate, 'HH:mm')}`)
    ).toBeInTheDocument();
  });

  it('displays correct info for different location and time', () => {
    const pastLoadSheddingMockData = {
      data: {
        group: 'A',
        startDate: '2024-03-15T22:00:00.000Z',
        endDate: '2024-03-16T00:00:00.000Z',
        area: 'Libala',
      },
      province: 'Lusaka Province',
    };
    render(
      <ScheduleCard
        data={pastLoadSheddingMockData.data}
        province={pastLoadSheddingMockData.province}
      />
    );

    expect(screen.getByTestId('area-province')).toHaveTextContent('Libala - Lusaka');
    expect(
      screen.getByText(utils.formatDay(new Date(pastLoadSheddingMockData.data.startDate)))
    ).toBeInTheDocument();
    expect(
      screen.getByText(`Start Time: ${format(pastLoadSheddingMockData.data.startDate, 'HH:mm')}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`End Time: ${format(pastLoadSheddingMockData.data.endDate, 'HH:mm')}`)
    ).toBeInTheDocument();
  });
});

describe('ScheduleCard - Load shedding already happened', () => {
  beforeEach(() => {
    vi.mocked(utils.createTimeFromDate).mockImplementation(
      (time: string, date: string) => new Date(`${date}T${time}`) as any
    );
    vi.mocked(utils.remainingTime).mockReturnValue({
      text: 'No Load Shedding expected today',
      color: 'red',
    } as any);
  });

  it('displays correct info for different location and time', () => {
    const mock = {
      data: {
        group: 'A',
        startDate: '2024-03-14T22:00:00.000Z',
        endDate: '2024-03-15T04:00:00.000Z',
        area: 'Chawama',
      },
      province: 'Lusaka Province',
    };
    render(<ScheduleCard data={mock.data} province={mock.province} />);

    expect(screen.getByTestId('area-province')).toHaveTextContent('Chawama - Lusaka');
    expect(screen.getByText('No Load Shedding expected today')).toBeInTheDocument();
    expect(
      screen.getByText(`Start Time: ${format(mock.data.startDate, 'HH:mm')}`)
    ).toBeInTheDocument();
    expect(screen.getByText(`End Time: ${format(mock.data.endDate, 'HH:mm')}`)).toBeInTheDocument();
  });
});
