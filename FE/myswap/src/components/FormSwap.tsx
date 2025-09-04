import { useState } from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';
import CustomSelector from './CustomSelector';
import CustomInput from './CustomInput';
import ExchangeRate from './ExchangeRate';
import CustomButton from './CustomButton';

export default function FormSwap() {
  const [fromToken, setFromToken] = useState('');
  const [toToken, setToToken] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSwap = () => {
    setLoading(true);
    setTimeout(() => {
      alert(`Swapped ${amount} ${fromToken} to ${toToken}`);
      setLoading(false);
    }, 1500);
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 6 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Currency Swap
        </Typography>
        <Box display="flex" gap={2}>
          <CustomSelector label="From" value={fromToken} onChange={setFromToken} />
          <CustomSelector label="To" value={toToken} onChange={setToToken} />
        </Box>
        <CustomInput value={amount} onChange={setAmount} />
        <ExchangeRate from={fromToken} to={toToken} />
        <CustomButton
          disabled={!fromToken || !toToken || !amount || loading}
          onClick={handleSwap}
          loading={loading}
        />
      </Paper>
    </Container>
  );
}