import { useCallback, useEffect, useState } from 'react';
import type { NextPage } from 'next';
import NextLink from 'next/link';
import Head from 'next/head';
import toast from 'react-hot-toast';
import { Box, Button, Container, Grid, Skeleton, Typography } from '@mui/material';
import { orderApi } from '../../../api/order';
import { ActionsMenu } from '../../../components/actions-menu';
// import { DashboardLayout } from '../../../components/dashboard/dashboard-layout';
import { OrderInfo } from '../../../components/dashboard/order/order-info';
import { OrderInfoDialog } from '../../../components/dashboard/order/order-info-dialog';
import { OrderLineItems } from '../../../components/dashboard/order/order-line-items';
import { OrderPayment } from '../../../components/dashboard/order/order-payment';
import { OrderPaymentDialog } from '../../../components/dashboard/order/order-payment-dialog';
import { OrderStatus } from '../../../components/dashboard/order/order-status';
import type { Order as OrderInterface } from '../../../types/order';
import { useMounted } from '../../../hooks/use-mounted';
import { ArrowLeft as ArrowLeftIcon } from '../../../icons/arrow-left';
import { ExclamationOutlined as ExclamationOutlinedIcon } from '../../../icons/exclamation-outlined';
import { gtm } from '../../../lib/gtm';

interface OrderState {
  data?: OrderInterface;
  error?: string;
  isLoading: boolean;
}

const PurchaseOrderDetails: NextPage = () => {
  const isMounted = useMounted();
  const [orderState, setOrderState] = useState<OrderState>({ isLoading: true });
  const [openInfoDialog, setOpenInfoDialog] = useState(false);
  const [openPaymentDialog, setOpenPaymentDialog] = useState(false);

  const getOrder = useCallback(async () => {
    setOrderState(() => ({ isLoading: true }));

    try {
      const result = await orderApi.getOrder();

      if (isMounted()) {
        setOrderState(() => ({
          isLoading: false,
          data: result
        }));
      }
    } catch (err) {
      console.error(err);

      if (isMounted()) {
        setOrderState(() => ({
          isLoading: false,
          error: err.message
        }));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getOrder().catch(console.error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleMark = (): void => {
    toast.error('This action is not available on demo');
  };

  const handleCancel = (): void => {
    toast.error('This action is not available on demo');
  };

  const handleDelete = (): void => {
    toast.error('This action is not available on demo');
  };

  const actions = [
    {
      label: 'Mark as Duplicate',
      onClick: handleMark
    },
    {
      label: 'Cancel Order',
      onClick: handleCancel
    },
    {
      label: 'Delete Order',
      onClick: handleDelete
    }
  ];

  const renderContent = () => {
    if (orderState.isLoading) {
      return (
        <Box sx={{ py: 4 }}>
          <Skeleton height={42} />
          <Skeleton />
          <Skeleton />
        </Box>
      );
    }

    if (orderState.error) {
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
              {orderState.error}
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
                Purchase Orders
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
              {`#${orderState.data.id}`}
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <ActionsMenu actions={actions} />
          </Box>
        </Box>
        <Grid
          container
          spacing={3}
        >
          <Grid
            container
            item
            lg={8}
            spacing={3}
            sx={{ height: 'fit-content' }}
            xs={12}
          >
            <Grid
              item
              xs={12}
            >
              <OrderInfo
                onEdit={() => setOpenInfoDialog(true)}
                order={orderState.data}
              />
            </Grid>
            <Grid
              item
              xs={12}
            >
              <OrderPayment
                onEdit={() => setOpenPaymentDialog(true)}
                order={orderState.data}
              />
            </Grid>
            <Grid
              item
              xs={12}
            >
              <OrderLineItems order={orderState.data} />
            </Grid>
          </Grid>
          <Grid
            container
            item
            lg={4}
            spacing={3}
            sx={{ height: 'fit-content' }}
            xs={12}
          >
            <Grid
              item
              xs={12}
            >
              <OrderStatus order={orderState.data} />
            </Grid>
          </Grid>
        </Grid>
        <OrderInfoDialog
          onClose={() => setOpenInfoDialog(false)}
          open={openInfoDialog}
          order={orderState.data}
        />
        <OrderPaymentDialog
          onClose={() => setOpenPaymentDialog(false)}
          open={openPaymentDialog}
          order={orderState.data}
        />
      </>
    );
  };

  return (
    <>
      <Head>
        <title>
         Purchase Order: Details |  Dashboard
        </title>
      </Head>
      <Box sx={{ flexGrow: 1 }}>
        <Container
          maxWidth="xl"
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

export default PurchaseOrderDetails