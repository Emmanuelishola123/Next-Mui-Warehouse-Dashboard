import { useCallback, useEffect, useState } from 'react';
import type { NextPage } from 'next';
import NextLink from 'next/link';
import Head from 'next/head';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { Box, Button, Container, Skeleton, Typography } from '@mui/material';
import { invoiceApi } from 'src/api/invoice';
import { InvoicePdfPreview } from 'src/components/dashboard/invoices/invoice-pdf-preview';
import { InvoicePDF } from 'src/components/dashboard/invoices/invoice-pdf'; 
import { useMounted } from 'src/hooks/use-mounted';
import { ArrowLeft as ArrowLeftIcon } from '../../../icons/arrow-left';
import { Download as DownloadIcon } from '../../../icons/download';
import { ExclamationOutlined as ExclamationOutlinedIcon } from '../../../icons/exclamation-outlined';
import type { Invoice } from '../../../types/invoice';

interface InvoiceState {
  data?: Invoice;
  error?: string;
  isLoading: boolean;
}

const OrderInvoice: NextPage = () => {
  const isMounted = useMounted();
  const [invoiceState, setInvoiceState] = useState<InvoiceState>({ isLoading: true });

  const getInvoice = useCallback(async () => {
    setInvoiceState(() => ({ isLoading: true }));

    try {
      const result = await invoiceApi.getInvoice();

      if (isMounted()) {
        setInvoiceState(() => ({
          isLoading: false,
          data: result
        }));
      }
    } catch (err) {
      console.error(err);

      if (isMounted()) {
        setInvoiceState(() => ({
          isLoading: false,
          error: err.message
        }));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getInvoice().catch(console.error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const renderContent = () => {
    if (invoiceState.isLoading) {
      return (
        <Box sx={{ py: 4 }}>
          <Skeleton height={42} />
          <Skeleton />
          <Skeleton />
        </Box>
      );
    }

    if (invoiceState.error) {
      return (
        <Box sx={{ py: 4 }}>
          <Box
            sx={{
              alignItems: 'center',
              backgroundColor: 'background.default',
              display: 'flex',
              flexDirection: 'column',
              p: 3
            }}
          >
            <ExclamationOutlinedIcon />
            <Typography
              color="textSecondary"
              sx={{ mt: 2 }}
              variant="body2"
            >
              {invoiceState.error}
            </Typography>
          </Box>
        </Box>
      );
    }

    return (
      <>
        <Box sx={{ py: 4 }}>
          <Box sx={{ mb: 2 }}>
            <NextLink
              href="/dashboard/purchase-order"
              passHref
            >
              <Button
                color="primary"
                component="a"
                startIcon={<ArrowLeftIcon />}
                variant="text"
              >
                Purchase Order
              </Button>
            </NextLink>
          </Box>
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex'
            }}
          >
            <Typography
              color="textPrimary"
              variant="h4"
            >
              Order Invoice
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <PDFDownloadLink
              document={<InvoicePDF invoice={invoiceState.data} />}
              fileName="order-invoice"
              style={{ textDecoration: 'none' }}
            >
              <Button
                color="primary"
                startIcon={<DownloadIcon />}
                size="large"
                variant="contained"
              >
                Download 
              </Button>
            </PDFDownloadLink>
          </Box>
        </Box>
        <InvoicePdfPreview invoice={invoiceState.data} />
      </>
    );
  };

  return (
    <>
      <Head>
        <title>Purchase Order Invoice: Invoice | Dashboard</title>
      </Head>
      <Box
        sx={{
          backgroundColor: 'background.default',
          flexGrow: 1
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%'
          }}
        >
          {renderContent()}
        </Container>
      </Box>
    </>
  );
};



export default OrderInvoice