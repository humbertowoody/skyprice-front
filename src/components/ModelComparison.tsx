import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { Container, Card, CardContent, Typography, Box } from '@mui/material';
import { useTranslation } from '@/app/i18nContext';
import useMediaQuery from '@mui/material/useMediaQuery';
import theme from '@/theme';
import { axisClasses } from '@mui/x-charts';

function logScaleValue(value: number): number {
  // Using Math.log1p to ensure no issues with log(0) which returns -Infinity
  return Math.log1p(value);
}

export default function ModelComparison({ models }) {
  // Get the translation function
  const { t } = useTranslation();

  // Media query to check if the screen is small
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  // Function to normalize the data
  const minMax = (data: any) => {
    const min =
      Math.min(data.random_forest, data.svm, data.neural_network) * 0.9;
    const max =
      Math.max(data.random_forest, data.svm, data.neural_network) * 1.1;

    if (min === max) {
      // Si todos los valores son iguales, devolvemos 0.5 para todos ellos
      return {
        ...data,
        random_forest: 0.5,
        svm: 0.5,
        neural_network: 0.5,
      };
    }

    return {
      ...data,
      random_forest: (data.random_forest - min) / (max - min),
      svm: (data.svm - min) / (max - min),
      neural_network: (data.neural_network - min) / (max - min),
    };
  };

  // Data for the chart
  const dataset = [
    {
      metric: 'MSE',
      random_forest: logScaleValue(models.random_forest.mse),
      svm: logScaleValue(models.svm.mse),
      neural_network: logScaleValue(models.neural_network.mse),
    },
    {
      metric: 'RMSE',
      random_forest: logScaleValue(models.random_forest.rmse),
      svm: logScaleValue(models.svm.rmse),
      neural_network: logScaleValue(models.neural_network.rmse),
    },
    {
      metric: 'MAE',
      random_forest: logScaleValue(models.random_forest.mae),
      svm: logScaleValue(models.svm.mae),
      neural_network: logScaleValue(models.neural_network.mae),
    },
    {
      metric: 'R2',
      random_forest: models.random_forest.r2,
      svm: models.svm.r2,
      neural_network: models.neural_network.r2,
    },
  ];

  // Normalize the data
  const scaled_dataset = dataset.map((data) => minMax(data));

  return (
    <Container sx={{ mt: 4 }}>
      <Card elevation={4}>
        <CardContent sx={{ textAlign: 'center' }}>
          <Typography variant="h5" component="div" sx={{ mt: 4 }}>
            {t('about.models.comparisonTitle')}
          </Typography>

          {/* Container for Chart to be responsive */}
          <Box sx={{ width: '100%', height: 400 }}>
            {isSmallScreen ? (
              <BarChart
                dataset={scaled_dataset}
                yAxis={[{ scaleType: 'band', dataKey: 'metric' }]}
                xAxis={[
                  { label: t('about.models.yAxisLabel'), min: -0.1, max: 1.1 },
                ]}
                sx={{
                  [`.${axisClasses.left} .${axisClasses.label}`]: {
                    transform: 'translate(-20px, 0)',
                  },
                }}
                grid={{ vertical: true }}
                layout="horizontal"
                series={[
                  {
                    dataKey: 'random_forest',
                    label: t('common.randomForestShort'),
                  },
                  { dataKey: 'svm', label: t('common.svmShort') },
                  {
                    dataKey: 'neural_network',
                    label: t('common.neuralNetworkShort'),
                  },
                ]}
                slotProps={{
                  legend: {
                    direction: 'column',
                    position: {
                      vertical: 'top',
                      horizontal: 'right',
                    },
                    labelStyle: {
                      fontSize: 12,
                    },
                  },
                }}
              />
            ) : (
              <BarChart
                dataset={scaled_dataset}
                xAxis={[{ scaleType: 'band', dataKey: 'metric' }]}
                yAxis={[
                  { label: t('about.models.yAxisLabel'), min: -0.1, max: 1.1 },
                ]}
                sx={{
                  [`.${axisClasses.left} .${axisClasses.label}`]: {
                    transform: 'translate(-10px, 0)',
                  },
                }}
                grid={{ horizontal: true }}
                series={[
                  { dataKey: 'random_forest', label: t('common.randomForest') },
                  { dataKey: 'svm', label: t('common.svm') },
                  {
                    dataKey: 'neural_network',
                    label: t('common.neuralNetwork'),
                  },
                ]}
              />
            )}
          </Box>
          <Typography variant="caption" textAlign="center">
            {t('about.models.comparisonDescription')}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
}
