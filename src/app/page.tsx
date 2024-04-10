import React from 'react';
import { Box, Grid } from '@mui/material';
import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';
import FormularioPrediccion from '@/components/FormularioPrediccion';

export default function Estimacion() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        //backgroundImage: 'url(https://source.unsplash.com/random?real-estate)',
        backgroundImage:
          'url(https://source.unsplash.com/random?Mexico-City-skyline,CDMX-buildings)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between', // Centra el formulario y añade espacio para el footer
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
