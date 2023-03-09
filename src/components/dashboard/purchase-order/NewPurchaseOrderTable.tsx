import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import PropTypes from 'prop-types';


interface OrderType {
    qty: number,
    sku: string,
    description: string,
    cost: number,
    total: string,
    deliveryMethod?: string,
    distributor?: string,
}

interface propType {
    rows: OrderType[]
}

export default function NewOrderTable(props: propType) {
    const { rows } = props

    return (
        <TableContainer component={Paper} sx={{}}>

            <Scrollbar>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>QTY</TableCell>
                            <TableCell align="left">SKU</TableCell>
                            <TableCell align="left">DESCRIPTION</TableCell>
                            <TableCell align="left">COST</TableCell>
                            <TableCell align="left">TOTAL</TableCell>
                        </TableRow>
                    </TableHead>
                    {
                        rows && <TableBody>
                            {rows.map((row, key) => (
                                <TableRow
                                    key={key}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.qty}
                                    </TableCell>
                                    <TableCell align="left">{row.sku}</TableCell>
                                    <TableCell align="left">{row.description}</TableCell>
                                    <TableCell align="left">{row.cost}</TableCell>
                                    <TableCell align="left">{row.total}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    }
                </Table>
            </Scrollbar>
        </TableContainer>
    );
}



NewOrderTable.propTypes = {
    qty: PropTypes.number,
    sku: PropTypes.string,
    description: PropTypes.string,
    cost: PropTypes.number,
    total: PropTypes.string,
    deliveryMethod: PropTypes.string,
    distributor: PropTypes.string,
}