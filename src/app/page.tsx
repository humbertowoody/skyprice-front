import React from 'react';
import { Box, Grid } from '@mui/material';
import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';
import FormularioPrediccion from '@/components/FormularioPrediccion';
import skyline from '/public/skyline-cdmx-sm.jpg';

export default function Estimacion() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage:
          //'url(https://source.unsplash.com/random?architecture+cdmx)',
          `url(${skyline.src})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
      <NavBar />
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: '80vh' }}>
        <Grid item xs={12} md={8}>
          <FormularioPrediccion />
        </Grid>
      </Grid>
      <Footer />
    </Box>
  );
}
