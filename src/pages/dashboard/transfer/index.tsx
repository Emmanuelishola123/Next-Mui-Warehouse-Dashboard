import React, { useState } from 'react';
import Head from 'next/head';
import { Box, Container, Typography, Button, Grid } from '@mui/material';
import { Plus as PlusIcon } from '../../../icons/plus';
import TransfersListTable from '../../../components/dashboard/transfer/TransfersListTable'
import CreateTransfer from '../../../components/dashboard/transfer/CreateTransfer';
import AcceptSenderTransfer from '../../../components/dashboard/transfer/AcceptSenderTransfer';
import AcceptReceiverTransfer from '../../../components/dashboard/transfer/AcceptReceiverTransfer';


const TrasferOverview = () => {
  const [openCreateTransfer, setOpenCreateTransfer] = useState(false)
  const [openSenderForm, setOpenSenderForm] = useState(false)
  const [openReceiverForm, setOpenReceiverForm] = useState(false)


  return (
    <>
      <Head>
        <title>
          Transfer: List | Dashboard
        </title>
      </Head>
      <Box sx={{ flexGrow: 1 }}>
        <Container
          maxWidth="xl"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            py: 4
          }} >
          <Box
            sx={{
              alignItems: 'center',
              justifyContent: 'space-between',
              display: 'flex',
              mb: 2
            }} >
            <Typography
              color="textPrimary"
              variant="h4"
            >
              Transfer
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
              <Button
                color="primary"
                onClick={() => setOpenCreateTransfer(true)}
                startIcon={<PlusIcon fontSize="small" />}
                variant="contained"
                size="large" >
                Create Transfer
              </Button>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 2, mb: 2 }}>
            <Button
              color="primary"
              onClick={() => setOpenSenderForm(true)}
              variant="contained"
              size="large"  >
              Accept Sender Transfer
            </Button>
            <Button
              color="primary"
              onClick={() => setOpenReceiverForm(true)}
              variant="contained"
              size="large"
            >
              Accept Reveiver Transfer
            </Button>
          </Box>
          <TransfersListTable />
        </Container>
      </Box>

      <CreateTransfer
        onClose={() => setOpenCreateTransfer(false)}
        open={openCreateTransfer}
      />
      <AcceptSenderTransfer
        onClose={() => setOpenSenderForm(false)}
        open={openSenderForm}
      />
      <AcceptReceiverTransfer
        onClose={() => setOpenReceiverForm(false)}
        open={openReceiverForm}
      />
    </>
  )
}

export default TrasferOverview