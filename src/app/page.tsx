'use client';
import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';
import FormularioPrediccion from '@/components/FormularioPrediccion';
import skyline2 from '/public/skyline-cdmx-2.jpeg';
import Link from 'next/link';
import { useTranslation } from './i18nContext';

export default function Estimacion() {
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: `url(${skyline2.src})`,
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
      <Typography
        variant="caption"
        textAlign="center"
        sx={{
          bgcolor: 'rgba(0, 0, 0, 0.5)',
          color: 'white',
          p: 1,
        }}>
        {t('predictionForm.caption1')}{' '}
        <Link
          href="https://unsplash.com/es/@alexistostado?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
          rel="noopener noreferrer"
          target="_blank"
          style={{ color: 'white', textDecoration: 'underline' }}
          passHref>
          Alexis Tostado
        </Link>{' '}
        {t('predictionForm.caption2')}{' '}
        <Link
          href="https://unsplash.com/es/fotos/foto-aerea-de-edificios-de-hormigon-bajo-nubes-blancas-durante-el-dia-3TBuSLluZ8w?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
          rel="noopener noreferrer"
          target="_blank"
          style={{ color: 'white', textDecoration: 'underline' }}
          passHref>
          Unsplash
        </Link>
      </Typography>

      <Footer />
    </Box>
  );
}
