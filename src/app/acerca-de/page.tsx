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
import { Paper, Grid, Card, CardContent, CardMedia } from '@mui/material';
import ApiIcon from '@mui/icons-material/Api';
import Button from '@mui/material/Button';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import SellIcon from '@mui/icons-material/Sell';
import swaggerlogo from '/public/swagger-logo.png';
import redoclogo from '/public/redoc-logo.png';
import reformasm from '/public/reforma-sm.jpg';
import Link from 'next/link';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import { useTranslation } from '../i18nContext';
import ModelComparison from '@/components/ModelComparison';

export default function PaginaEstadisticas() {
  // Traducción de la página
  const { t } = useTranslation();

  // URL de la API
  const URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  const [copySuccess, setCopySuccess] = React.useState('');

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

  // Función para copiar el URL al portapapeles
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(URL);
      setCopySuccess(t('about.copySuccess'));
    } catch (err) {
      setCopySuccess(t('about.copyError'));
    }
  };

  // Renderizar la página
  return (
    <React.Fragment>
      <NavBar />

      <Container
        sx={{
          mt: 2,
          mb: 2,
        }}>
        <Typography
          variant="h4"
          component="h1"
          sx={{
            mb: 2,
            textAlign: 'center',
            fontWeight: '600',
          }}>
          <strong>SkyPrice</strong>, {t('about.title')}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Container
            sx={{
              flex: 1,
            }}>
            <Card elevation={10}>
              <CardMedia
                title={t('about.caption')}
                image={reformasm.src}
                component="img"
              />
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="body2">{t('about.caption')}</Typography>
                <Typography variant="caption" textAlign="center">
                  {t('about.captionBy')}{' '}
                  <a href="https://unsplash.com/es/@carlosaranda?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
                    carlos aranda
                  </a>{' '}
                  {t('about.captionBy2')}{' '}
                  <a href="https://unsplash.com/es/fotos/edificios-de-gran-altura-durante-el-dia-pH6iuFEqUu8?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
                    Unsplash
                  </a>
                </Typography>
              </CardContent>
            </Card>
          </Container>

          <Box
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              my: { xs: 10, md: 2 },
              mx: { xs: 2, md: 5 },
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Typography variant="h5" component="h2" sx={{ mb: 2, flex: 1 }}>
              {t('about.question')} <strong>SkyPrice</strong>?
            </Typography>
            <Typography
              variant="body1"
              textAlign="justify"
              sx={{ flex: 1 }}
              dangerouslySetInnerHTML={{ __html: t('about.description') }}
            />
            <Link href="/" passHref>
              <Button
                variant="contained"
                endIcon={<SellIcon />}
                sx={{ flex: 1, textTransform: 'none', fontWeight: 600, mt: 2 }}>
                {t('about.button')}
              </Button>
            </Link>
          </Box>
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
            gap: 2,
            alignItems: 'center',
          }}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <AutoGraphIcon sx={{ fontSize: 30, color: 'primary.main' }} />
            <Typography variant="h5" component="div">
              {t('about.models.chartsTitle')}
            </Typography>
          </Box>
          <Box sx={{ maxWidth: 'lg' }}>
            <img
              src={`${URL}/plots`}
              alt={t('about.models.chartsTitle')}
              style={{ width: '100%', height: 'auto' }}
            />
          </Box>
          {/*Botón para abrir las gráficas en otra pestaña*/}
          <Link href={`${URL}/plots`} target="_blank" rel="noopener" passHref>
            <Button
              variant="outlined"
              endIcon={<OpenInNewIcon />}
              startIcon={<ZoomInIcon />}
              sx={{ mt: 2, textTransform: 'none' }}>
              {t('about.models.chartsBtn')}
            </Button>
          </Link>

          {/* Gráficas de comparación de modelos */}
          <ModelComparison models={modelos.models} />
        </Box>
      </Container>

      {/*Sección con información del API pública URL, URL del swagger, URL de redoc, etc*/}
      <hr></hr>
      <Container>
        <Box
          sx={{
            my: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <ApiIcon sx={{ fontSize: 50, color: 'primary.main' }} />
          <Typography
            variant="h5"
            component="h2"
            sx={{ mt: 2, mb: 3, textAlign: 'center' }}
            dangerouslySetInnerHTML={{ __html: t('about.api.title') }}
          />
          <Typography variant="body1" textAlign="center" sx={{ mb: 3 }}>
            {t('about.api.description')}
          </Typography>

          {/* Mostrar el base endpoint en un tipo de texto para código */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              mt: 2,
              mb: 3,
            }}>
            <Button
              variant="outlined"
              startIcon={<ContentCopyIcon />}
              onClick={handleCopy}
              sx={{
                mb: 2,
              }}>
              <Typography
                variant="button"
                component="div"
                sx={{
                  fontFamily: 'monospace',
                  textTransform: 'lowercase',
                }}>
                {URL}
              </Typography>
            </Button>
            {copySuccess && (
              <Typography variant="caption" sx={{ color: 'success.main' }}>
                {copySuccess}
              </Typography>
            )}
          </Box>

          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} sm={6} md={4}>
              <Paper elevation={3} sx={{ p: 2 }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    src={swaggerlogo}
                    alt="Swagger"
                    width={30}
                    height={30}
                    style={{ marginRight: 1 }}
                  />
                  <Typography variant="h6">Swagger UI</Typography>
                </Box>
                <Typography
                  variant="body2"
                  component="div"
                  textAlign="justify"
                  sx={{ mt: 1, mb: 1 }}>
                  {t('about.api.swagger')}
                </Typography>
                <Link href={`${URL}/openapi`} target="_blank" rel="noopener">
                  <Button startIcon={<OpenInNewIcon />}>
                    {t('about.api.visitSwagger')}
                  </Button>
                </Link>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Paper elevation={3} sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Image
                    src={redoclogo}
                    alt="ReDoc"
                    width={30}
                    height={30}
                    style={{ marginRight: 1 }}
                  />
                  <Typography variant="h6">ReDoc</Typography>
                </Box>
                <Typography
                  variant="body2"
                  component="div"
                  textAlign="justify"
                  sx={{ mt: 1, mb: 1 }}>
                  {t('about.api.redoc')}
                </Typography>
                <Link href={`${URL}/redoc`} target="_blank" rel="noopener">
                  <Button startIcon={<OpenInNewIcon />}>
                    {t('about.api.visitRedoc')}
                  </Button>
                </Link>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Container>

      <hr></hr>
      <Creditos />
      <Footer />
    </React.Fragment>
  );
}
