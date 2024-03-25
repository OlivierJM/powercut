import { Title, Container, Accordion, Grid, Image } from '@mantine/core';
import dompurify from 'dompurify';
import parse from 'html-react-parser';
import classes from '../styles/FAQ.module.css';
import image from '../assets/faq.svg';
import { AppWrapper } from '@/components/AppWrapper/AppWrapper';
import { questions } from '@/constants';

export function FAQ() {
  return (
    <AppWrapper>
      <div className={classes.wrapper}>
        <Container size="lg">
          <Grid data-testid="faq-grid" gutter={50}>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Image src={image} alt="Frequently Asked Questions" data-testid="faq-svg" />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Title order={2} ta="left" className={classes.title}>
                Frequently Asked Questions
              </Title>

              <Accordion chevronPosition="right" defaultValue="my-location" variant="separated">
                {questions.map((question, index) => {
                  const sanitizedAnswer = dompurify.sanitize(question.answer, {
                    ADD_ATTR: ['target'],
                  });

                  return (
                    <Accordion.Item
                      key={index}
                      className={classes.item}
                      data-testid="question-item"
                      value={question.value}
                    >
                      <Accordion.Control data-testid={`question-${question.value}`}>
                        {question.question}
                      </Accordion.Control>
                      <Accordion.Panel>{parse(sanitizedAnswer)}</Accordion.Panel>
                    </Accordion.Item>
                  );
                })}
              </Accordion>
            </Grid.Col>
          </Grid>
        </Container>
      </div>
    </AppWrapper>
  );
}
