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
  FormControl,
  InputLabel,
  Select,
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

// Esquema de validación para el formulario
const validationSchema = yup.object({
  Size_Terrain: yup
    .number()
    .required('El tamaño del terreno es requerido')
    .min(1, 'El tamaño del terreno debe ser mayor o igual a 1'),
  Size_Construction: yup
    .number()
    .required('El tamaño de la construcción es requerido')
    .min(1, 'El tamaño de la construcción debe ser mayor o igual a 1'),
  Rooms: yup
    .number()
    .required('El número de habitaciones es requerido')
    .integer()
    .min(1, 'El número de habitaciones debe ser mayor o igual a 1')
    .max(10, 'El número de habitaciones debe ser menor o igual a 10'),
  // Validar que los baños sean un número en pasos de 0.5 y mayor a 1 (mínimo 1 baño)
  Bathrooms: yup
    .number()
    .required('El número de baños es requerido')
    .min(1, 'El número de baños debe ser mayor o igual a 1')
    .max(10, 'El número de baños debe ser menor o igual a 10')
    .test(
      'is-half',
      'El número de baños debe ser un número entero o en pasos de 0.5',
      (value) => {
        if (value) {
          return value % 0.5 === 0;
        }
        return true;
      },
    ),
  Parking: yup
    .number()
    .required('El número de espacios de estacionamiento es requerido')
    .integer()
    .min(
      0,
      'El número de espacios de estacionamiento debe ser mayor o igual a 0',
    )
    .max(
      5,
      'El número de espacios de estacionamiento debe ser menor o igual a 5',
    ),
  Age: yup
    .number()
    .required('La edad de la propiedad es requerida')
    .integer()
    .min(0, 'La edad de la propiedad debe ser mayor o igual a 0')
    .max(100, 'La edad de la propiedad debe ser menor o igual a 100'),
  Lat: yup.number().required('La latitud es requerida'),
  Lng: yup.number().required('La longitud es requerida'),
  Municipality: yup
    .string()
    .required('El municipio/alcaldía es requerido')
    .oneOf(alcaldias, 'El municipio/alcaldía no es válido'),
});

// Interfaz para el body de la petición POST a la API
interface PredictionsForm {
  Size_Terrain: number;
  Size_Construction: number;
  Rooms: number;
  Bathrooms: number;
  Parking: number;
  Age: number;
  Lat: number;
  Lng: number;
  Municipality: string;
}

interface ExtendedPredictionsForm extends PredictionsForm {
  address: string;
  fecha: Date;
}

export default function PredictionForm() {
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
      Municipality: 'Benito Juárez',
      fecha: new Date(),
    });

  // Inicializar formulario con useFormik
  const formik = useFormik<PredictionsForm>({
    initialValues: {
      Size_Terrain: 0,
      Size_Construction: 0,
      Rooms: 0,
      Bathrooms: 0,
      Parking: 0,
      Age: 0,
      Lat: 0,
      Lng: 0,
      Municipality: 'Benito Juárez',
    },
    validationSchema: validationSchema,
    onSubmit: async (values: PredictionsForm) => {
      // Realizar llamada a API para obtener predicciones
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/predict`,
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
          Estimar Precio de Departamento en CDMX
        </Typography>
        <Typography variant="body2" color="gray" align="center">
          Cargando estimador de precios...
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper elevation={6} sx={{ margin: 2, padding: 3 }}>
      <Typography variant="h5" align="center" gutterBottom>
        <strong>SkyPrice</strong>: Estimar Precio de Departamento en CDMX
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
                //types: ['address'],
                componentRestrictions: {
                  country: 'MX',
                },
                strictBounds: true,
              }}>
              <TextField
                fullWidth
                id="address"
                name="address"
                label="Dirección del departamento"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                margin="normal"
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
              label="Tam. Terreno"
              value={formik.values?.Size_Terrain || ''}
              onChange={formik.handleChange}
              error={
                formik.touched.Size_Terrain &&
                Boolean(formik.errors.Size_Terrain)
              }
              helperText={
                formik.touched.Size_Terrain && formik.errors.Size_Terrain
              }
              margin="normal"
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
              label="Tam. Construcción"
              value={formik.values?.Size_Construction || ''}
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
              label="Habitaciones"
              value={formik.values?.Rooms || ''}
              onChange={formik.handleChange}
              error={formik.touched.Rooms && Boolean(formik.errors.Rooms)}
              helperText={formik.touched.Rooms && formik.errors.Rooms}
              margin="normal"
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
              inputProps={{ step: 0.5 }}
              type="number"
              id="Bathrooms"
              name="Bathrooms"
              label="Baños"
              value={formik.values?.Bathrooms || ''}
              onChange={formik.handleChange}
              error={
                formik.touched.Bathrooms && Boolean(formik.errors.Bathrooms)
              }
              helperText={formik.touched.Bathrooms && formik.errors.Bathrooms}
              margin="normal"
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
              label="Estacionamientos"
              value={formik.values?.Parking || ''}
              onChange={formik.handleChange}
              error={formik.touched.Parking && Boolean(formik.errors.Parking)}
              helperText={formik.touched.Parking && formik.errors.Parking}
              margin="normal"
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
              label="Antigüedad"
              value={formik.values?.Age || ''}
              onChange={formik.handleChange}
              error={formik.touched.Age && Boolean(formik.errors.Age)}
              helperText={formik.touched.Age && formik.errors.Age}
              margin="normal"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <EventAvailableIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            alignItems={'flex-end'}
            display={'flex'}>
            <FormControl fullWidth sx={{ mb: 1 }}>
              <InputLabel
                disabled={
                  formik.values?.Municipality !== null &&
                  formik.values?.Municipality !== ''
                }>
                Alcaldía
              </InputLabel>
              <Select
                fullWidth
                id="Municipality"
                name="Municipality"
                label="Alcaldía2"
                value={
                  formik.values?.Municipality === null ||
                  formik.values?.Municipality === ''
                    ? ''
                    : formik.values?.Municipality
                }
                onChange={formik.handleChange}
                disabled={
                  formik.values?.Municipality !== null &&
                  formik.values?.Municipality !== ''
                }
                error={
                  formik.touched.Municipality &&
                  Boolean(formik.errors.Municipality)
                }>
                <MenuItem key={''} value={''} disabled>
                  Seleccione una alcaldía
                </MenuItem>
                {alcaldias.map((alcaldia: string) => (
                  <MenuItem key={alcaldia} value={alcaldia}>
                    {alcaldia}
                  </MenuItem>
                ))}
              </Select>
              {formik.touched.Municipality && formik.errors.Municipality && (
                <Typography variant="body2" color="red" gutterBottom>
                  {formik.errors.Municipality}
                </Typography>
              )}
            </FormControl>
          </Grid>

          {alcaldias.includes(formik.values?.Municipality) &&
            formik.values?.Lat &&
            formik.values?.Lng && (
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
            )}
          {!alcaldias.includes(formik.values?.Municipality) && (
            <Grid item xs={12}>
              <Typography variant="body2" align="center">
                Por favor escribe una dirección válida dentro de la CDMX para
                visualizar el mapa de la ubicación de la propiedad y estimar el
                precio.
              </Typography>
            </Grid>
          )}
        </Grid>

        <Button
          color="primary"
          variant="contained"
          fullWidth
          type="submit"
          disabled={
            !formik.dirty || !formik.isValid || formik.isSubmitting || !address
          }
          sx={{ mt: 3 }}>
          {formik.isSubmitting ? 'Estimando...' : 'Estimar Precio'}
          {formik.dirty && !formik.isValid && ' (Revisa el formulario)'}
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
              Resultados de la Estimación
            </Typography>
          </Box>
          <Box
            mt={2}
            sx={{
              paddingX: { xs: 2, lg: 20 },
              paddingY: 2,
              backgroundColor: 'rgba(0, 0, 0, 0.05)',
              borderRadius: 1,
            }}>
            <Typography variant="body2" align="center" gutterBottom>
              Estimación realizada para la dirección{' '}
              <i>{predictionsForm.address}</i>. Con los siguientes datos:{' '}
              <strong>{predictionsForm.Rooms}</strong> habitaciones,{' '}
              <strong>{predictionsForm.Bathrooms}</strong> baños,{' '}
              <strong>{predictionsForm.Parking}</strong> estacionamientos,{' '}
              <strong>{predictionsForm.Size_Terrain}</strong> m² de terreno y{' '}
              <strong>{predictionsForm.Size_Construction}</strong> m² de
              construcción. La Alcaldía seleccionada es{' '}
              <strong>{predictionsForm.Municipality}</strong>.
            </Typography>
            <Typography variant="caption" align="center">
              Fecha de estimación: {predictionsForm.fecha.toLocaleDateString()}-
              {predictionsForm.fecha.toLocaleTimeString()}
            </Typography>
          </Box>
          <Box mt={4}>
            <Grid container spacing={3} justifyContent="center">
              {Object.entries(predictions).map(
                ([key, value]): ReactElement => (
                  <Grid key={key} item xs={12} sm={4}>
                    <Card sx={{ textAlign: 'center' }}>
                      <CardContent>
                        <Typography variant="body1">
                          Venta:{' '}
                          {
                            // @ts-ignore
                            value.toLocaleString('es-MX', {
                              style: 'currency',
                              currency: 'MXN',
                            })
                          }{' '}
                          MXN
                        </Typography>
                        <Typography variant="body2">
                          Renta:{' '}
                          {
                            // @ts-ignore
                            ((value * 0.06) / 12).toLocaleString('es-MX', {
                              style: 'currency',
                              currency: 'MXN',
                            })
                          }{' '}
                          MXN
                        </Typography>

                        <Typography variant="body2" color="text.secondary">
                          (Precios estimados)
                        </Typography>
                      </CardContent>
                      {/* Footer de la tarjeta */}
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          p: 2,
                          borderTop: 1,
                        }}>
                        <Typography variant="body2" color="text.secondary">
                          {key.replace(/_/g, ' ').toUpperCase()}
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
                alignItems: 'center',
                justifyContent: 'space-around',
                mt: 4,
                p: 2,
                borderRadius: 1,
                border: 1,
              }}>
              {/* ícono de información */}
              <InfoIcon color="primary" sx={{ flex: 1 }} />

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ flex: 8 }}>
                Las predicciones son aproximadas y los resultados de cada modelo
                pueden variar. Los precios son estimados en pesos mexicanos.
                Para conocer el precio real de una propiedad, se recomienda
                contactar a un profesional en bienes raíces. Si deseas conocer
                más detalles de los modelos de predicción, puedes consultar la
                documentación del proyecto en{' '}
                <a href="/acerca-de">
                  la sección de <strong>Acerca De</strong>
                </a>
                .
              </Typography>
            </Box>
          </Box>
        </Fragment>
      )}
    </Paper>
  );
}
