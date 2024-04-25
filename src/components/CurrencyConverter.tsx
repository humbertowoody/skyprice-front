import React, { useState, useEffect, Fragment } from 'react';
import {
  TextField,
  MenuItem,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { useTranslation } from '../app/i18nContext';

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
  {
    name: 'CLP',
    flag: '🇨🇱',
  },
  {
    name: 'ARS',
    flag: '🇦🇷',
  },
  {
    name: 'COP',
    flag: '🇨🇴',
  },
  {
    name: 'KRW',
    flag: '🇰🇷',
  },
  {
    name: 'INR',
    flag: '🇮🇳',
  },
  {
    name: 'RUB',
    flag: '🇷🇺',
  },
  {
    name: 'VES',
    flag: '🇻🇪',
  },
];

const CurrencyConverter = ({ price }: { price: Number }) => {
  const [currency, setCurrency] = useState<string>('MXN');
  const [convertedPrice, setConvertedPrice] = useState<Number>(price);

  const { t } = useTranslation();

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
        alert(t('predictionForm.currencyConverter.requestError'));
      }
    };

    fetchData();
  }, [currency, price]);

  const handleChange = (event: any) => {
    setCurrency(event.target.value);
  };

  const convertedRent6: string =
    ((Number(convertedPrice) * 0.06) / 12).toLocaleString(undefined, {
      style: 'currency',
      currency,
      currencyDisplay: 'narrowSymbol',
    }) +
    ' ' +
    currency;

  const convertedRent4: string =
    ((Number(convertedPrice) * 0.04) / 12).toLocaleString(undefined, {
      style: 'currency',
      currency,
      currencyDisplay: 'narrowSymbol',
    }) +
    ' ' +
    currency;

  return (
    <div>
      <Typography variant="h6" align="center">
        {t('predictionForm.currencyConverter.sellingPrice')}:{' '}
        {convertedPrice.toLocaleString(undefined, {
          style: 'currency',
          currency,
          currencyDisplay: 'narrowSymbol',
        })}{' '}
        {currency}
      </Typography>
      <Box display="flex" alignItems="center" justifyContent="space-around">
        <Typography variant="body2" align="center">
          {t('predictionForm.currencyConverter.rentalPrice')}:{' '}
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
                primary={
                  <Fragment>
                    {convertedRent6}
                    <Typography variant="caption" component="span">
                      {' '}
                      / {t('predictionForm.currencyConverter.month')}
                    </Typography>
                  </Fragment>
                }
                secondary={t('predictionForm.currencyConverter.annual', {
                  percentage: 6,
                })}
              />
            </ListItem>
            <ListItem disablePadding>
              <ListItemAvatar>
                <Avatar>
                  <ArrowDownwardIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Fragment>
                    {convertedRent4}
                    <Typography variant="caption" component="span">
                      {' '}
                      / {t('predictionForm.currencyConverter.month')}
                    </Typography>
                  </Fragment>
                }
                secondary={t('predictionForm.currencyConverter.annual', {
                  percentage: 4,
                })}
              />
            </ListItem>
          </List>
        </Box>
      </Box>
      <TextField
        select
        label={t('predictionForm.currencyConverter.selectCurrency')}
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
