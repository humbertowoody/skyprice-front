'use client';
import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Creditos } from '@/components/Creditos';
import { Estadisticas } from '@/types/estadisticas';
import { Modelos } from '@/components/Modelos';
import { Datos } from '@/components/Datos';
import Image from 'next/image';
import skyline from '/public/skyline-cdmx-sm.jpg';
import Head from 'next/head';

export default function PaginaEstadisticas() {
  // URL de la API
  const URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  // Estado para almacenar la respuesta de la API
  const [modelos, setModelos] = React.useState<Estadisticas>({
    dataset: {
      original: [7280, 8],
      training: {
        X: [5460, 8],
        y: [5460, 1],
      },
      testing: {
        X: [1820, 8],
        y: [1820, 1],
      },
    },
    models: {
      random_forest: {
        mse: 25249176011793.906,
        rmse: 0.5,
        ci: [-10038440.363616606, 9649658.970959535],
        mae: 1862306.1131962084,
        r2: 0.6473073900525679,
        feature_importances: [
          0.22086314851102917, 0.4862982467260964, 0.010336841096701101,
          0.012249836829978145, 0.03355254483238296, 0.057711009383285834,
          0.09858864607947646, 0.08039972654104995,
        ],
        max_features: 1,
        max_depth: null,
        n_estimators: 1000,
        oob_score: true,
      },
      svm: {
        mse: 77682925232851.92,
        rmse: 0.5,
        ci: [-19057204.555823408, 14117955.78904374],
        mae: 4932824.827461805,
        r2: -0.08511238687266731,
        kernel: 'rbf',
        C: 1,
        epsilon: 0.2,
      },
      neural_network: {
        mse: 35056230531442.55,
        rmse: 0.5,
        ci: [-11720523.902084958, 11491153.89185144],
        mae: 2671502.683138736,
        r2: 35159120281600,
        learning_rate: 0.0010000000474974513,
        beta_1: 0.9,
        beta_2: 0.999,
        epsilon: 1e-7,
      },
    },
  });

  // Obtener los datos de la API
  React.useEffect(() => {
    fetch(`${URL}/models`)
      .then((response) => response.json())
      .then((data) => setModelos(data));
  }, []);

  // Renderizar la página
  return (
    <React.Fragment>
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
      <NavBar />
      <Container
        sx={{
          mt: 2,
          //display: 'flex',
          //flexDirection: 'column',
          //justifyContent: 'center',
          //alignItems: 'center',
        }}>
        <Typography
          variant="h4"
          component="h1"
          sx={{
            mb: 2,
            textAlign: 'center',
            fontWeight: '600',
          }}>
          SkyPrice, plataforma de estimación de precios de mercado de
          departamentos en la Ciudad de México.
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            src={skyline}
            alt="Skyline de la Ciudad de México"
            style={{
              height: 'auto',
              width: '100%',
              maxHeight: '300px',
              border: '1px solid #000',
              borderRadius: '15px',
              flex: 1,
            }}
          />
          <Typography
            variant="body1"
            textAlign="justify"
            sx={{ flex: 1, margin: { xs: '1rem 0', md: '0 1rem' } }}>
            Para entender cómo se comportan los precios de las propiedades en la
            Ciudad de México se desarrolló una plataforma de estimación de
            precios de mercado de departamentos en la Ciudad de México. La
            plataforma permite a los usuarios estimar el precio de mercado de un
            departamento en la Ciudad de México de acuerdo a sus
            características.
          </Typography>
        </Box>
      </Container>

      <hr></hr>
      <Datos estadisticas={modelos} />

      <hr></hr>
      <Modelos estadisticas={modelos} />

      {/* Sección de gráficas alojadas en http://localhost:8000/plots con respuesta de tipo image/png */}
      <Container>
        <Box
          sx={{
            my: 4,
            display: 'flex',
            flexDirection: 'column',
          }}>
          <Typography
            variant="h5"
            component="h2"
            sx={{ mb: 2, textAlign: 'center' }}>
            Gráficas
          </Typography>
          <Box sx={{ maxWidth: 'lg' }}>
            <img
              src={`${URL}/plots`}
              alt="Gráficas de los modelos"
              style={{ width: '100%', height: 'auto' }}
            />
          </Box>
        </Box>
      </Container>

      <hr></hr>
      <Creditos />
      <Footer />
    </React.Fragment>
  );
}
