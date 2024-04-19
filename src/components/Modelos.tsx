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

export const Modelos: React.FC<{ estadisticas: Estadisticas }> = ({
  estadisticas,
}) => (
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
        sx={{ display: 'flex', flexDirection: 'column', padding: 5, flex: 1 }}>
        <Box
          sx={{
            display: 'flex',
            gap: 2,
          }}>
          <InsightsIcon sx={{ fontSize: 30, color: 'primary.main' }} />
          <Typography variant="h5" component="h2" gutterBottom>
            Modelos
          </Typography>
        </Box>
        <Box sx={{ mb: 3 }}>
          <Typography variant="body1" textAlign="justify">
            Ahora hablaremos de los algoritmos de aprendizaje automático que
            utiliza <strong>SkyPrice</strong>. Aquí, se presentan estadísticas
            de cada modelo utilizado para la estimación de precios de
            departamentos en la Ciudad de México. Los modelos, que incluyen{' '}
            <strong>Random Forest</strong>, <strong>SVM</strong> y{' '}
            <strong>Redes Neuronales</strong>, han sido meticulosamente
            configurados y entrenados con una variedad de hiperparámetros para
            optimizar su rendimiento en la predicción de precios.
          </Typography>
          <Typography variant="body1" textAlign="justify">
            Esta sección desglosa los resultados obtenidos, incluyendo el{' '}
            <i>Error Absoluto Medio (MAE)</i>, el{' '}
            <i>coeficiente de determinación (r²)</i> coeficiente de
            determinación y el <i>Error Cuadrático Medio (MSAE)</i>, junto con
            gráficas de ajuste que comparan las predicciones con los datos de
            entrenamiento, proporcionando una visión clara de la eficacia y la
            precisión de cada modelo.
          </Typography>
        </Box>
      </Box>
      <Container
        sx={{
          flex: 1,
        }}>
        <Card elevation={4}>
          <CardMedia
            title="Vista aérea de la Ciudad de México"
            image={santafe.src}
            height="300"
            component="img"
          />
          <CardContent sx={{ textAlign: 'center' }}>
            <Typography variant="body2">
              Parque <i>La Mexicana</i>, Santa Fe, Ciudad de México
            </Typography>
            <Typography variant="caption" textAlign="center">
              Foto de{' '}
              <a href="https://unsplash.com/es/@reygolens?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
                Oscar Reygo
              </a>{' '}
              en{' '}
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
              sx={{ display: 'flex', gap: 2, justifyContent: 'center', mb: 2 }}>
              <ForestIcon sx={{ fontSize: 30, color: 'success.dark' }} />
              <Typography variant="h6" component="div">
                Random Forest
              </Typography>
            </Box>
            <Typography variant="body2" textAlign="justify">
              Random Forest es un modelo compuesto por múltiples árboles de
              decisión y es efectivo para prevenir el sobreajuste. Con un RMSE
              de {estadisticas.models.random_forest.rmse.toFixed(2)} y un
              coeficiente R2 del{' '}
              {(estadisticas.models.random_forest.r2 * 100).toFixed(2)}%, este
              modelo destaca por su precisión predictiva. Se configuró con{' '}
              {estadisticas.models.random_forest.n_estimators} árboles y una
              profundidad máxima de{' '}
              {estadisticas.models.random_forest.max_depth}. La puntuación OOB
              indica su desempeño sin validación cruzada adicional.
            </Typography>
            <Button
              variant="text"
              href="https://es.wikipedia.org/wiki/Random_forest"
              target="_blank"
              rel="noopener">
              Aprender más
            </Button>
          </CardContent>
        </Card>
      </Grid>

      {/* Tarjeta para SVM */}
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
              El SVM utiliza un kernel {estadisticas.models.svm.kernel} para
              manejar relaciones no lineales. Con un valor de R2 de{' '}
              {estadisticas.models.svm.r2.toFixed(2)}, el modelo se ha
              configurado con un parámetro C de {estadisticas.models.svm.C} y un
              epsilon de {estadisticas.models.svm.epsilon}, ajustando el margen
              de error y la frontera de decisión.
            </Typography>
            <Button
              variant="text"
              href="https://es.wikipedia.org/wiki/M%C3%A1quinas_de_vectores_de_soporte"
              target="_blank"
              rel="noopener">
              Aprender más
            </Button>
          </CardContent>
        </Card>
      </Grid>

      {/* Tarjeta para Red Neuronal */}
      <Grid item xs={12} md={4}>
        <Card elevation={2}>
          <CardContent>
            <Box
              sx={{ display: 'flex', gap: 2, justifyContent: 'center', mb: 2 }}>
              <HubIcon sx={{ fontSize: 30, color: 'info.dark' }} />
              <Typography variant="h6" component="div">
                Red Neuronal
              </Typography>
            </Box>
            <Typography variant="body2" textAlign="justify">
              La Red Neuronal utiliza un ritmo de aprendizaje de{' '}
              {estadisticas.models.neural_network.learning_rate.toFixed(5)} y
              parámetros beta1 y beta2 ajustados a{' '}
              {estadisticas.models.neural_network.beta_1.toFixed(2)} y{' '}
              {estadisticas.models.neural_network.beta_2.toFixed(2)}. El RMSE
              alcanzado es de{' '}
              {estadisticas.models.neural_network.rmse.toFixed(2)}, evidenciando
              su capacidad predictiva en la estimación de precios.
            </Typography>
            <Button
              variant="text"
              href="https://es.wikipedia.org/wiki/Red_neuronal_artificial"
              target="_blank"
              rel="noopener">
              Aprender más
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  </Container>
);
