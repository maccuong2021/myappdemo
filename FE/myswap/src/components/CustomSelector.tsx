import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const tokens = ['BTC', 'ETH', 'USDT', 'BNB', 'SOL'];

export default function CustomSelector({ label, value, onChange }: any) {
  return (
    <FormControl fullWidth>
      <InputLabel>{label} Token</InputLabel>
      <Select value={value} onChange={(e) => onChange(e.target.value)} label={`${label} Token`}>
        {tokens.map((token) => (
          <MenuItem key={token} value={token}>
            {token}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}