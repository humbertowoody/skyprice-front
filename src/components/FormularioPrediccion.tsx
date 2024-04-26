'use client';
import React, { Fragment, ReactElement, useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  InputAdornment,
  MenuItem,
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
  Autocomplete,
  useJsApiLoader,
  GoogleMap,
  Marker,
} from '@react-google-maps/api';
import InfoIcon from '@mui/icons-material/Info';
import BedIcon from '@mui/icons-material/Bed';
import BathtubIcon from '@mui/icons-material/Bathtub';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import Image from 'next/image';
import departamentoIsometrico from '/public/departamento-isometrico.svg';
import CurrencyConverter from './CurrencyConverter';
import { useTranslation } from '../app/i18nContext';

// Declarar un array statico para las librerias de Google Maps
const libraries: any[] = ['places'];

// Alcaldías
const alcaldias: string[] = [
  'Álvaro Obregón',
  'Azcapotzalco',
  'Benito Juárez',
  'Coyoacán',
  'Cuajimalpa de Morelos',
  'Cuauhtémoc',
  'Gustavo A. Madero',
  'Iztacalco',
  'Iztapalapa',
  'Magdalena Contreras',
  'Miguel Hidalgo',
  'Milpa Alta',
  'Tláhuac',
  'Tlalpan',
  'Venustiano Carranza',
  'Xochimilco',
];

// Interfaz para el body de la petición POST a la API
interface PredictionsForm {
  Size_Terrain?: number;
  Size_Construction?: number;
  Rooms?: number;
  Bathrooms?: number;
  Parking?: number;
  Age?: number;
  Lat?: number;
  Lng?: number;
  Municipality?: string;
}

interface ExtendedPredictionsForm extends PredictionsForm {
  address: string;
  fecha: Date;
}

export default function PredictionForm() {
  // Traducción de textos
  const { t } = useTranslation();

  // Esquema de validación para el formulario
  const validationSchema = yup.object({
    Size_Terrain: yup
      .number()
      .required(t('predictionForm.validations.sizeTerrainRequired'))
      .min(10, t('predictionForm.validations.sizeTerrainMin', { min: 10 }))
      .max(1000, t('predictionForm.validations.sizeTerrainMax', { max: 1000 })),
    Size_Construction: yup
      .number()
      .required(t('predictionForm.validations.sizeConstructionRequired'))
      .min(10, t('predictionForm.validations.sizeConstructionMin', { min: 10 }))
      .max(
        1000,
        t('predictionForm.validations.sizeConstructionMax', { max: 1000 }),
      ),
    Rooms: yup
      .number()
      .required(t('predictionForm.validations.roomsRequired'))
      .integer()
      .min(0, t('predictionForm.validations.roomsMin', { min: 0 }))
      .max(10, t('predictionForm.validations.roomsMax', { max: 10 })),
    // Validar que los baños sean un número en pasos de 0.5 y mayor a 1 (mínimo 1 baño)
    Bathrooms: yup
      .number()
      .required(t('predictionForm.validations.bathroomsRequired'))
      .min(1, t('predictionForm.validations.bathroomsMin', { min: 1 }))
      .max(10, t('predictionForm.validations.bathroomsMax', { max: 10 }))
      .test(
        'is-half',
        t('predictionForm.validations.bathroomsHalf'),
        (value) => {
          if (value) {
            return value % 0.5 === 0;
          }
          return true;
        },
      ),
    Parking: yup
      .number()
      .required(t('predictionForm.validations.parkingRequired'))
      .integer()
      .min(0, t('predictionForm.validations.parkingMin', { min: 0 }))
      .max(5, t('predictionForm.validations.parkingMax', { max: 5 })),
    Age: yup
      .number()
      .required(t('predictionForm.validations.ageRequired'))
      .integer()
      .min(0, t('predictionForm.validations.ageMin', { min: 0 }))
      .max(100, t('predictionForm.validations.ageMax', { max: 100 })),
    Lat: yup
      .number()
      .required(t('predictionForm.validations.latRequired'))
      .min(19.1, t('predictionForm.validations.outOfBounds'))
      .max(19.7, t('predictionForm.validations.outOfBounds')),
    Lng: yup
      .number()
      .required(t('predictionForm.validations.lngRequired'))
      .min(-99.4, t('predictionForm.validations.outOfBounds'))
      .max(-98.9, t('predictionForm.validations.outOfBounds')),
    Municipality: yup
      .string()
      .required(t('predictionForm.validations.municipalityRequired'))
      .oneOf(alcaldias, t('predictionForm.validations.municipalityInvalid')),
  });

  // Inicializar Google Maps API
  const { isLoaded } = useJsApiLoader({
    id: 'skyprice-front',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    libraries,
    region: 'MX',
    language: 'es',
  });

  // Estados del componente
  const [predictions, setPredictions] = useState(null);
  const [address, setAddress] = useState('');
  const [autocomplete, setAutocomplete] = useState(null);
  const [predictionsForm, setPredictionsForm] =
    useState<ExtendedPredictionsForm>({
      address: '',
      Size_Terrain: 0,
      Size_Construction: 0,
      Rooms: 0,
      Bathrooms: 0,
      Parking: 0,
      Age: 0,
      Lat: 0,
      Lng: 0,
      Municipality: '',
      fecha: new Date(),
    });

  // Inicializar formulario con useFormik
  const formik = useFormik<PredictionsForm>({
    initialValues: {
      Size_Terrain: undefined,
      Size_Construction: undefined,
      Rooms: undefined,
      Bathrooms: undefined,
      Parking: undefined,
      Age: undefined,
      Lat: undefined,
      Lng: undefined,
      Municipality: undefined,
    },

    validationSchema: validationSchema,
    onSubmit: async (values: PredictionsForm) => {
      try {
        // Realizar llamada a API para obtener predicciones
        const response = await fetch(
          `${
            process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
          }/predict`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
          },
        );

        // Convertir respuesta a JSON
        const data = await response.json();

        // Actualizar el estado con las predicciones
        setPredictions(data);
        setPredictionsForm({
          address,
          ...values,
          fecha: new Date(),
        });
      } catch (error) {
        alert(t('predictionForm.errorPrediction'));
        console.error(error);
      }
    },
  });

  const normalizarString = (str: string): string => {
    return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/\s/g, '_');
  };

  const encontrarMunicipio = (
    addressComponents: any[],
    formatted_address: string,
  ): string | null => {
    // Normalizar alcaldías
    const normalizedAlcaldias = alcaldias.map((alcaldia) =>
      normalizarString(alcaldia),
    );

    // Buscar alcaldía en los componentes de dirección
    for (let i = 0; i < addressComponents.length; i++) {
      const component = addressComponents[i];
      const componentTypes = component.types;
      if (
        componentTypes.includes('political') ||
        componentTypes.includes('sublocality') ||
        componentTypes.includes('locality')
      ) {
        const normalizedComponentName = normalizarString(component.long_name);
        const match = normalizedAlcaldias.find((alcaldia) =>
          normalizedComponentName.includes(alcaldia),
        );
        if (match) {
          // Encontramos una coincidencia en la lista normalizada, devolvemos el nombre original
          return alcaldias[normalizedAlcaldias.indexOf(match)];
        }
      }
    }

    // Buscar alcaldía en la dirección formateada
    const tokens = formatted_address.split(',');
    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];
      const normalizedToken = normalizarString(token);
      const match = normalizedAlcaldias.find((alcaldia) =>
        normalizedToken.includes(alcaldia),
      );
      if (match) {
        // Encontramos una coincidencia en la lista normalizada, devolvemos el nombre original
        return alcaldias[normalizedAlcaldias.indexOf(match)];
      }
    }

    // En caso de no encontrar una coincidencia, podríamos devolver un valor por defecto o null
    return null;
  };

  // Función que se ejecuta cuando el componente Autocomplete se carga
  const onLoad = (autocomplete: any) => {
    // Actualizar el estado con el componente Autocomplete
    setAutocomplete(autocomplete);
  };

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      // @ts-ignore
      const place = autocomplete.getPlace();
      if (!place) {
        console.warn('No se pudo obtener la información del lugar');
        return;
      }

      // Extraer latitud y longitud del lugar
      const lat = place?.geometry?.location?.lat();
      const lng = place?.geometry?.location?.lng();

      // Extrae el municipio del componente de dirección de place
      const municipality = encontrarMunicipio(
        place.address_components,
        place.formatted_address,
      );

      // Actualiza el estado del formulario con estos valores
      formik.setFieldValue('Lat', lat);
      formik.setFieldValue('Lng', lng);
      formik.setFieldValue('Municipality', municipality);

      // Actualizar el estado de la Dirección
      setAddress(place.formatted_address);
    } else {
      console.log('Autocomplete aún no está cargado');
    }
  };

  if (!isLoaded) {
    return (
      <Paper elevation={6} sx={{ margin: 2, padding: 3 }}>
        <Typography variant="h5" align="center" gutterBottom>
          <strong>SkyPrice</strong>, {t('predictionForm.title')}
        </Typography>
        <Typography variant="body2" color="gray" align="center">
          <strong>SkyPrice</strong> {t('predictionForm.loading')}
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper elevation={6} sx={{ margin: 2, padding: 3 }}>
      <Typography variant="h5" align="center" gutterBottom>
        <strong>SkyPrice</strong>, {t('predictionForm.title')}
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12}>
            <Autocomplete
              onLoad={onLoad}
              onPlaceChanged={onPlaceChanged}
              bounds={{
                east: -98.9,
                west: -99.4,
                north: 19.7,
                south: 19.1,
              }}
              options={{
                componentRestrictions: {
                  country: 'MX',
                },
                strictBounds: true,
              }}>
              <TextField
                fullWidth
                required
                id="address"
                name="address"
                label={t('predictionForm.addressLabel')}
                placeholder={t('predictionForm.addressPlaceholder')}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                margin="normal"
                error={formik.touched.Lat && Boolean(formik.errors.Lat)}
                helperText={formik.touched.Lat && formik.errors.Lat}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <AddLocationIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Autocomplete>
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={3}>
            <TextField
              fullWidth
              required
              type="number"
              id="Size_Terrain"
              name="Size_Terrain"
              label={t('predictionForm.sizeTerrainLabel')}
              value={formik.values.Size_Terrain}
              onChange={formik.handleChange}
              error={
                formik.touched.Size_Terrain &&
                Boolean(formik.errors.Size_Terrain)
              }
              helperText={
                formik.touched.Size_Terrain && formik.errors.Size_Terrain
              }
              margin="normal"
              inputProps={{ step: 1, min: 10, max: 1000 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">m²</InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={3}>
            <TextField
              fullWidth
              required
              type="number"
              id="Size_Construction"
              name="Size_Construction"
              label={t('predictionForm.sizeConstructionLabel')}
              value={formik.values.Size_Construction}
              onChange={formik.handleChange}
              error={
                formik.touched.Size_Construction &&
                Boolean(formik.errors.Size_Construction)
              }
              helperText={
                formik.touched.Size_Construction &&
                formik.errors.Size_Construction
              }
              margin="normal"
              inputProps={{ step: 1, min: 10, max: 1000 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">m²</InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={3}>
            <TextField
              fullWidth
              required
              type="number"
              id="Rooms"
              name="Rooms"
              label={t('predictionForm.roomsLabel')}
              value={formik.values.Rooms}
              onChange={formik.handleChange}
              error={formik.touched.Rooms && Boolean(formik.errors.Rooms)}
              helperText={formik.touched.Rooms && formik.errors.Rooms}
              margin="normal"
              inputProps={{ step: 1, min: 0, max: 10 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <BedIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={3}>
            <TextField
              fullWidth
              required
              type="number"
              id="Bathrooms"
              name="Bathrooms"
              label={t('predictionForm.bathroomsLabel')}
              value={formik.values.Bathrooms}
              onChange={formik.handleChange}
              error={
                formik.touched.Bathrooms && Boolean(formik.errors.Bathrooms)
              }
              helperText={formik.touched.Bathrooms && formik.errors.Bathrooms}
              margin="normal"
              inputProps={{ step: 0.5, min: 1, max: 10 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <BathtubIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={3}>
            <TextField
              fullWidth
              required
              type="number"
              id="Parking"
              name="Parking"
              label={t('predictionForm.parkingLabel')}
              value={formik.values.Parking}
              onChange={formik.handleChange}
              error={formik.touched.Parking && Boolean(formik.errors.Parking)}
              helperText={formik.touched.Parking && formik.errors.Parking}
              margin="normal"
              inputProps={{ step: 1, min: 0, max: 10 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <DirectionsCarIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={3}>
            <TextField
              fullWidth
              required
              type="number"
              id="Age"
              name="Age"
              label={t('predictionForm.ageLabel')}
              value={formik.values.Age}
              onChange={formik.handleChange}
              error={formik.touched.Age && Boolean(formik.errors.Age)}
              helperText={formik.touched.Age && formik.errors.Age}
              margin="normal"
              inputProps={{ step: 1, min: 0, max: 100 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <EventAvailableIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={3}>
            <TextField
              select
              fullWidth
              required
              label={t('predictionForm.municipalityLabel')}
              id="Municipality"
              name="Municipality"
              value={formik.values?.Municipality || ''}
              onChange={formik.handleChange}
              error={
                formik.touched.Municipality &&
                Boolean(formik.errors.Municipality)
              }
              margin="normal"
              helperText={
                formik.touched.Municipality && formik.errors.Municipality
              }>
              <MenuItem key={''} value={''} disabled>
                {t('predictionForm.municipalityPlaceholder')}
              </MenuItem>
              {alcaldias.map((alcaldia: string) => (
                <MenuItem key={alcaldia} value={alcaldia}>
                  {alcaldia}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {formik.values.Municipality &&
          alcaldias.includes(formik.values.Municipality) &&
          !!formik.values?.Lat &&
          !!formik.values?.Lng ? (
            <Grid item xs={12}>
              <GoogleMap
                mapContainerStyle={{
                  width: '100%',
                  height: '300px',
                }}
                center={{
                  lat: Number(formik.values.Lat),
                  lng: Number(formik.values.Lng),
                }}
                zoom={15}>
                <Marker
                  title="Ubicación de la Propiedad"
                  position={{
                    lat: Number(formik.values.Lat),
                    lng: Number(formik.values.Lng),
                  }}
                  animation={google.maps.Animation.BOUNCE}
                  icon={{
                    path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
                    scale: 10,
                    fillColor: 'red',
                    fillOpacity: 0.8,
                    strokeColor: 'black',
                    strokeWeight: 3,
                  }}
                />
              </GoogleMap>
            </Grid>
          ) : (
            <Grid item xs={12}>
              <Typography variant="body2" align="center">
                {t('predictionForm.mapInfo')}
              </Typography>
            </Grid>
          )}
        </Grid>

        <Button
          color="primary"
          size="large"
          variant="contained"
          fullWidth
          type="submit"
          disabled={formik.isSubmitting}
          sx={{ mt: 3, fontWeight: 700 }}>
          {formik.isSubmitting && t('predictionForm.submitting')}
          {formik.isValid && !formik.isSubmitting && t('predictionForm.submit')}
          {!formik.isValid && formik.dirty && t('predictionForm.submitInvalid')}
        </Button>
      </form>

      {/* Mostrar resultados en tarjetas */}
      {predictions && (
        <Fragment>
          <hr />
          <Box
            display="flex"
            justifyContent="center"
            flexWrap="wrap"
            gap={2}
            mt={4}>
            <Typography variant="h5" align="center" gutterBottom>
              {t('predictionForm.predictions.title')}
            </Typography>
          </Box>

          <Box
            mt={2}
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              backgroundColor: 'rgba(0, 0, 0, 0.05)',
              borderRadius: 5,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Box
              sx={{
                display: 'flex',
                flex: 1,
                height: 200,
                width: 200,
                margin: 'auto',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                src={departamentoIsometrico}
                alt="Departamento Isométrico"
                width={200}
                height={200}
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                flex: 2,
                px: { xs: 2, sm: 5 },
                py: { xs: 1, sm: 2 },
                gap: 2,
              }}>
              <Typography variant="body2" align="center" gutterBottom>
                <strong>
                  {t('predictionForm.predictions.subtitle', {
                    address: predictionsForm.address,
                  })}
                </strong>
              </Typography>
              <Typography
                variant="body2"
                align="justify"
                sx={{ wordBreak: 'break-word', hyphens: 'auto' }}
                gutterBottom
                dangerouslySetInnerHTML={{
                  __html: t('predictionForm.predictions.details', {
                    sizeTerrain: predictionsForm.Size_Terrain,
                    sizeConstruction: predictionsForm.Size_Construction,
                    rooms: predictionsForm.Rooms,
                    bathrooms: predictionsForm.Bathrooms,
                    parking: predictionsForm.Parking,
                    age: predictionsForm.Age,
                    municipality: predictionsForm.Municipality,
                  }),
                }}
              />
              <Typography
                variant="body2"
                sx={{ wordBreak: 'break-word', hyphens: 'auto' }}
                align="justify">
                {t('predictionForm.predictions.algorithmsSummary', {
                  algorithmsCount: Object.keys(predictions).length,
                  svm: t('common.svm'),
                  rf: t('common.randomForest'),
                  nn: t('common.neuralNetwork'),
                })}
              </Typography>
              <Typography variant="caption" align="center">
                {t('predictionForm.predictions.generatedAt', {
                  date: predictionsForm.fecha.toLocaleDateString('es-MX', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  }),
                  time: predictionsForm.fecha.toLocaleTimeString(),
                })}
              </Typography>
            </Box>
          </Box>

          <Box mt={4}>
            <Grid container spacing={3} justifyContent="center">
              {Object.entries(predictions).map(
                ([key, value]): ReactElement => (
                  <Grid key={key} item xs={12} sm={6} lg={4}>
                    <Card sx={{ textAlign: 'center' }} elevation={1}>
                      <CardContent>
                        <CurrencyConverter price={Number(value)} />
                      </CardContent>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          p: 2,
                        }}>
                        <Typography variant="body2" color="text.secondary">
                          {t('predictionForm.predictions.results.title', {
                            algorithm:
                              key === 'svm'
                                ? t('common.svm')
                                : key === 'random_forest'
                                ? t('common.randomForest')
                                : t('common.neuralNetwork'),
                          })}
                        </Typography>
                      </Box>
                    </Card>
                  </Grid>
                ),
              )}
            </Grid>

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                mt: 4,
                p: 2,
                borderRadius: 1,
                border: 1,
              }}>
              {/* ícono de información */}

              <InfoIcon
                color="primary"
                sx={{
                  fontSize: 30,
                  mr: 2,
                }}
              />
              <Typography
                variant="caption"
                color="text.secondary"
                align="justify"
                sx={{
                  wordBreak: 'break-word',
                  hyphens: 'auto',
                }}
                dangerouslySetInnerHTML={{
                  __html: t('predictionForm.disclaimer'),
                }}
              />
            </Box>
          </Box>
        </Fragment>
      )}
    </Paper>
  );
}
