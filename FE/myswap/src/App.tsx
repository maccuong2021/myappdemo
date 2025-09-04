import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  TextField,
  MenuItem,
  Button,
  CircularProgress,
  Alert,
} from '@mui/material';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import './App.css';

const tokenList = ['BTC', 'ETH', 'USDT', 'BNB', 'SOL'];

function App() {
  const [fromToken, setFromToken] = useState('');
  const [toToken, setToToken] = useState('');
  const [amount, setAmount] = useState('');
  const [rate, setRate] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (fromToken && toToken && fromToken !== toToken) {
      setRate(Math.random() * (2 - 0.5) + 0.5);
    } else {
      setRate(null);
    }
  }, [fromToken, toToken]);

  const handleSwap = () => {
    if (!fromToken || !toToken || !amount || fromToken === toToken) {
      setError('Please select valid tokens and enter an amount.');
      return;
    }

    setError('');
    setLoading(true);
    setTimeout(() => {
      alert(`Swapped ${amount} ${fromToken} to ${toToken} at rate ${rate?.toFixed(4)}`);
      setLoading(false);
    }, 1500);
  };

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh" width="100vw">
      <Header />

      <Container sx={{ flexGrow: 1, py: 6 }}>
        <Paper elevation={4} sx={{ p: 4, borderRadius: 3, maxWidth: 600, mx: 'auto' }}>
          <Typography variant="h5" align="center" gutterBottom>
            Currency Swap
          </Typography>

          <Box display="flex" gap={2} mb={2}>
            <TextField
              select
              fullWidth
              label="From"
              value={fromToken}
              onChange={(e) => setFromToken(e.target.value)}
            >
              {tokenList.map((token) => (
                <MenuItem key={token} value={token}>
                  {token}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              fullWidth
              label="To"
              value={toToken}
              onChange={(e) => setToToken(e.target.value)}
            >
              {tokenList.map((token) => (
                <MenuItem key={token} value={token}>
                  {token}
                </MenuItem>
              ))}
            </TextField>
          </Box>

          <TextField
            fullWidth
            label="Amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            inputProps={{ min: 0 }}
            sx={{ mb: 2 }}
          />

          {rate && (
            <Typography variant="body2" color="text.secondary" align="center" mb={2}>
              💱 Exchange Rate: 1 {fromToken} ≈ {rate.toFixed(4)} {toToken}
            </Typography>
          )}

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Button
            variant="contained"
            fullWidth
            onClick={handleSwap}
            disabled={loading}
            sx={{ py: 1.5 }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Swap Now'}
          </Button>
        </Paper>
      </Container>

      <Footer />
    </Box>
  );
}

export default App;