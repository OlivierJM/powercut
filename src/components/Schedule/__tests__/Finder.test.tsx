import { vi } from 'vitest';
import { render, screen } from '@test-utils';
import userEvent from '@testing-library/user-event';
import Finder from '../Finder';

vi.mock('../../data/areas.json', () => ({
  default: {
    Lusaka: { Group1: ['10 miles', 'Kanyama'] },
    Copperbelt: { Group2: ['Kitwe', 'Lua'] },
  },
}));

vi.mock('../../data/schedule.json', () => ({
  default: [
    {
      Province: 'Lusaka',
      Schedules: [
        {
          Group: '1',
          Date: new Date().toISOString().split('T')[0],
          'Start Time': '08:00',
          'End Time': '16:00',
          Area: '10 miles',
        },
      ],
    },
  ],
}));

describe('Finder Component', () => {
  beforeEach(() => {
    render(<Finder />);
  });

  it('renders autocomplete input', () => {
    expect(screen.getByPlaceholderText('Search for an area...')).toBeInTheDocument();
  });

  it('updates area state on autocomplete change', async () => {
    const user = userEvent.setup();
    await user.type(screen.getByPlaceholderText('Search for an area...'), '10 miles');
    expect(screen.getByPlaceholderText('Search for an area...')).toHaveValue('10 miles');
  });

  it('clears the area state when clear icon is clicked', async () => {
    const user = userEvent.setup();
    await user.type(screen.getByPlaceholderText('Search for an area...'), '10 miles');
    await user.click(screen.getByLabelText('clear-area'));
    expect(screen.getByPlaceholderText('Search for an area...')).toHaveValue('');
  });

  it('finds and displays schedule when "Find Schedule" is clicked', async () => {
    const user = userEvent.setup();
    await user.type(screen.getByPlaceholderText('Search for an area...'), '10 miles');
    await user.click(screen.getByText('Find Schedule'));
    expect(screen.getByText('10 MILES')).toBeInTheDocument();
  });

  it('does not display any schedule if area is not provided', async () => {
    const user = userEvent.setup();
    await user.click(screen.getByText('Find Schedule'));
    expect(screen.queryByText('08:00')).not.toBeInTheDocument();
  });

  it('shows disclaimer text correctly', () => {
    expect(screen.getByText(/Disclaimer:/)).toBeInTheDocument();
    expect(screen.getByText('prepared by Zesco')).toHaveAttribute(
      'href',
      'https://www.zesco.co.zm/assets/LoadManagement/ZESCO_8_hr_Loadshedding%20_Schedule_final.pdf'
    );
  });

  it('shows the creator signature', () => {
    expect(screen.getByText('Made with ♥ by OlivierJM')).toBeInTheDocument();
  });
});
