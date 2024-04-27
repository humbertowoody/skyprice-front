'use client';
import React, { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';
import keplerbg from '/public/kepler-bg.png';
import { useTranslation } from '@/app/i18nContext';

export default function Mapa() {
  const { t } = useTranslation();
  const [openDialog, setOpenDialog] = useState(true);
  const [loadMap, setLoadMap] = useState(false);

  const handleClose = (shouldLoad: boolean) => {
    setOpenDialog(false);
    setLoadMap(shouldLoad);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundImage: `url(${keplerbg.src})`,
      }}>
      <NavBar />

      {loadMap ? (
        <Box
          sx={{
            flex: '1 1 auto',
            display: 'flex',
          }}>
          <iframe
            src="/kepler.html"
            style={{
              width: '100%',
              border: 'none',
            }}
            title="Mapa Kepler"
            loading="lazy"
          />
        </Box>
      ) : (
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-end',
          }}>
          <Button
            variant="contained"
            sx={{ margin: 2 }}
            onClick={() => handleClose(true)}>
            {t('map.loadButton')}
          </Button>
        </Box>
      )}

      <Footer />

      <Dialog
        open={openDialog}
        onClose={() => handleClose(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
          {t('map.dialogTitle')}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {t('map.dialogContent')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(false)} color="primary">
            {t('map.dialogNo')}
          </Button>
          <Button onClick={() => handleClose(true)} color="primary" autoFocus>
            {t('map.dialogYes')}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
