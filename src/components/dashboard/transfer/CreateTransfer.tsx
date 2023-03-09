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

interface CreateTransferProps {
    onClose: () => void;
    open: boolean;
}


const CreateTransfer: FC<CreateTransferProps> = (props) => {
    const { open, onClose, ...other } = props;

    return (
        <Dialog
            onClose={onClose}
            open={open}
            {...other}
        >
            <DialogTitle>
                Create New Transfer
            </DialogTitle>
            <DialogContent>
                <Grid
                    container
                    spacing={8}
                >
                    <Grid
                        item
                        xs={6}
                    >
                        <InputField label='From Warehouse' placeholder='From Warehouse' />
                    </Grid>
                    <Grid
                        item
                        xs={6}
                    >
                        <InputField label='To Warehouse' placeholder='To Warehouse' />

                    </Grid>
                </Grid>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <InputField placeholder='Searchable Product Field' />
                    <Button variant='contained'>Add Products</Button>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <InputField label='SKU' placeholder='SKU' />
                    <InputField label='DESCRIPTION' placeholder='Description' />
                    <InputField label='UPC' placeholder='UPC' />
                    <InputField label='QTY' placeholder='QTY' />

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
                    Create Transfer
                </Button>
            </DialogActions>
        </Dialog>
    );
};

CreateTransfer.defaultProps = {
    open: false
};

CreateTransfer.propTypes = {
    onClose: PropTypes.func,
    open: PropTypes.bool
};


export default CreateTransfer