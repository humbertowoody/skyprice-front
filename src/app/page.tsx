import React from 'react';
import { Box, Grid } from '@mui/material';
import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';
import FormularioPrediccion from '@/components/FormularioPrediccion';
import skyline from '/public/skyline-cdmx-sm.jpg';
import { Metadata } from 'next';

// Metadata for SEO
export const metadata: Metadata = {
  metadataBase: new URL('https://skyprice.xyz'),
  title: 'SkyPrice',
  description: 'Estima el precio de tu departamento en la Ciudad de México',
  keywords: 'precio, departamento, cdmx, ciudad de méxico, estimación',
  applicationName: 'SkyPrice',
  referrer: 'origin-when-cross-origin',
  creator: 'Humberto Alejandro Ortega Alcocer',
  publisher: 'Humberto Alejandro Ortega Alcocer',
  authors: [
    {
      name: 'Humberto Alejandro Ortega Alcocer',
      url: 'https://humbertowoody.xyz',
    },
  ],
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  twitter: {
    card: 'summary',
    title: 'SkyPrice',
    description: 'Estima el precio de tu departamento en la Ciudad de México',
    creator: '@humbertowoody',
    site: '@humbertowoody',
    images: ['https://skyprice.xyz/skyline-cdmx-sm.jpg'],
  },
  openGraph: {
    title: 'SkyPrice',
    description: 'Estima el precio de tu departamento en la Ciudad de México',
    url: 'https://skyprice.xyz',
    siteName: 'SkyPrice',
    locale: 'ex_MX',
    type: 'website',
    images: [
      {
        url: 'https://skyprice.xyz/skyline-cdmx-sm.jpg',
        width: 1024,
        height: 768,
        alt: 'Skyline Ciudad de México',
      },
    ],
  },
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

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
