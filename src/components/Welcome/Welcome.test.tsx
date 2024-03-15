import { render, screen } from '@test-utils';
import { Welcome } from './Welcome';

describe('Welcome component', () => {
  it('has correct links', () => {
    render(<Welcome />);
    expect(screen.getByText('Powercut')).toBeInTheDocument();
    expect(
      screen.getByText('Easily track load shedding schedules in your area or elsewhere.')
    ).toBeInTheDocument();
  });
});
