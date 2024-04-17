import * as React from 'react';
import { Container, Typography, Box, Grid } from '@mui/material';
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

    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <Card variant="outlined" sx={{ maxWidth: 345 }}>
          <CardContent>
            <Typography variant="h6" component="div">
              Random Forest
            </Typography>
            <Typography variant="body2">
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
        <Card variant="outlined" sx={{ maxWidth: 345 }}>
          <CardContent>
            <Typography variant="h6" component="div">
              SVM
            </Typography>

            <Typography variant="body2">
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
        <Card variant="outlined" sx={{ maxWidth: 345 }}>
          <CardContent>
            <Typography variant="h6" component="div">
              Red Neuronal
            </Typography>

            <Typography variant="body2">
              La <strong>Red Neuronal</strong> emplea un ritmo de aprendizaje de{' '}
              <strong>
                {estadisticas.models.neural_network.learning_rate}
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
              <strong>{estadisticas.models.neural_network.rmse}</strong>, el
              modelo muestra su eficacia en ajustarse y predecir con alta
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
