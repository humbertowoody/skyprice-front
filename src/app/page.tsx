import React from 'react';
import { Box, Grid } from '@mui/material';
import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';
import FormularioPrediccion from '@/components/FormularioPrediccion';
import skyline from '/public/skyline-cdmx-sm.jpg';
import Head from 'next/head';

export default function Estimacion() {
  return (
    <>
      <Head>
        <title>SkyPrice</title>
        <meta property="og:title" content="SkyPrice" key="title" />
        <meta
          name="description"
          content="SkyPrice es una herramienta para estimar el precio de un departamento en la Ciudad de México."
        />
        <meta
          property="og:description"
          content="SkyPrice es una herramienta para estimar el precio de un departamento en la Ciudad de México."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://skyprice.xyz" />
        <meta
          property="og:image"
          content="https://skyprice.xyz/skyline-cdmx-sm.jpg"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="SkyPrice" />
        <meta
          name="twitter:description"
          content="SkyPrice es una herramienta para estimar el precio de un departamento en la Ciudad de México."
        />
        <meta
          name="twitter:image"
          content="https://skyprice.xyz/skyline-cdmx-sm.jpg"
        />
      </Head>
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
    </>
  );
}
