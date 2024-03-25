import { render, screen } from '@test-utils';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { FAQ } from '../FAQ';
import { questions } from '@/constants';

describe('FAQ Component', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <FAQ />
      </BrowserRouter>
    );
  });

  it('renders the FAQ component correctly', () => {
    expect(screen.getByAltText('Frequently Asked Questions')).toBeInTheDocument();
    expect(screen.getByText('Frequently Asked Questions')).toBeInTheDocument();
    expect(screen.getByTestId('faq-grid')).toBeInTheDocument();
    expect(screen.getByTestId('faq-svg')).toBeInTheDocument();
  });

  it('displays the correct number of questions', () => {
    questions.forEach((question) => {
      expect(screen.getByText(question.question)).toBeInTheDocument();
    });
    // Checks if the number of rendered questions matches the length of the questions array we have
    expect(screen.getAllByTestId('question-item').length).toBe(questions.length);
  });

  it('can expand and collapse accordion items', async () => {
    const user = userEvent.setup();
    expect(screen.getByText(questions[0].answer)).toBeVisible();

    await user.click(screen.getByText(questions[2].question));
    expect(screen.queryByText(questions[0].answer)).not.toBeVisible();

    await user.click(screen.getByText(questions[0].question));
    expect(screen.getByText(questions[0].answer)).toBeVisible();
  });

  it('only one accordion item is open at a time', async () => {
    const user = userEvent.setup();

    // Initially, 'my-location' accordion item should be open
    expect(screen.getByText(questions[0].answer)).toBeVisible();

    // Click the second question to open it and the first one should now be closed
    await user.click(screen.getByText(questions[1].question));
    expect(screen.queryByText(questions[0].answer)).not.toBeVisible();
  });

  it('renders html within answers', async () => {
    const user = userEvent.setup();

    // Click the sixth question to open it and the first one should now be closed
    await user.click(screen.getByTestId(`question-${questions[5].value}`));

    // needs slight delay to render
    await new Promise((r) => {
      setTimeout(r, 50);
    });

    expect(screen.getByTestId(`${questions[5].value}-link`)).toBeVisible();
    expect(screen.getByTestId(`${questions[5].value}-link`)).toBeInstanceOf(HTMLAnchorElement);

    // Click the seventh question to open it and the first one should now be closed
    await user.click(screen.getByTestId(`question-${questions[6].value}`));

    // needs slight delay to render
    await new Promise((r) => {
      setTimeout(r, 50);
    });

    expect(screen.getByTestId(`${questions[6].value}-link`)).toBeVisible();
    expect(screen.getByTestId(`${questions[6].value}-link`)).toBeInstanceOf(HTMLAnchorElement);
  });
});
