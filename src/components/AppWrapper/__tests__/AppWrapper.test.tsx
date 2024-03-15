import { render, screen } from '@test-utils';
import { BrowserRouter } from 'react-router-dom';
import { AppWrapper } from '../AppWrapper';

describe('AppWrapper', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <AppWrapper>Some some</AppWrapper>
      </BrowserRouter>
    );
    expect(screen.getAllByText('Home')[0]).toBeInTheDocument();
    expect(screen.getAllByText('FAQ')[0]).toBeInTheDocument();
    expect(screen.getByText('Some some')).toBeInTheDocument(); // our children
  });
});
