import { render, fireEvent } from '@test-utils';
import RecentSearchTab from '../RecentSearch';

describe('RecentSearchTab', () => {
  it('renders the place name', () => {
    const { getByText } = render(
      <RecentSearchTab onTabSelect={() => {}} onTabDelete={() => {}} place="Test Place" />
    );
    expect(getByText('Test Place')).toBeInTheDocument();
  });

  it('calls onTabSelect when the button is clicked', () => {
    const onTabSelect = vi.fn();
    const { getByText } = render(
      <RecentSearchTab onTabSelect={onTabSelect} onTabDelete={() => {}} place="Test Place" />
    );
    fireEvent.click(getByText('Test Place'));
    expect(onTabSelect).toHaveBeenCalledWith('Test Place');
  });

  it('calls onTabDelete when the delete icon is clicked', () => {
    const onTabDelete = vi.fn();
    const { getByTestId } = render(
      <RecentSearchTab onTabSelect={() => {}} onTabDelete={onTabDelete} place="Test Place" />
    );
    fireEvent.click(getByTestId('delete-icon'));
    expect(onTabDelete).toHaveBeenCalledWith('Test Place');
  });
});
