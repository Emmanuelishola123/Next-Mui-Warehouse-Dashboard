import React from 'react'
import { Box, Grid, Divider, Typography, Container, Button } from '@mui/material'
import DistributorPurchaseOrderTable from 'src/components/dashboard/distributor/DistributorPurchaseOrderTable'
import DistributorProductsOrderedTable from 'src/components/dashboard/distributor/DistributorProductsOrderedTable'
import DistributorContactListTable from 'src/components/dashboard/distributor/DistributorContactListTable'
import MapBox from 'src/components/react-map/MapBox'



function DistributorDetails() {
  return (

    <Box sx={{ flexGrow: 1, py: 4 }}>
      <Container
        maxWidth="xl"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <MapBox />
          </Grid>
          <Grid item xs={12} md={6} spacing={4}>
            <Grid item xs={12}>
              <Grid container spacing={2} sx={{mb: 4}}>
                <Grid item xs={6}>
                  <Typography
                    color="textSecondary"
                    variant="body2"
                    sx={{
                      textAlign: 'left'

                    }}
                  >
                    Natalie Rusell
                    <br />
                    3845 Salty Street
                    <br />
                    Salt Lake City
                    <br />
                    United States
                  </Typography>
                </Grid>
                <Grid item xs={6} >
                    <Box sx={{display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'flex-end'}}>
                    <Button variant='outlined' >YTD Spend - 20</Button>
                  <Button variant='outlined'>All Time Spend - 45</Button>
               </Box>
                  </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} >
              <Typography
                sx={{ flex: '1 1 100%', mb: 2 }}
                variant="h5"
                component="div"
              >
                Distributor Contacts
              </Typography>
              <DistributorContactListTable />
            </Grid>
          </Grid>
        </Grid>
        <Divider sx={{ my: 4 }} />
        <Box>
          <Typography
            sx={{ flex: '1 1 100%', mb: 2 }}
            variant="h5"
            component="div"
          >
            Purchase Orders
          </Typography>
          <DistributorPurchaseOrderTable />
        </Box>
        <Divider sx={{ my: 4 }} />
        <Box>
          <Typography
            sx={{ flex: '1 1 100%', mb: 2 }}
            variant="h5"
            component="div"
          >
            Products Ordered
          </Typography>
          <DistributorProductsOrderedTable />
        </Box>
      </Container>
    </Box>
  )
}

export default DistributorDetails