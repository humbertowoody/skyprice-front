import * as React from 'react';
import { Container, Typography, Box, Grid } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Estadisticas } from '@/types/estadisticas';
import InsightsIcon from '@mui/icons-material/Insights';
import ForestIcon from '@mui/icons-material/Forest';
import HubIcon from '@mui/icons-material/Hub';
import LinearScaleIcon from '@mui/icons-material/LinearScale';

export const Modelos: React.FC<{ estadisticas: Estadisticas }> = ({
  estadisticas,
}) => (
  <Container sx={{ mt: 4 }}>
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        mt: 4,
      }}>
      <InsightsIcon sx={{ fontSize: 30, color: 'primary.main' }} />
      <Typography variant="h5" component="h2" gutterBottom>
        Modelos
      </Typography>
    </Box>
    <Box sx={{ maxWidth: 'sm', mb: 3 }}>
      <Typography variant="body1" textAlign="justify">
        En esta sección se muestran las estadísticas de los modelos entrenados
        para la estimación de precios de propiedades. Los modelos fueron
        entrenados con diferentes configuraciones y parámetros para obtener el
        mejor desempeño en la predicción de precios.
      </Typography>
    </Box>

    <Grid container spacing={2}>
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
                Random Forest
              </Typography>
            </Box>
            <Typography variant="body2" textAlign="justify">
              El modelo <strong>Random Forest</strong>, conocido por su
              capacidad para manejar múltiples tipos de datos y su resistencia
              al <i>sobreajuste</i>, muestra un <strong>RMSE</strong> de{' '}
              <strong>{estadisticas.models.random_forest.rmse}</strong>,
              indicativo de un error medio bajo. Utiliza{' '}
              <strong>{estadisticas.models.random_forest.n_estimators}</strong>{' '}
              árboles de decisión, cada uno con un máximo de{' '}
              <strong>{estadisticas.models.random_forest.max_features}</strong>{' '}
              características consideradas, proporcionando una robustez
              considerable al modelo. El <strong>R2</strong> de{' '}
              <strong>
                {(estadisticas.models.random_forest.r2 * 100).toFixed(2)}%
              </strong>{' '}
              refleja una capacidad predictiva efectiva. La puntuación{' '}
              <i>OOB</i> (
              {estadisticas.models.random_forest.oob_score
                ? 'activa'
                : 'inactiva'}
              ) ayuda a evaluar la precisión sin necesidad de validación cruzada
              separada. Importancias de características como{' '}
              <i>
                {estadisticas.models.random_forest.feature_importances.map(
                  (importance, index) =>
                    `${importance.toFixed(2)}${
                      index <
                      estadisticas.models.random_forest.feature_importances
                        .length -
                        1
                        ? ', '
                        : ''
                    }`,
                )}
              </i>{' '}
              informan sobre la contribución de cada variable al modelo.
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={4}>
        <Card elevation={2}>
          <CardContent>
            <Box
              sx={{ display: 'flex', gap: 2, justifyContent: 'center', mb: 2 }}>
              <LinearScaleIcon sx={{ fontSize: 30, color: 'warning.dark' }} />
              <Typography variant="h6" component="div">
                SVM
              </Typography>
            </Box>

            <Typography variant="body2" textAlign="justify">
              El <strong>SVM</strong> (Máquinas de Vectores de Soporte) utiliza
              un kernel <i>{estadisticas.models.svm.kernel}</i>, ideal para
              capturar relaciones no lineales entre características. El{' '}
              <strong>R2</strong> actual es de{' '}
              <strong>{estadisticas.models.svm.r2}</strong>, y se manejan
              parámetros como <strong>C ({estadisticas.models.svm.C})</strong> y{' '}
              <i>epsilon ({estadisticas.models.svm.epsilon})</i>, que determinan
              el margen de error y la suavidad de la frontera de decisión,
              respectivamente. Los valores de <strong>MSE</strong> y{' '}
              <strong>RMSE</strong> reflejan la precisión y consistencia del
              modelo en la estimación de precios.
            </Typography>
          </CardContent>
        </Card>
      </Grid>

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
              La <strong>Red Neuronal</strong> emplea un ritmo de aprendizaje de{' '}
              <strong>
                {estadisticas.models.neural_network.learning_rate.toFixed(5)}
              </strong>
              , con parámetros de optimización <i>beta1</i> y <i>beta2</i>{' '}
              ajustados a{' '}
              <strong>
                {estadisticas.models.neural_network.beta_1.toFixed(2)}
              </strong>{' '}
              y{' '}
              <strong>
                {estadisticas.models.neural_network.beta_2.toFixed(2)}
              </strong>
              , respectivamente. Estos ajustes son cruciales para el control del
              descenso del gradiente durante el entrenamiento. Con un{' '}
              <strong>RMSE</strong> de{' '}
              <strong>
                {estadisticas.models.neural_network.rmse.toFixed(2)}
              </strong>
              , el modelo muestra su eficacia en ajustarse y predecir con alta
              precisión. La métrica <strong>R2</strong> de{' '}
              <strong>
                {(estadisticas.models.neural_network.r2 * 100).toFixed(2)}%
              </strong>{' '}
              destaca su capacidad predictiva en el contexto de precios de
              propiedades.
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  </Container>
);
