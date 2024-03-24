import { render, screen } from '@test-utils';
import RecentSearchTab from './RecentSearch';

describe('RecentSearchTab component', () => {
  test('renders with provided place prop', () => {
    const place = 'Zambia';
    render(<RecentSearchTab onTabSelect={() => {}} onTabDelete={() => {}} place={place} />);
    expect(screen.getByText(place)).toBeInTheDocument();
    screen.debug();
  });
});
