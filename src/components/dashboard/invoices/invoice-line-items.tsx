import type { FC } from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, Divider } from '@mui/material';
import type { Invoice } from '../../../types/invoice';
import { InvoiceTable } from './invoice-table';

interface InvoiceLineItemsProps {
  invoice: Invoice;
}

export const InvoiceLineItems: FC<InvoiceLineItemsProps> = (props) => {
  const { invoice } = props;

  return (
    <Card>
      <CardHeader title="Line Items" />
      <Divider />
      <InvoiceTable invoice={invoice} />
    </Card>
  );
};

InvoiceLineItems.propTypes = {
  // @ts-ignore
  invoice: PropTypes.object.isRequired
};
