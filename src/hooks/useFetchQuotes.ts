import { useEffect, useState } from 'react';
import { QuoteType } from '@/types';

export const useFetchQuotes = () => {
    const [quote, setQuote] = useState<QuoteType | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      fetch(
        'https://api.quotable.io/quotes/random?minLength=50&maxLength=60'
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          return null;
        })
        .then((data) => {
          setQuote(data?.[0]);
          setLoading(false);
        })
        .finally(() => {
          setLoading(false);
        });
    }, []);

return { quote, loading };
};
