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


interface RowData {
    sku: string,
    description: string,
    upc: number,
    qtyAllocated: number,
    qtyPacked: number
}


function createData(
    sku: string,
    description: string,
    upc: number,
    qtyAllocated: number,
    qtyPacked: number
): RowData {
    return { sku, description, upc, qtyAllocated, qtyPacked };
}

const rows: RowData[] = [
    createData('WDGT-1', 'Transfer p-1', 137904228, 5, 4),
    createData('WDGT-1', 'Transfer p-1', 137904228, 5, 4),
    createData('WDGT-1', 'Transfer p-1', 137904228, 5, 4),
];


const Columns: string[] = ['SKU', 'DESCRIPTION', 'UPC', 'QTY ALLOCATED', 'QTY PACKED']


export default function TransferProductsTable() {
    return (
        <TableContainer component={Paper} sx={{}}>
            <Scrollbar>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            {
                                Columns.map((column, key) =>
                                    <TableCell key={key}>{column}</TableCell>
                                )
                            }

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, key) => (
                            <TableRow
                                key={key}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.sku}
                                </TableCell>
                                <TableCell align="left">{row.description}</TableCell>
                                <TableCell align="left">{row.upc}</TableCell>
                                <TableCell align="left">{row.qtyAllocated}</TableCell>
                                <TableCell align="left">{row.qtyPacked}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Scrollbar>
        </TableContainer>
    );
}