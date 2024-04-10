import * as React from 'react';
import { Container, Typography, Box } from '@mui/material';

export const Creditos: React.FC = () => (
  <Container sx={{ mt: 4, mb: 6 }}>
    <Typography variant="h6" component="h2" gutterBottom>
      Créditos
    </Typography>

    {/* Para pantallas grandes */}
    <Box
      sx={{
        display: { xs: 'none', md: 'flex' },
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        gap: 2,
        mt: 4,
      }}>
      <Typography variant="body1" sx={{ textAlign: 'justify' }}>
        Este proyecto fue desarrollado por{' '}
        <strong>Humberto Alejandro Ortega Alcocer</strong> como parte de su{' '}
        <strong>Trabajo Terminal 2024-A053</strong> con el título de{' '}
        <i>
          "Plataforma de estimación de precios de mercado de departamentos en la
          Ciudad de México"
        </i>{' '}
        asesorado por el <strong> Mtro. Ariel López Rojas</strong> en la{' '}
        <strong>
          Escuela Superior de Cómputo del Instituto Politécnico Nacional
        </strong>{' '}
        en la Ciudad de México para obtener el título de{' '}
        <strong>Ingeniero en Sistemas Computacionales</strong>.
      </Typography>

      <img
        src="/logo-ipn.png"
        alt="Logo del Instituto Politécnico Nacional"
        height="100"
      />
      <img
        src="/logo-escom.png"
        alt="Logo de la Escuela Superior de Cómputo"
        height="100"
      />
    </Box>

    {/* Para pantallas pequeñas */}
    <Box
      sx={{
        display: { xs: 'flex', md: 'none' },
        flexDirection: 'column',
        gap: 2,
        mt: 4,
      }}>
      <Typography variant="body1" sx={{ textAlign: 'justify' }}>
        Este proyecto fue desarrollado por{' '}
        <strong>Humberto Alejandro Ortega Alcocer</strong> como parte de su{' '}
        <strong>Trabajo Terminal 2024-A053</strong> con el título de{' '}
        <i>
          "Plataforma de estimación de precios de mercado de departamentos en la
          Ciudad de México"
        </i>{' '}
        asesorado por el <strong> Mtro. Ariel López Rojas</strong> en la{' '}
        <strong>
          Escuela Superior de Cómputo del Instituto Politécnico Nacional
        </strong>{' '}
        en la Ciudad de México para obtener el título de{' '}
        <strong>Ingeniero en Sistemas Computacionales</strong>.
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
        <img
          src="/logo-ipn.png"
          alt="Logo del Instituto Politécnico Nacional"
          height="100"
        />
        <img
          src="/logo-escom.png"
          alt="Logo de la Escuela Superior de Cómputo"
          height="100"
        />
      </Box>
    </Box>
  </Container>
);
