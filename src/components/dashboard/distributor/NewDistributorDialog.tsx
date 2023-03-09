import type { FC } from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    FormHelperText,
    Grid,
    Typography
} from '@mui/material';
import { InputField } from '../../input-field';
import DistributorContactsTable from '../../../components/dashboard/distributor/DistributorContactsTable'


interface NewDistributorDialogProps {
    onClose: () => void;
    open: boolean;
}

export const NewDistributorDialog: FC<NewDistributorDialogProps> = (props) => {
    const { open, onClose, ...other } = props;
    const formik = useFormik({
        initialValues: {
            distributorName: '',
            distributorAddress: '',
            orderEmail: 'null',
            arEmail: 'null',
            apEmail: 'null',
            distributorPhone: 'null',
        },
        validationSchema: Yup.object().shape({
            description: Yup.string().max(500).required('Description is required'),
            name: Yup.string().max(255).required('Name is required')
        }),
        onSubmit: async (values, helpers) => {
            try {
                toast.success('New Distributor Created');
                helpers.setStatus({ success: true });
                helpers.setSubmitting(false);
                helpers.resetForm();
                onClose?.();
            } catch (err) {
                console.error(err);
                helpers.setStatus({ success: false });
                helpers.setErrors({ submit: err.message });
                helpers.setSubmitting(false);
            }
        }
    });

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
                Create Distributor
            </DialogTitle>
            <DialogContent>
                <Grid
                    container
                    spacing={2}
                >
                    <Grid
                        item
                        xs={6}
                    >
                        <InputField
                            error={Boolean(formik.errors.distributorName)}
                            fullWidth
                            helperText={formik.errors.distributorName}
                            name="name"
                            // onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.distributorName}
                            placeholder='Distributor Name'
                        />
                    </Grid>

                    <Grid
                        item
                        xs={12}
                    >
                        <InputField
                            error={Boolean(formik.touched.distributorAddress && formik.errors.distributorAddress)}
                            fullWidth
                            helperText={formik.touched.distributorAddress && formik.errors.distributorAddress}
                            multiline
                            name="Distributor Address"
                            placeholder="Distributor Address"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            rows={3}
                            value={formik.values.distributorAddress}
                        />
                    </Grid>

                    <Grid
                        item
                        xs={6}
                    >
                        <InputField
                            error={Boolean(formik.touched.orderEmail && formik.errors.orderEmail)}
                            fullWidth
                            helperText={formik.touched.orderEmail && formik.errors.orderEmail}
                            name="Order Email"
                            placeholder="Order Email"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            rows={1}
                            value={formik.values.orderEmail}
                        />
                    </Grid>
                    <Grid
                        item
                        xs={6}
                    >
                        <InputField
                            error={Boolean(formik.touched.arEmail && formik.errors.arEmail)}
                            fullWidth
                            helperText={formik.touched.arEmail && formik.errors.arEmail}
                            name="AR Email"
                            placeholder="AR Email"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            rows={1}
                            value={formik.values.arEmail}
                        />
                    </Grid>
                    <Grid
                        item
                        xs={6}
                    >
                        <InputField
                            error={Boolean(formik.touched.apEmail && formik.errors.apEmail)}
                            fullWidth
                            helperText={formik.touched.apEmail && formik.errors.apEmail}
                            name="AP Email"
                            placeholder="AP Email"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            rows={1}
                            value={formik.values.apEmail}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <InputField
                            error={Boolean(formik.touched.distributorPhone && formik.errors.distributorPhone)}
                            fullWidth
                            helperText={formik.touched.distributorPhone && formik.errors.distributorPhone}
                            name="Distributor Phone"
                            placeholder="Distributor Phone"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            rows={1}
                            value={formik.values.distributorPhone}
                        />
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
                <Divider sx={{ my: 4 }} />
                <Box>
                    <Typography
                        sx={{ flex: '1 1 100%' }}
                        variant="h6"
                        id="tableTitle"
                        component="div"
                    >
                        Distributor Contacts
                    </Typography>
                    <DistributorContactsTable />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button
                    color="primary"
                    onClick={onClose}
                    variant="text"
                >
                    Cancel
                </Button>
                <Button
                    color="primary"
                    disabled={formik.isSubmitting}
                    onClick={() => { formik.handleSubmit(); }}
                    variant="contained"
                >
                    Create Distributor
                </Button>
            </DialogActions>
        </Dialog>
    );
};

NewDistributorDialog.defaultProps = {
    open: false
};

NewDistributorDialog.propTypes = {
    onClose: PropTypes.func,
    open: PropTypes.bool
};



export default NewDistributorDialog;