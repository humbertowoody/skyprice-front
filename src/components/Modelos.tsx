import * as React from 'react';
import { Container, Typography, Box, Grid } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Estadisticas } from '@/types/estadisticas';
import InsightsIcon from '@mui/icons-material/Insights';
import ForestIcon from '@mui/icons-material/Forest';
import HubIcon from '@mui/icons-material/Hub';
import LinearScaleIcon from '@mui/icons-material/LinearScale';
import santafe from '/public/santafe.jpg';
import Button from '@mui/material/Button';
import { useTranslation } from '@/app/i18nContext';

export const Modelos: React.FC<{ estadisticas: Estadisticas }> = ({
  estadisticas,
}) => {
  const { t } = useTranslation();
  return (
    <Container sx={{ mt: 4 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: {
            xs: 'column',
            md: 'row',
          },
          mb: 4,
          alignItems: 'center',
        }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            padding: 5,
            flex: 1,
          }}>
          <Box
            sx={{
              display: 'flex',
              gap: 2,
            }}>
            <InsightsIcon sx={{ fontSize: 30, color: 'primary.main' }} />
            <Typography variant="h5" component="h2" gutterBottom>
              {t('about.models.title')}
            </Typography>
          </Box>
          <Box sx={{ mb: 3 }}>
            <Typography
              variant="body1"
              textAlign="justify"
              dangerouslySetInnerHTML={{
                __html: t('about.models.description'),
              }}
            />
            <Typography
              variant="body1"
              textAlign="justify"
              dangerouslySetInnerHTML={{
                __html: t('about.models.description2'),
              }}
            />
          </Box>
        </Box>
        <Container
          sx={{
            flex: 1,
          }}>
          <Card elevation={4}>
            <CardMedia
              title={t('about.models.caption')}
              image={santafe.src}
              height="300"
              component="img"
            />
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography
                variant="body2"
                dangerouslySetInnerHTML={{
                  __html: t('about.models.caption'),
                }}
              />
              <Typography variant="caption" textAlign="center">
                {t('about.models.captionBy')}{' '}
                <a href="https://unsplash.com/es/@reygolens?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
                  Oscar Reygo
                </a>{' '}
                {t('about.models.captionBy2')}{' '}
                <a href="https://unsplash.com/es/fotos/vista-aerea-de-los-edificios-de-la-ciudad-durante-la-noche-HPrWl25FYcw?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
                  Unsplash
                </a>
              </Typography>
            </CardContent>
          </Card>
        </Container>
      </Box>

      <Grid container spacing={2}>
        {/* Tarjeta para Random Forest */}
        <Grid item xs={12} md={4}>
          <Card elevation={2}>
            <CardContent>
              <Box
                sx={{
                  display: 'flex',
                  gap: 2,
                  justifyContent: 'center',
                  mb: 2,
                }}>
                <ForestIcon sx={{ fontSize: 30, color: 'success.dark' }} />
                <Typography variant="h6" component="div">
                  {t('common.randomForest')}
                </Typography>
              </Box>
              <Typography variant="body2" textAlign="justify">
                {t('about.models.rf', {
                  rmse: estadisticas.models.random_forest.rmse.toFixed(2),
                  r2: (estadisticas.models.random_forest.r2 * 100).toFixed(2),
                  n_estimators: estadisticas.models.random_forest.n_estimators,
                  max_depth: estadisticas.models.random_forest.max_depth,
                })}
              </Typography>
              <Button
                variant="text"
                href="https://es.wikipedia.org/wiki/Random_forest"
                target="_blank"
                rel="noopener">
                {t('about.models.learnMore')}
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Tarjeta para SVM */}
        <Grid item xs={12} md={4}>
          <Card elevation={2}>
            <CardContent>
              <Box
                sx={{
                  display: 'flex',
                  gap: 2,
                  justifyContent: 'center',
                  mb: 2,
                }}>
                <LinearScaleIcon sx={{ fontSize: 30, color: 'warning.dark' }} />
                <Typography variant="h6" component="div">
                  {t('common.svm')}
                </Typography>
              </Box>
              <Typography variant="body2" textAlign="justify">
                {t('about.models.svm', {
                  kernel: estadisticas.models.svm.kernel,
                  r2: (estadisticas.models.svm.r2 * 100).toFixed(2),
                  C: estadisticas.models.svm.C,
                  epsilon: estadisticas.models.svm.epsilon,
                })}
              </Typography>
              <Button
                variant="text"
                href="https://es.wikipedia.org/wiki/M%C3%A1quinas_de_vectores_de_soporte"
                target="_blank"
                rel="noopener">
                {t('about.models.learnMore')}
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Tarjeta para Red Neuronal */}
        <Grid item xs={12} md={4}>
          <Card elevation={2}>
            <CardContent>
              <Box
                sx={{
                  display: 'flex',
                  gap: 2,
                  justifyContent: 'center',
                  mb: 2,
                }}>
                <HubIcon sx={{ fontSize: 30, color: 'info.dark' }} />
                <Typography variant="h6" component="div">
                  Red Neuronal
                </Typography>
              </Box>
              <Typography variant="body2" textAlign="justify">
                {t('about.models.nn', {
                  learning_rate:
                    estadisticas.models.neural_network.learning_rate.toFixed(5),
                  beta_1: estadisticas.models.neural_network.beta_1.toFixed(2),
                  beta_2: estadisticas.models.neural_network.beta_2.toFixed(2),
                  rmse: estadisticas.models.neural_network.rmse.toFixed(2),
                })}
              </Typography>
              <Button
                variant="text"
                href="https://es.wikipedia.org/wiki/Red_neuronal_artificial"
                target="_blank"
                rel="noopener">
                {t('about.models.learnMore')}
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};
