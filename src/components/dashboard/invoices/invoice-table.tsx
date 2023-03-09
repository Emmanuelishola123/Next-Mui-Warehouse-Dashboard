import type { FC } from 'react';
import PropTypes from 'prop-types';
import numeral from 'numeral';
import { Box, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import type { Invoice } from '../../../types/invoice';
import { Scrollbar } from '../../scrollbar';

interface InvoiceLineItemsTableProps {
  invoice: Invoice;
}

const tableHead = ['QTY', 'SKU', 'UPC', 'DESCRIPTION', 'COST', 'TOTAL']

export const InvoiceTable: FC<InvoiceLineItemsTableProps> = (props) => {
  const { invoice } = props;

  return (
    <Box width={'100%'}>
      <Scrollbar>
        <Table sx={{ minWidth: 500, width: '100%' }}>
          <TableHead>
            <TableRow>
              {
                tableHead.map((t, key) =>
                  <TableCell key={key}>
                    {t}
                  </TableCell>
                )
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {invoice.lineItems.map((item, key) => (
              <TableRow key={key}>
                <TableCell>
                  {item.quantity}
                </TableCell>
                <TableCell>
                  {item.sku}
                </TableCell>
                <TableCell>
                  {item?.upc}
                </TableCell>
                <TableCell sx={{ width: 150 }}>
                  {item?.name}
                </TableCell>
                <TableCell sx={{ width: 150 }}>
                  {item?.unitAmount}
                </TableCell>
                <TableCell sx={{ width: 150 }}>
                  {item?.totalAmount}
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell />
              <TableCell />
              <TableCell />
              <TableCell />
              <TableCell />
              <TableCell>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Typography
                    color="textSecondary"
                    sx={{ mr: 1 }}
                    variant="subtitle2"
                  >
                    Tax
                  </Typography>
                  <Typography
                    color="textPrimary"
                    variant="subtitle2"
                  >
                    {numeral(invoice?.taxAmount).format(`${invoice?.currencySymbol}0,0.00`)}
                  </Typography>
                </Box>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell />
              <TableCell />
              <TableCell />
              <TableCell />
              <TableCell />
              <TableCell>
                <Box
                  sx={{
                    alignItems: 'center',
                    display: 'flex'
                  }}
                >
                  <Typography
                    color="textSecondary"
                    sx={{ mr: 1 }}
                    variant="subtitle2"
                  >
                    Total
                  </Typography>
                  <Typography
                    color="textPrimary"
                    variant="h6"
                  >
                    {numeral(invoice.totalAmount).format(`${invoice.currencySymbol}0,0.00`)}
                  </Typography>
                </Box>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Scrollbar>
    </Box>
  );
};

InvoiceTable.propTypes = {
  // @ts-ignore
  invoice: PropTypes.object.isRequired
};
