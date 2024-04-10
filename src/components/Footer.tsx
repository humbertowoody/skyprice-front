import * as React from 'react';
import { Box } from '@mui/material';

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
        <b>ESCOM - TT 2024-A053</b> Humberto Alejandro Ortega Alcocer &copy;
        {new Date().getFullYear()}
      </Box>

      {/* Para pantallas grandes */}
      <Box
        sx={{
          display: { xs: 'none', md: 'flex' },
          alignItems: 'center',
          justifyContent: 'center',
        }}
        py={2}
        bgcolor="primary.main"
        color="primary.contrastText">
        <b>ESCOM - TT 2024-A053</b> Humberto Alejandro Ortega Alcocer &copy;
        {new Date().getFullYear()}
      </Box>
    </React.Fragment>
  );
}
