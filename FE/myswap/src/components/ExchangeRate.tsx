import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';

export default function ExchangeRate({ from, to }: any) {
  const [rate, setRate] = useState<number | null>(null);

  useEffect(() => {
    if (!from || !to || from === to) {
      setRate(null);
      return;
    }

    fetch('https://token-price-api.example.com')
      .then((res) => res.json())
      .then((data) => {
        const fromPrice = data[from];
        const toPrice = data[to];
        if (fromPrice && toPrice) {
          setRate(toPrice / fromPrice);
        } else {
          setRate(null);
        }
      });
  }, [from, to]);

  return (
    <Typography variant="body2" align="center" color="text.secondary" sx={{ mt: 1 }}>
      {rate ? `1 ${from} ≈ ${rate.toFixed(4)} ${to}` : 'Exchange rate unavailable'}
    </Typography>
  );
}