import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Scrollbar } from 'src/components/scrollbar'


interface Data {
    status: 'Open' | 'Closed',
    poNumber: number,
    distributor: string,
    poDate: string,
    soNumber: number,
    rcvd: string,
    contactStatus: 'Email sent' | 'Phoned in'
}

function createData(
    status: 'Open' | 'Closed',
    poNumber: number,
    distributor: string,
    poDate: string,
    soNumber: number,
    rcvd: string,
    contactStatus: 'Email sent' | 'Phoned in'
): Data {
    return { status, poNumber, distributor, poDate, soNumber, rcvd, contactStatus };
}

const rows = [
    createData('Open', 3417, 'SS & Si', '06/03/2023', 13241713, '06/03/2023', 'Email sent'),
    createData('Closed', 3417, 'SS & Si', '06/03/2023', 17941713, '06/03/2023', 'Email sent'),
    createData('Open', 3417, 'SS & Si', '06/03/2023', 132001713, '06/03/2023', 'Phoned in'),
    createData('Open', 3417, 'SS & Si', '06/03/2023', 13241713, '06/03/2023', 'Phoned in'),
    createData('Closed', 3417, 'SS & Si', '06/03/2023', 5799778, '06/03/2023', 'Email sent'),
    createData('Open', 3417, 'SS & Si', '06/03/2023', 13288613, '06/03/2023', 'Phoned in'),

];

const columns = ['Status', 'PO Number', 'Distributor', 'PO Date', 'SO-Number', 'RVCD', 'Contact Status']

export default function DistributorPurchaseOrderTable() {
    // const [page, setPage] = React.useState(0);
    // const [rowsPerPage, setRowsPerPage] = React.useState(10);

    // const handleChangePage = (event: unknown, newPage: number) => {
    //     setPage(newPage);
    // };

    // const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setRowsPerPage(+event.target.value);
    //     setPage(0);
    // };

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ minHeight: 460 }}>
                <Scrollbar>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column}
                                        align={'left'}
                                        style={{ minWidth: 'auto' }}
                                    >
                                        {column}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row, key) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={key}>
                                        <TableCell align={'left'}>{row.status}</TableCell>
                                        <TableCell align={'left'}>{row.poNumber}</TableCell>
                                        <TableCell align={'left'}>{row.distributor}</TableCell>
                                        <TableCell align={'left'}>{row.poDate}</TableCell>
                                        <TableCell align={'left'}>{row.soNumber}</TableCell>
                                        <TableCell align={'left'}>{row.rcvd}</TableCell>
                                        <TableCell align={'left'}>{row.contactStatus}</TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </Scrollbar>
            </TableContainer>
            {/* <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      /> */}
        </Paper>
    );
}
