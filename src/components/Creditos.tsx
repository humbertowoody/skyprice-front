import * as React from 'react';
import { Container, Typography, Box } from '@mui/material';
import logoIPN from '/public/logo-ipn.png';
import logoESCOM from '/public/logo-escom.png';
import Image from 'next/image';
import AttributionIcon from '@mui/icons-material/Attribution';
import { useTranslation } from '@/app/i18nContext';

export const Creditos: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Container sx={{ mt: 4, mb: 6 }}>
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          mt: 4,
        }}>
        <AttributionIcon sx={{ fontSize: 30, color: 'primary.main' }} />
        <Typography variant="h5" component="h2" gutterBottom>
          {t('about.credits.title')}
        </Typography>
      </Box>

      {/* Para pantallas grandes */}
      <Box
        sx={{
          display: { xs: 'none', md: 'flex' },
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          gap: 2,
          mt: 4,
        }}>
        <Typography
          variant="body1"
          sx={{ textAlign: 'justify' }}
          dangerouslySetInnerHTML={{
            __html: t('about.credits.description'),
          }}
        />

        <Image
          src={logoIPN}
          alt="Escudo del Instituto Politécnico Nacional"
          height={100}
        />
        <Image
          src={logoESCOM}
          alt="Escudo de la Escuela Superior de Cómputo"
          height={100}
        />
      </Box>

      {/* Para pantallas pequeñas */}
      <Box
        sx={{
          display: { xs: 'flex', md: 'none' },
          flexDirection: 'column',
          gap: 2,
          mt: 4,
        }}>
        <Typography variant="body1" sx={{ textAlign: 'justify' }}>
          Este proyecto fue desarrollado por{' '}
          <strong>Humberto Alejandro Ortega Alcocer</strong> como parte de su{' '}
          <strong>Trabajo Terminal 2024-A053</strong> con el título de{' '}
          <i>
            "Plataforma de estimación de precios de mercado de departamentos en
            la Ciudad de México"
          </i>{' '}
          asesorado por el <strong> Mtro. Ariel López Rojas</strong> en la{' '}
          <strong>
            Escuela Superior de Cómputo del Instituto Politécnico Nacional
          </strong>{' '}
          en la Ciudad de México para obtener el título de{' '}
          <strong>Ingeniero en Sistemas Computacionales</strong>.
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
          <Image
            src={logoIPN}
            alt="Escudo del Instituto Politécnico Nacional"
            height={100}
          />
          <Image
            src={logoESCOM}
            alt="Escudo de la Escuela Superior de Cómputo"
            height={100}
          />
        </Box>
      </Box>
    </Container>
  );
};
