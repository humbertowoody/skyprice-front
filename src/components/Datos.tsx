import { Box, Card, CardContent, Typography } from '@mui/material';
import React from 'react';
import { Estadisticas } from '@/types/estadisticas';

export const Datos: React.FC<{ estadisticas: Estadisticas }> = ({
  estadisticas,
}) => (
  <Box sx={{ mt: 4 }}>
    <Typography variant="h5" component="h2" sx={{ mt: 4 }}>
      Datos
    </Typography>
    <Box sx={{ maxWidth: 'sm' }}>
      <Typography variant="body1" gutterBottom>
        Para el entrenamiento de los estadisticas.se utilizaron conjuntos de
        datos obtenidos de plataformas de venta de propiedades en la Ciudad de
        México. Los datos fueron preprocesados y limpiados para obtener un
        conjunto de datos homogéneo y sin valores nulos.
      </Typography>
    </Box>
    <Box
      sx={{
        mt: 4,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        gap: 2,
      }}>
      <Card variant="outlined" sx={{ maxWidth: 345 }}>
        <CardContent>
          <Typography variant="h6" component="div">
            Datos "limpios"
          </Typography>
          <Typography variant="h5" component="div">
            {estadisticas.dataset.training.X[0] +
              estadisticas.dataset.testing.X[0]}{' '}
            registros de {estadisticas.dataset.training.X[1]} características
          </Typography>
          <Typography variant="body2">
            Esto equivale al{' '}
            {(
              ((estadisticas.dataset.training.X[0] +
                estadisticas.dataset.testing.X[0]) /
                estadisticas.dataset.original[0]) *
              100
            ).toFixed(2)}
            % del total de datos disponibles ({estadisticas.dataset.original[0]}{' '}
            registros).
          </Typography>
        </CardContent>
      </Card>
      <Card variant="outlined" sx={{ maxWidth: 345 }}>
        <CardContent>
          <Typography variant="h6" component="div">
            Datos de entrenamiento
          </Typography>
          <Typography variant="h5" component="div">
            {estadisticas.dataset.training.X[0]} registros de{' '}
            {estadisticas.dataset.training.X[1]} características
          </Typography>
          <Typography variant="body2">
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
      <Card variant="outlined" sx={{ maxWidth: 345 }}>
        <CardContent>
          <Typography variant="h6" component="div">
            Datos de prueba
          </Typography>
          <Typography variant="h5" component="div">
            {estadisticas.dataset.testing.X[0]} registros de{' '}
            {estadisticas.dataset.testing.X[1]} características
          </Typography>
          <Typography variant="body2">
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
    </Box>
  </Box>
);
