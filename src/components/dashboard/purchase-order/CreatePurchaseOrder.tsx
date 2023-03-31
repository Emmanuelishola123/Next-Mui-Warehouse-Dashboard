import { FC, useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormHelperText,
  Grid,
  Divider,
  Box,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent
} from '@mui/material';
import NewPurchaseOrderTable from './NewPurchaseOrderTable'
import { MenuItem } from '@mui/material';
import { productApi } from 'src/api/product';



interface OrderCreateDialogProps {
  onClose: () => void;
  open: boolean;
}

const distributors = ['Distributor 1', 'Distributor 2', 'Distributor 3', 'Distributor 4']
const deliveryMethods = ['Pick Up', 'Deliver']


const CreatePurchaseOrder: FC<OrderCreateDialogProps> = (props) => {
  const { open, onClose, ...other } = props;
  const [orders, setOrders] = useState([])
  const [distributor, setDistributor] = useState(distributors[0])
  const [deliveryMethod, setDeliveryMethod] = useState(deliveryMethods[0])
  const [products, setProducts] = useState([])
  const [selectedProduct, setSelectedProduct] = useState({})

  const router = useRouter();

  const getProducts = useCallback(async () => {
    try {
      const result = await productApi.getRawProducts();
      setProducts(result.products)
      setSelectedProduct({...result.products[0]})
    } catch (err) {
      console.error(err);

    }
  }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    , []);


  const formik = useFormik({
    initialValues: {
      customerEmail: '',
      customerName: '',
      submit: 'null'
    },
    validationSchema: Yup.object().shape({
      customerEmail: Yup.string().max(255).email().required('CustomerLayout email is required'),
      customerName: Yup.string().max(255).required('CustomerLayout name is required')
    }),

    onSubmit: async (values, helpers) => {
      try {
        helpers.setStatus({ success: true });
        helpers.setSubmitting(false);
        helpers.resetForm();
        router.push('/dashboard/purchase-order');
      } catch (err) {
        console.error(err);
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    }
  });

  const handleDistributor = (event: SelectChangeEvent) => {
    setDistributor(event.target.value);
  };

  const handleDeliveryMethod = (event: SelectChangeEvent) => {
    setDeliveryMethod(event.target.value);
  };

  const handleProduct = (event: SelectChangeEvent) => {
    setSelectedProduct(event.target.value);
    console.log({ selectedProduct })
  };


  const handleNewOrder = () => {
    let newOrder = { distributor: distributor, deliveryMethod: deliveryMethod, qty: 1, sku: selectedProduct?.sku, description: selectedProduct?.name, cost: `${selectedProduct?.currencySymbol}${selectedProduct?.price}`, total: `${selectedProduct?.currencySymbol}${selectedProduct?.price}` }
    setOrders(prev => [...prev, newOrder])
    setDistributor('')
    setDeliveryMethod('')
    setSelectedProduct(products[0])
    console.log({ orders })
  }


  useEffect(() => {
    getProducts()

  }, [])

  return (
    <Dialog
      onClose={onClose}
      open={open}
      TransitionProps={{
        onExited: () => formik.resetForm()
      }}
      {...other}
    >
      <DialogTitle>
        Create Purchase Order
      </DialogTitle>
      <DialogContent>
        <Grid
          container
          spacing={2}
        >
          <Grid
            item
            xs={12}
          >
            <FormControl required sx={{ m: 1, width: '100%' }}>
              <InputLabel>Select Distributor</InputLabel>
              <Select
                value={distributor}
                label="Select Distributor"
                onChange={handleDistributor}
              >
                {
                  distributors.map(d =>
                    <MenuItem key={d} value={d}>{d}</MenuItem>
                  )
                }

              </Select>
            </FormControl>

          </Grid>
          <Grid
            item
            xs={12}
          >
            <FormControl required sx={{ m: 1, width: '100%' }}>
              <InputLabel>Select Delivery Method </InputLabel>
              <Select
                value={deliveryMethod}
                label="Select Delivery Method"
                onChange={handleDeliveryMethod}
              >
                {
                  deliveryMethods.map(d =>
                    <MenuItem key={d} value={d}>{d}</MenuItem>
                  )
                }

              </Select>
              {/* <FormHelperText>Distributor is Required</FormHelperText> */}
            </FormControl>

          </Grid>
          <Grid
            item
            xs={12}
          >
            <FormControl required sx={{ m: 1, width: '100%' }}>
              <InputLabel>Select Product</InputLabel>
              <Select
                value={selectedProduct}
                label="Select Product"
                onChange={handleProduct}
              >
                {
                  products.map(d =>
                    <MenuItem key={d?.id} value={d}>{d?.name}</MenuItem>
                  )
                }

              </Select>
              {/* <FormHelperText>Distributor is Required</FormHelperText> */}
            </FormControl>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button variant='contained' onClick={handleNewOrder}>Add</Button>
            </Box>
          </Grid>


          {formik.errors.submit && (
            <Grid
              item
              xs={12}
            >
              <FormHelperText error>
                {formik.errors.submit}
              </FormHelperText>
            </Grid>
          )}
        </Grid>

        <Divider sx={{ my: 6 }} />

        <Box >
          <NewPurchaseOrderTable rows={orders} />
        </Box>

      </DialogContent>
      <DialogActions>
        <Button
          color="primary"
          // onClick={onClose}
          variant="text"
        >
          Save
        </Button>
        <Button
          color="primary"
          onClick={() => { formik.handleSubmit(); }}
          variant="contained"
          disabled={formik.isSubmitting}
        >
          Save and Send PO
        </Button>
      </DialogActions>
    </Dialog>
  );
};

CreatePurchaseOrder.defaultProps = {
  open: false
};

CreatePurchaseOrder.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool
};


export default CreatePurchaseOrder