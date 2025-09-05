import { Typography, Box } from '@mui/material';
import './Footer.scss';
const companyName = process.env.REACT_APP_COMPANY_NAME;

export default function Footer() {
  return (
    <Box component="footer" className="app-footer">
      <Typography variant="body2" color="text.secondary" align="center">
        © {new Date().getFullYear()} {companyName}
      </Typography>
    </Box>
  );
}