import { Button, CircularProgress } from '@mui/material';

export default function CustomButton({ disabled, onClick, loading }: any) {
  return (
    <Button
      fullWidth
      variant="contained"
      color="primary"
      disabled={disabled}
      onClick={onClick}
      sx={{ mt: 3 }}
    >
      {loading ? <CircularProgress size={24} color="inherit" /> : 'Swap'}
    </Button>
  );
}