import { FC } from 'react';
import PropTypes from 'prop-types';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Grid,
} from '@mui/material';
import { InputField } from 'src/components/input-field';
import TransferProductsTable from './TransferProductsTable';

interface AcceptReceiverTransferProps {
    onClose: () => void;
    open: boolean;
}


const AcceptReceiverTransfer: FC<AcceptReceiverTransferProps> = (props) => {
    const { open, onClose, ...other } = props;

    return (
        <Dialog
            onClose={onClose}
            open={open}
            {...other}
        >
            <DialogTitle>
                Accept Transfer Receiver
            </DialogTitle>
            <DialogContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2 }}>
                    <Grid container spacing={8} >
                        <Grid item xs={6}  >
                            <InputField label='From Warehouse' placeholder='From Warehouse' />
                        </Grid>
                        <Grid item xs={6}>
                            <InputField label='To Warehouse' placeholder='To Warehouse' />
                        </Grid>
                    </Grid>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                        <Button variant='contained'> Send All</Button>
                    </Box>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <TransferProductsTable />
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2 }}>
                    <InputField fullWidth multiline rows={3} placeholder='Short Notes' />
                    <InputField placeholder='Signature' />
                </Box>
                <Divider sx={{ my: 2 }} />
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
                    // onClick={onClose}
                    variant="contained"
                >
                    Received
                </Button>
            </DialogActions>
        </Dialog>
    );
};

AcceptReceiverTransfer.defaultProps = {
    open: false
};

AcceptReceiverTransfer.propTypes = {
    onClose: PropTypes.func,
    open: PropTypes.bool
};

export default AcceptReceiverTransfer