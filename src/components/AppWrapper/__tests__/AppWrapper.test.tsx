import { render, screen } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter } from 'react-router-dom';
import { AppWrapper } from '../AppWrapper';

describe('AppWrapper', () => {
  it('renders without crashing', () => {
    render(
      <MantineProvider>
        <BrowserRouter>
          <AppWrapper>Some some</AppWrapper>
        </BrowserRouter>
      </MantineProvider>
    );
    expect(screen.getAllByText('Home')[0]).toBeInTheDocument();
    expect(screen.getAllByText('FAQ')[0]).toBeInTheDocument();
    expect(screen.getByText('Some some')).toBeInTheDocument(); // our children
  });
});
