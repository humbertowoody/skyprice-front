import React, { useState, useEffect } from 'react';
import {
  TextField,
  MenuItem,
  Typography,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const currencies = [
  {
    name: 'MXN',
    flag: '🇲🇽',
  },
  {
    name: 'USD',
    flag: '🇺🇸',
  },
  {
    name: 'EUR',
    flag: '🇪🇺',
  },
  {
    name: 'CAD',
    flag: '🇨🇦',
  },
  {
    name: 'JPY',
    flag: '🇯🇵',
  },
  {
    name: 'GBP',
    flag: '🇬🇧',
  },
  {
    name: 'AUD',
    flag: '🇦🇺',
  },
  {
    name: 'CHF',
    flag: '🇨🇭',
  },
  {
    name: 'BRL',
    flag: '🇧🇷',
  },
  {
    name: 'CNY',
    flag: '🇨🇳',
  },
];

const CurrencyConverter = ({ price }: { price: Number }) => {
  const [currency, setCurrency] = useState('MXN');
  const [convertedPrice, setConvertedPrice] = useState<Number>(price);

  useEffect(() => {
    if (currency === 'MXN') {
      setConvertedPrice(price);
      return;
    }
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://v6.exchangerate-api.com/v6/${
            process.env.NEXT_PUBLIC_EXCHANGERATE_API_KEY || ''
          }/pair/MXN/${currency}/${price}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            mode: 'cors',
          },
        );
        const jsonData = await response.json();
        setConvertedPrice(jsonData.conversion_result);
      } catch (error) {
        console.error('Error fetching currency data:', error);
        alert(
          'Ocurrió un error al convertir la moneda, intenta de nuevo más tarde.',
        );
        setConvertedPrice(price);
      }
    };

    fetchData();
  }, [currency, price]);

  const handleChange = (event: any) => {
    setCurrency(event.target.value);
  };

  const convertedRent6: string =
    ((convertedPrice * 0.06) / 12).toLocaleString(undefined, {
      style: 'currency',
      currency,
      currencyDisplay: 'narrowSymbol',
    }) +
    ' ' +
    currency;

  const convertedRent4: string =
    ((convertedPrice * 0.04) / 12).toLocaleString(undefined, {
      style: 'currency',
      currency,
    }) +
    ' ' +
    currency;

  return (
    <div>
      <Typography variant="h6" align="center">
        Venta:{' '}
        {convertedPrice.toLocaleString(undefined, {
          style: 'currency',
          currency,
          currencyDisplay: 'narrowSymbol',
        })}{' '}
        {currency}
      </Typography>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="body2" align="center">
          Renta:{' '}
        </Typography>
        <Box display="flex" flexDirection="column">
          <List dense>
            <ListItem disablePadding>
              <ListItemAvatar>
                <Avatar>
                  <ArrowUpwardIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={`${convertedRent6} / mes`}
                secondary="6% anual"
              />
            </ListItem>
            <ListItem disablePadding>
              <ListItemAvatar>
                <Avatar>
                  <ArrowDownwardIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={`${convertedRent4} / mes`}
                secondary="4% anual"
              />
            </ListItem>
          </List>
        </Box>
      </Box>
      <TextField
        select
        label="Convertir a"
        value={currency}
        onChange={handleChange}
        fullWidth
        variant="outlined"
        size="small">
        {currencies.map((option) => (
          <MenuItem key={option.name} value={option.name}>
            {option.flag} {option.name}
          </MenuItem>
        ))}
      </TextField>
    </div>
  );
};

export default CurrencyConverter;
