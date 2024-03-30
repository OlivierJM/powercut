import { Center, Skeleton, Text } from '@mantine/core';
import { useFetchQuotes } from '@/hooks/useFetchQuotes';

const RandomQuote = () => {
  const { quote, loading } = useFetchQuotes();

  if (!quote && !loading) return null;
  return (
    <Center data-testid="random-quote">
      {loading ? (
        <Skeleton height={20} radius="md" width="80%" data-testid="random-quote-loading" />
      ) : (
        <Text fs="italic" c="dimmed" ta="center" mt="md">
          {`${quote?.content} - ${quote?.author}`}
        </Text>
      )}
    </Center>
  );
};

export default RandomQuote;
