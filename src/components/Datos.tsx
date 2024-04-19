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

export const Datos: React.FC<{ estadisticas: Estadisticas }> = ({
  estadisticas,
}) => (
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
            Datos
          </Typography>
        </Box>
        <Typography variant="body1" textAlign="justify">
          Para el entrenamiento de los modelos se utilizaron conjuntos de datos
          obtenidos de plataformas de venta de propiedades en la Ciudad de
          México. Los datos fueron preprocesados y limpiados para obtener un
          conjunto de datos homogéneo y sin valores nulos.
        </Typography>
        <Typography variant="body1" textAlign="justify">
          Los datos se dividieron en dos conjuntos: uno de entrenamiento y otro
          de prueba. El conjunto de entrenamiento se utilizó para entrenar los
          modelos, mientras que el conjunto de prueba se utilizó para evaluar el
          desempeño de los modelos.
        </Typography>
      </Box>
      <Container
        sx={{
          flex: 1,
        }}>
        <Card elevation={4}>
          <CardMedia
            title="Vista aérea de la Ciudad de México"
            image={aerialcdmx.src}
            height="300"
            component="img"
          />
          <CardContent sx={{ textAlign: 'center' }}>
            <Typography variant="body2">
              Vista aérea de la Ciudad de México
            </Typography>
            <Typography variant="caption" textAlign="center">
              Foto de{' '}
              <a href="https://unsplash.com/es/@whatyouhide?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
                Andrea Leopardi
              </a>{' '}
              en{' '}
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
                Datos "limpios"
              </Typography>
            </Box>
            <Typography variant="h5" component="div">
              {estadisticas.dataset.training.X[0] +
                estadisticas.dataset.testing.X[0]}{' '}
              registros
            </Typography>
            <Typography variant="body2" textAlign={'justify'} mt={1}>
              Esto equivale al{' '}
              {(
                ((estadisticas.dataset.training.X[0] +
                  estadisticas.dataset.testing.X[0]) /
                  estadisticas.dataset.original[0]) *
                100
              ).toFixed(2)}
              % del total de datos disponibles (
              {estadisticas.dataset.original[0]} registros).
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
                Datos de entrenamiento
              </Typography>
            </Box>
            <Typography variant="h5" component="div">
              {estadisticas.dataset.training.X[0]} registros
            </Typography>
            <Typography variant="body2" textAlign={'justify'} mt={1}>
              Esto equivale al{' '}
              {(
                (estadisticas.dataset.training.X[0] /
                  (estadisticas.dataset.training.X[0] +
                    estadisticas.dataset.testing.X[0])) *
                100
              ).toFixed(2)}
              % de los datos (entrenamiento y prueba).
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
                Datos de prueba
              </Typography>
            </Box>
            <Typography variant="h5" component="div">
              {estadisticas.dataset.testing.X[0]} registros
            </Typography>
            <Typography variant="body2" textAlign={'justify'} mt={1}>
              Esto equivale al{' '}
              {(
                (estadisticas.dataset.testing.X[0] /
                  (estadisticas.dataset.training.X[0] +
                    estadisticas.dataset.testing.X[0])) *
                100
              ).toFixed(2)}
              % de los datos (entrenamiento y prueba).
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  </Container>
);
