'use client';
import { Lato, Raleway } from 'next/font/google';
import { createTheme } from '@mui/material/styles';

const lato = Lato({
  weight: ['100', '300', '400', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
});

const raleway = Raleway({
  weight: ['300', '400', '600', '700', '800', '900', '100', '200', '500'],
  subsets: ['latin'],
  display: 'swap',
});

const theme = createTheme({
  palette: {
    mode: 'light',
  },
  typography: {
    fontFamily: lato.style.fontFamily,
    h1: { fontFamily: raleway.style.fontFamily },
    h2: { fontFamily: raleway.style.fontFamily },
    h3: { fontFamily: raleway.style.fontFamily },
    h4: { fontFamily: raleway.style.fontFamily },
    h5: { fontFamily: raleway.style.fontFamily },
    h6: { fontFamily: raleway.style.fontFamily },
    button: { fontFamily: raleway.style.fontFamily },
  },
  components: {
    MuiAlert: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.severity === 'info' && {
            backgroundColor: '#60a5fa',
          }),
        }),
      },
    },
  },
});

export default theme;
