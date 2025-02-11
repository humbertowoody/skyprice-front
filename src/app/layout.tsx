import * as React from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/theme';
import { Metadata } from 'next';
import Script from 'next/script';
import skylinecdmxxs from '/public/skyline-cdmx-xs.jpg';
import { I18nProvider } from './i18nContext';

// Metadata for SEO
export const metadata: Metadata = {
  metadataBase: new URL('https://skyprice.xyz'),
  title: {
    default: 'SkyPrice',
    template: '%s | SkyPrice',
  },
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
    card: 'summary_large_image',
    title: 'SkyPrice',
    description: 'Estima el precio de tu departamento en la Ciudad de México',
    creator: '@humbertowoody',
    site: '@humbertowoody',
    images: [`https://skyprice.xyz${skylinecdmxxs.src}`],
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
        url: `https://skyprice.xyz${skylinecdmxxs.src}`,
        width: 640,
        height: 640,
        alt: 'SkyPrice, estima el precio de tu departamento en la Ciudad de México',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
    },
  },
};

export default function RootLayout(props: { children: React.ReactNode }) {
  const urlgtm: string = `https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`;
  return (
    <html lang="en">
      <Script src={urlgtm} />
      <Script>
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}');
          `}
      </Script>
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <I18nProvider>{props.children}</I18nProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
