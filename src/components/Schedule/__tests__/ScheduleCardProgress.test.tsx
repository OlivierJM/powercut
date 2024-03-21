import { render, screen, waitFor } from '@test-utils';
import ScheduleCardProgress from '../ScheduleCardProgress';
import { Progress } from '@mantine/core';

const mockTimeout = 300

describe(
  'ScheduleCard',
  () => {
    it('Progress bar does not render at 0%', async () => {
      render(<ScheduleCardProgress value={0} />);
      await waitFor(
         () => expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '0'),
        { timeout: mockTimeout }
      )
    });
    it('Displays the progress bar at 50% time elapsed ', async () => {
      render(<ScheduleCardProgress value={50} />);
      await waitFor(
         () => expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '50'),
        { timeout: mockTimeout }
      )
    });
    it('Displays the progress bar at 100% time elapsed ', async () => {
      render(<ScheduleCardProgress value={100} />);
      await waitFor(
         () => expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '100'),
        { timeout: mockTimeout }
      )
    })
 
  },
  { timeout: 1000 }
);
