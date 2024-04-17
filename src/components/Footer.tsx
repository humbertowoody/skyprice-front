import * as React from 'react';
import { Box, Typography } from '@mui/material';

export default function Footer() {
  return (
    <React.Fragment>
      {/* Para pantallas pequeñas */}
      <Box
        sx={{
          display: { xs: 'flex', md: 'none' },
          flexDirection: 'column',
          gap: 2,
          mt: 4,
        }}
        textAlign="center"
        py={2}
        bgcolor="primary.main"
        color="primary.contrastText">
        <Typography variant="body1" fontWeight="bold">
          ESCOM - TT 2024-A053
        </Typography>
        <Typography variant="body2">
          🎓 Humberto Alejandro Ortega Alcocer &copy;
          {new Date().getFullYear()}
        </Typography>
      </Box>

      {/* Para pantallas grandes */}
      <Box
        sx={{
          display: { xs: 'none', md: 'flex' },
          justifyContent: 'space-between',
          px: 4,
        }}
        py={2}
        bgcolor="primary.main"
        color="primary.contrastText">
        <Typography variant="body2" fontWeight="bold">
          ESCOM - TT 2024-A053
        </Typography>
        <Typography variant="body2">
          🎓 Humberto Alejandro Ortega Alcocer &copy;
          {new Date().getFullYear()}
        </Typography>
      </Box>
    </React.Fragment>
  );
}
