import type { FC } from 'react';
import { useEffect } from 'react';
import Head from 'next/head';
import { Box, Container, Grid, Typography } from '@mui/material';
import { MainLayout } from '../components/main-layout';

const companies = [
  {
    icon: '/static/company-bolt.svg',
    name: 'bolt'
  },
  {
    icon: '/static/company-samsung.svg',
    name: 'samsung'
  },
  {
    icon: '/static/company-ford.svg',
    name: 'ford'
  },
  {
    icon: '/static/company-bd.svg',
    name: 'bd'
  },
  {
    icon: '/static/company-mbank.svg',
    name: 'mbank'
  },
  {
    icon: '/static/company-lockheed_martin.svg',
    name: 'lockheed martin'
  }
];

const Home: FC = () => {


  return (
    <>
      <Head>
        <title>
          Home | Carpatin Dashboard
        </title>
      </Head>
      <MainLayout>

        <Container
          maxWidth="md"
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
            pb: 15
          }}
        >
          <Typography
            color="textSecondary"
            component="p"
            sx={{ mb: 3 }}
            variant="overline"
          >
            Some of our customers
          </Typography>
          <Grid
            container
            spacing={2}
            wrap="wrap"
            justifyContent="center"
          >
            {companies.map((company) => (
              <Grid
                item
                key={company.name}
              >
                <img
                  alt={company.name}
                  src={company.icon}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      </MainLayout>
    </>
  );
};

export default Home;
