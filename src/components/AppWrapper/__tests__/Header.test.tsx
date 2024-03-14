import { fireEvent, render } from '@testing-library/react';
import { AppShell, MantineProvider } from '@mantine/core';
import { BrowserRouter } from 'react-router-dom';
import { Header } from '../Header';

describe('AppWrapper', () => {
  it('renders without crashing', () => {
    const props = {
      onToggle: vi.fn(),
      opened: false,
    };
    const { getAllByText, getByTestId } = render(
      <MantineProvider>
        <BrowserRouter>
          <AppShell>
            <Header {...props} />
          </AppShell>
        </BrowserRouter>
      </MantineProvider>
    );
    expect(getAllByText('Home')[0]).toBeInTheDocument();
    expect(getAllByText('FAQ')[0]).toBeInTheDocument();

    fireEvent.click(getByTestId('home-button'));
    expect(props.onToggle).toHaveBeenCalled();
  });
});
