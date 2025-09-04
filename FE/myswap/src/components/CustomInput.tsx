import { TextField } from '@mui/material';

export default function CustomInput({ value, onChange }: any) {
  return (
    <TextField
      fullWidth
      label="Amount"
      type="number"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      margin="normal"
      inputProps={{ min: 0 }}
    />
  );
}