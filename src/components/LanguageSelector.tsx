import React, { useContext } from 'react';
import { I18nContext } from '../app/i18nContext';
import { MenuItem, TextField } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function LanguageSelector() {
  const { setLang } = useContext(I18nContext);
  const isSmallScreen = useMediaQuery('(max-width:390px)');
  var valueLang = 'es';
  if (typeof window !== 'undefined') {
    valueLang = localStorage.getItem('i18nextLng') || 'es';
  }

  return (
    <TextField
      select
      sx={{
        width: 'auto',
        '.MuiInputBase-input': {
          color: 'white', // Texto blanco en la barra
          fontWeight: 600, // Peso del texto
          fontSize: '0.9rem', // Tamaño del texto
        },
        '.MuiSelect-icon': {
          color: 'white', // Icono de flecha en blanco
        },
        '.MuiSelect-select:focus': {
          backgroundColor: 'transparent', // Fondo transparente en el foco
        },
        '.MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: 'transparent', // Bordes transparentes
          },
          '&:hover fieldset': {
            borderColor: 'transparent', // Bordes transparentes al pasar el ratón
          },
          '&.Mui-focused fieldset': {
            borderColor: 'transparent', // Bordes transparentes en foco
          },
        },
      }}
      value={valueLang}
      onChange={(e) => setLang(e.target.value)}>
      <MenuItem value="en" sx={{ color: 'black', fontWeight: 'normal' }}>
        <img
          src="https://flagcdn.com/gb.svg"
          width="20"
          alt="English"
          style={{ marginRight: 8 }}
        />
        {isSmallScreen ? '' : 'English'}
      </MenuItem>
      <MenuItem value="es" sx={{ color: 'black', fontWeight: 'normal' }}>
        <img
          src="https://flagcdn.com/es.svg"
          width="20"
          alt="Español"
          style={{ marginRight: 8 }}
        />
        {isSmallScreen ? '' : 'Español'}
      </MenuItem>
    </TextField>
  );
}
