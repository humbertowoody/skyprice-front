'use client';
import React from 'react';
import { Box, Grid } from '@mui/material';
import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';

export default function Mapa() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}>
      <NavBar />
      <Box
        sx={{
          flex: '1 1 auto', // Para que el footer no se suba
          display: 'flex',
        }}>
        <iframe
          src="/mapa.html"
          style={{
            width: '100%',
            padding: '0',
            border: '0',
          }}
          title="Mapa de la CDMX con Kepler"
          loading="eager"
        />
      </Box>
      <Footer />
    </Box>
  );
}
