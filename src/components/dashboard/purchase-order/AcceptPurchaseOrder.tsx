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
    SelectChangeEvent,
    Typography
} from '@mui/material';
import AcceptOrderedPurchaseOrderTable from './AcceptOrderedPurchaseOrderTable'
import AcceptReceivedPurchaseOrderTable from './AcceptReceivedPurchaseOrderTable'



interface AcceptPurchaseOrderProps {
    onClose: () => void;
    open: boolean;
}

const orders = [
    { qty: 1, sku: '5482', description: "A short description about this order", cost: 50, total: '68.8' },
    { qty: 1, sku: '5482', description: "A short description about this order", cost: 50, total: '68.8' },
    { qty: 1, sku: '5482', description: "A short description about this order", cost: 50, total: '68.8' },
]




const AcceptPurchaseOrder: FC<AcceptPurchaseOrderProps> = (props) => {
    const { open, onClose, ...other } = props;


    const router = useRouter();


    return (
        <Dialog
            onClose={onClose}
            open={open}
            {...other}
        >
            <DialogTitle>
                Accept Purchase Order
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
                        <Typography
                            color="textSecondary"
                            variant="body2"
                        >
                            Acme LTD GB54423345
                            <br />
                            340 Lemon St. #5554
                            <br />
                            Spring Valley, California
                            <br />
                            United States
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        xs={6}
                    >
                        <Typography
                            color="textSecondary"
                            variant="body2"
                            textAlign={'right'}
                        >
                            Acme LTD GB54423345
                            <br />
                            340 Lemon St. #5554
                            <br />
                            Spring Valley, California
                            <br />
                            United States
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                    >
                        <Typography
                            color="textSecondary"
                            variant="body2"
                            sx={{ mt: 4 }}
                        >
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur ducimus consequatur reprehenderit saepe hic, laudantium, harum ratione quasi quidem corrupti nisi eum modi fuga magni praesentium alias porro. Ea perspiciatis maiores tempora modi quo.
                        </Typography>
                    </Grid>



                </Grid>

                <Divider sx={{ my: 6 }} />

                <Box sx={{ display: 'flex' }}>
                    <AcceptOrderedPurchaseOrderTable rows={orders} />
                    <AcceptReceivedPurchaseOrderTable rows={orders} />
                </Box>

            </DialogContent>
            <DialogActions>
                <Button
                    color="primary"
                    // onClick={onClose}
                    variant="text"
                >
                    Accept and Update
                </Button>
                <Button
                    color="primary"
                    // onClick={() => { formik.handleSubmit(); }}
                    onClick={onClose}
                    variant="contained"
                >
                    Accept and Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

AcceptPurchaseOrder.defaultProps = {
    open: false
};

AcceptPurchaseOrder.propTypes = {
    onClose: PropTypes.func,
    open: PropTypes.bool
};


export default AcceptPurchaseOrder