import * as React from 'react';
import { Container, Typography, Box } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Estadisticas } from '@/types/estadisticas';

export const Modelos: React.FC<{ estadisticas: Estadisticas }> = ({
  estadisticas,
}) => (
  <Container sx={{ mt: 4 }}>
    <Typography variant="h5" component="h2" sx={{ mt: 4 }}>
      Modelos
    </Typography>
    <Box sx={{ maxWidth: 'sm' }}>
      <Typography variant="body1" gutterBottom>
        En esta sección se muestran las estadísticas de los modelos entrenados
        para la estimación de precios de propiedades. Los modelos fueron
        entrenados con diferentes configuraciones y parámetros para obtener el
        mejor desempeño en la predicción de precios.
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
            Random Forest
          </Typography>
          <Typography variant="body2">
            <strong>RMSE:</strong> {estadisticas.models.random_forest.rmse}
          </Typography>
          <Typography variant="body2">
            <strong>MSE:</strong> {estadisticas.models.random_forest.mse}
          </Typography>
          <Typography variant="body2">
            <strong>CI:</strong> {estadisticas.models.random_forest.ci[0]} -{' '}
            {estadisticas.models.random_forest.ci[1]}
          </Typography>
          <Typography variant="body2">
            <strong>MAE:</strong> {estadisticas.models.random_forest.mae}
          </Typography>
          <Typography variant="body2">
            <strong>R2:</strong>{' '}
            {(estadisticas.models.random_forest.r2 * 100).toFixed(2)}%
          </Typography>
          <Typography variant="body2">
            <strong>Importancia de características:</strong>{' '}
            {estadisticas.models.random_forest.feature_importances.map(
              (importance, index) => (
                <span key={index}>
                  {importance.toFixed(2)}
                  {index <
                  estadisticas.models.random_forest.feature_importances.length -
                    1
                    ? ', '
                    : ''}
                </span>
              ),
            )}
          </Typography>
          <Typography variant="body2">
            <strong>Max features:</strong>{' '}
            {estadisticas.models.random_forest.max_features}
          </Typography>
          <Typography variant="body2">
            <strong>Max depth:</strong>{' '}
            {estadisticas.models.random_forest.max_depth}
          </Typography>
          <Typography variant="body2">
            <strong>N estimators:</strong>{' '}
            {estadisticas.models.random_forest.n_estimators}
          </Typography>
          <Typography variant="body2">
            <strong>OOB score:</strong>{' '}
            {estadisticas.models.random_forest.oob_score ? 'Sí' : 'No'}
          </Typography>
        </CardContent>
      </Card>

      <Card variant="outlined" sx={{ maxWidth: 345 }}>
        <CardContent>
          <Typography variant="h6" component="div">
            SVM
          </Typography>
          <Typography variant="body2">
            <strong>RMSE:</strong> {estadisticas.models.svm.rmse}
          </Typography>
          <Typography variant="body2">
            <strong>MSE:</strong> {estadisticas.models.svm.mse}
          </Typography>
          <Typography variant="body2">
            <strong>CI:</strong> {estadisticas.models.svm.ci[0]} -{' '}
            {estadisticas.models.svm.ci[1]}
          </Typography>
          <Typography variant="body2">
            <strong>MAE:</strong> {estadisticas.models.svm.mae}
          </Typography>
          <Typography variant="body2">
            <strong>R2:</strong> {estadisticas.models.svm.r2}
          </Typography>
          <Typography variant="body2">
            <strong>Kernel:</strong> {estadisticas.models.svm.kernel}
          </Typography>
          <Typography variant="body2">
            <strong>C:</strong> {estadisticas.models.svm.C}
          </Typography>
          <Typography variant="body2">
            <strong>Epsilon:</strong> {estadisticas.models.svm.epsilon}
          </Typography>
        </CardContent>
      </Card>

      <Card variant="outlined" sx={{ maxWidth: 345 }}>
        <CardContent>
          <Typography variant="h6" component="div">
            Red Neuronal
          </Typography>
          <Typography variant="body2">
            <strong>RMSE:</strong> {estadisticas.models.neural_network.rmse}
          </Typography>
          <Typography variant="body2">
            <strong>MSE:</strong>{' '}
            {(estadisticas.models.neural_network.mse * 100).toFixed(2)}%
          </Typography>
          <Typography variant="body2">
            <strong>CI:</strong> {estadisticas.models.neural_network.ci[0]} -{' '}
            {estadisticas.models.neural_network.ci[1]}
          </Typography>
          <Typography variant="body2">
            <strong>MAE:</strong> {estadisticas.models.neural_network.mae}
          </Typography>
          <Typography variant="body2">
            <strong>R2:</strong>{' '}
            {(estadisticas.models.neural_network.r2 * 100).toFixed(2)}%
          </Typography>
          <Typography variant="body2">
            <strong>Learning rate:</strong>{' '}
            {estadisticas.models.neural_network.learning_rate}%
          </Typography>
          <Typography variant="body2">
            <strong>Beta 1:</strong>{' '}
            {estadisticas.models.neural_network.beta_1.toFixed(2)}
          </Typography>
          <Typography variant="body2">
            <strong>Beta 2:</strong>{' '}
            {estadisticas.models.neural_network.beta_2.toFixed(2)}
          </Typography>
          <Typography variant="body2">
            <strong>Epsilon:</strong>{' '}
            {estadisticas.models.neural_network.epsilon.toFixed(2)}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  </Container>
);
