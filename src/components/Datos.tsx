import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  Grid,
} from '@mui/material';
import React from 'react';
import { Estadisticas } from '@/types/estadisticas';
import StorageIcon from '@mui/icons-material/Storage';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import RuleIcon from '@mui/icons-material/Rule';
import CardMedia from '@mui/material/CardMedia';
import aerialcdmx from '/public/aerial-cdmx.jpg';
import { useTranslation } from '@/app/i18nContext';

export const Datos: React.FC<{ estadisticas: Estadisticas }> = ({
  estadisticas,
}) => {
  const { t } = useTranslation();
  return (
    <Container sx={{ my: 4 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          mb: 4,
        }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: 5,
            flex: 1,
          }}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <StorageIcon sx={{ fontSize: 30, color: 'primary.main' }} />
            <Typography variant="h5" component="h2">
              {t('about.data.title')}
            </Typography>
          </Box>
          <Typography variant="body1" textAlign="justify">
            {t('about.data.description1')}
          </Typography>
          <Typography variant="body1" textAlign="justify">
            {t('about.data.description2')}
          </Typography>
        </Box>
        <Container
          sx={{
            flex: 1,
          }}>
          <Card elevation={4}>
            <CardMedia
              title={t('about.data.caption')}
              image={aerialcdmx.src}
              height="300"
              component="img"
            />
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="body2">{t('about.data.caption')}</Typography>
              <Typography variant="caption" textAlign="center">
                {t('about.data.captionBy')}{' '}
                <a href="https://unsplash.com/es/@whatyouhide?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
                  Andrea Leopardi
                </a>{' '}
                {t('about.data.captionBy2')}{' '}
                <a href="https://unsplash.com/es/fotos/coches-surtidos-en-la-vista-aerea-de-la-calle-N17c03GJGKc?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
                  Unsplash
                </a>
              </Typography>
            </CardContent>
          </Card>
        </Container>
      </Box>
      <Grid container spacing={2} textAlign={'center'}>
        <Grid item xs={12} md={4}>
          <Card elevation={2}>
            <CardContent>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                <RuleIcon sx={{ fontSize: 30, color: 'secondary.dark' }} />
                <Typography variant="h6" component="div">
                  {t('about.data.cleanData.title')}
                </Typography>
              </Box>
              <Typography variant="h5" component="div">
                {t('about.data.cleanData.amount', {
                  amount:
                    estadisticas.dataset.training.X[0] +
                    estadisticas.dataset.testing.X[0],
                })}
              </Typography>
              <Typography variant="body2" textAlign={'justify'} mt={1}>
                {t('about.data.cleanData.description', {
                  percentage: (
                    ((estadisticas.dataset.training.X[0] +
                      estadisticas.dataset.testing.X[0]) /
                      estadisticas.dataset.original[0]) *
                    100
                  ).toFixed(2),
                  amount: estadisticas.dataset.original[0],
                })}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card elevation={2}>
            <CardContent>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                <LocalLibraryIcon
                  sx={{ fontSize: 30, color: 'secondary.dark' }}
                />
                <Typography variant="h6" component="div">
                  {t('about.data.trainingData.title')}
                </Typography>
              </Box>
              <Typography variant="h5" component="div">
                {t('about.data.trainingData.amount', {
                  amount: estadisticas.dataset.training.X[0],
                })}
              </Typography>
              <Typography variant="body2" textAlign={'justify'} mt={1}>
                {t('about.data.trainingData.description', {
                  percentage: (
                    (estadisticas.dataset.training.X[0] /
                      (estadisticas.dataset.training.X[0] +
                        estadisticas.dataset.testing.X[0])) *
                    100
                  ).toFixed(2),
                })}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card elevation={2}>
            <CardContent>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                <FactCheckIcon sx={{ fontSize: 30, color: 'secondary.dark' }} />
                <Typography variant="h6" component="div">
                  {t('about.data.testData.title')}
                </Typography>
              </Box>
              <Typography variant="h5" component="div">
                {t('about.data.testData.amount', {
                  amount: estadisticas.dataset.testing.X[0],
                })}
              </Typography>
              <Typography variant="body2" textAlign={'justify'} mt={1}>
                {t('about.data.testData.description', {
                  percentage: (
                    (estadisticas.dataset.testing.X[0] /
                      (estadisticas.dataset.training.X[0] +
                        estadisticas.dataset.testing.X[0])) *
                    100
                  ).toFixed(2),
                })}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};
