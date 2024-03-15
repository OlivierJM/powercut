import { render, screen } from '@test-utils';
import ScheduleCard from '../ScheduleCard';
import * as utils from '@/utils';

const mockData = {
  data: {
    group: 'A',
    date: '2023-03-15',
    startTime: '12:00',
    endTime: '14:00',
    area: 'Mitek',
  },
  province: 'Northern Province',
};

vi.mock('@/utils', () => ({
  createTimeFromDate: vi.fn(),
  remainingTime: vi.fn(),
  removeProvince: vi.fn().mockImplementation((province) => province.replace('Province', '')),
  toTitleCase: vi
    .fn()
    .mockImplementation((text) => text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()),
}));

describe('ScheduleCard', () => {
  beforeEach(() => {
    vi.mocked(utils.createTimeFromDate).mockImplementation(
      (time, date) => new Date(`${date}T${time}`) as any
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
    expect(screen.getByText(mockData.data.date)).toBeInTheDocument();
    expect(screen.getByText(`Start Time: ${mockData.data.startTime}`)).toBeInTheDocument();
    expect(screen.getByText(`End Time: ${mockData.data.endTime}`)).toBeInTheDocument();
  });

  it('displays correct info for different location and time', () => {
    const pastLoadSheddingMockData = {
      data: {
        group: 'A',
        date: '2023-03-15',
        startTime: '12:00',
        endTime: '14:00',
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
    expect(screen.getByText(pastLoadSheddingMockData.data.date)).toBeInTheDocument();
    expect(
      screen.getByText(`Start Time: ${pastLoadSheddingMockData.data.startTime}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`End Time: ${pastLoadSheddingMockData.data.endTime}`)
    ).toBeInTheDocument();
  });
});

describe('ScheduleCard - Load shedding already happened', () => {
  beforeEach(() => {
    vi.mocked(utils.createTimeFromDate).mockImplementation(
      (time, date) => new Date(`${date}T${time}`) as any
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
        date: '2023-03-15',
        startTime: '00:00',
        endTime: '6:00',
        area: 'Chawama',
      },
      province: 'Lusaka Province',
    };
    render(<ScheduleCard data={mock.data} province={mock.province} />);

    expect(screen.getByTestId('area-province')).toHaveTextContent('Chawama - Lusaka');
    expect(screen.getByText('No Load Shedding expected today')).toBeInTheDocument();
    expect(screen.getByText(`Start Time: ${mock.data.startTime}`)).toBeInTheDocument();
    expect(screen.getByText(`End Time: ${mock.data.endTime}`)).toBeInTheDocument();
  });
});
