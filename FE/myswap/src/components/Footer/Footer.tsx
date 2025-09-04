import { Typography, Box } from '@mui/material';
export default function Footer() {
  return (
    <Box component="footer" sx={{ py: 2, textAlign: 'center', backgroundColor: '#fff', borderTop: '1px solid #ddd' }}>
      <Typography variant="body2" color="text.secondary">
        © {new Date().getFullYear()} 
      </Typography>
    </Box>
  );
}