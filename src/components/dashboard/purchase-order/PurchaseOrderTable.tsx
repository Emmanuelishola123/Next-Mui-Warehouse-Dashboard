import type { ChangeEvent, FC, MouseEvent } from 'react';
import Proptypes from 'prop-types';
import NextLink from 'next/link';
import { format } from 'date-fns';
import {
  Avatar,
  Box,
  Checkbox,
  Divider,
  Link,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography
} from '@mui/material';
import type { Product } from '../../../types/product';
import { applyPagination } from 'src/utils/apply-pagination';
import { ResourceError } from '../../resource-error';
import { ResourceUnavailable } from '../../resource-unavailable';
import { Scrollbar } from '../../scrollbar';
import { Status } from '../../status';
import { ProductMenu } from '../product/product-menu';
import { Pagination } from 'src/components/pagination';


interface OrdersTableProps {
  error: string;
  isLoading: boolean;
  onPageChange: (newPage: number) => void;
  onSelect: (event: ChangeEvent<HTMLInputElement>, rowId: string) => void;
  onSelectAll: (event: ChangeEvent<HTMLInputElement>) => void;
  onSortChange: (event: MouseEvent<HTMLElement>, property: string) => void;
  page: number;
  products: Product[];
  productsCount: number;
  selectedProducts: string[];
  sort: 'asc' | 'desc';
  sortBy: string;
}

const columns = [
  {
    id: 'status',
    label: 'Status'
  },
  {
    id: 'purchase-order-number',
    label: 'PO Number'
  },
  {
    id: 'distributor',
    label: 'Distributor'
  },
  {
    id: 'purchase-order-date',
    label: 'PO Date'
  },
  {
    id: 'contact-status',
    label: 'Contact Status'
  }
];

const statusVariants = [
  {
    color: 'info.main',
    label: 'Draft',
    value: 'draft'
  },
  {
    color: 'success.main',
    label: 'Published',
    value: 'published'
  }
];

export const PurchaseOrdersTable: FC<OrdersTableProps> = (props) => {
  const {
    error,
    isLoading,
    onPageChange,
    onSelect,
    onSelectAll,
    onSortChange,
    page,
    products,
    productsCount,
    selectedProducts,
    sort,
    sortBy
  } = props;

  const displayLoading = isLoading;
  const displayError = Boolean(!isLoading && error);
  const displayUnavailable = Boolean(!isLoading && !error && !products.length);

  return (
    <Box
      sx={{
        display: 'flex',
        flex: 1,
        flexDirection: 'column'
      }}
    >
      <Scrollbar>
        <Table sx={{ minWidth: 800 }}>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={
                    products.length > 0
                    && selectedProducts.length === products.length
                  }
                  disabled={isLoading}
                  indeterminate={
                    selectedProducts.length > 0
                    && selectedProducts.length < products.length
                  }
                  onChange={onSelectAll}
                />
              </TableCell>
              {columns.map((column) => (
                <TableCell key={column.id}>
                  <TableSortLabel
                    active={sortBy === column.id}
                    direction={sortBy === column.id ? sort : 'asc'}
                    disabled={isLoading}
                    onClick={(event) => onSortChange(event, column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                </TableCell>
              ))}
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => {
              const statusVariant = statusVariants.find(
                (variant) => variant.value === product.status
              );

              return (
                <TableRow
                  hover
                  key={product.id}
                  selected={!!selectedProducts.find(
                    (selectedCustomer) => selectedCustomer === product.id
                  )}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={!!selectedProducts.find(
                        (selectedCustomer) => selectedCustomer === product.id
                      )}
                      onChange={(event) => onSelect(event, product.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      <Avatar
                        alt={product.name}
                        src={product.image}
                        sx={{
                          width: 64,
                          height: 64
                        }}
                        variant="rounded"
                      />
                      <Box sx={{ ml: 2 }}>
                        <NextLink
                          href="/dashboard/products/1"
                          passHref
                        >
                          <Link
                            color="inherit"
                            component="a"
                            sx={{ display: 'block' }}
                            underline="none"
                            variant="subtitle2"
                          >
                            {product.name}
                          </Link>
                        </NextLink>
                        <Typography
                          color="textSecondary"
                          sx={{ mt: 1 }}
                          variant="body2"
                        >
                          12 in stock for 1 variant
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <div>
                      <Typography
                        color="inherit"
                        variant="body2"
                      >
                        {format(product.updatedAt, 'dd MMM yyyy')}
                      </Typography>
                      <Typography
                        color="textSecondary"
                        variant="body2"
                      >
                        {format(product.updatedAt, 'HH:mm')}
                      </Typography>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Status
                      color={statusVariant.color}
                      label={statusVariant.label}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <ProductMenu />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Scrollbar>
      {displayLoading && (
        <Box sx={{ p: 2 }}>
          <Skeleton height={42} />
          <Skeleton height={42} />
          <Skeleton height={42} />
        </Box>
      )}
      {displayError && (
        <ResourceError
          error={error}
          sx={{
            flexGrow: 1,
            m: 2
          }}
        />
      )}
      {displayUnavailable && (
        <ResourceUnavailable
          sx={{
            flexGrow: 1,
            m: 2
          }}
        />
      )}
      <Divider sx={{ mt: 'auto' }} />
      <Pagination
        disabled={isLoading}
        onPageChange={onPageChange}
        page={page}
        rowsCount={productsCount}
      />
    </Box>
  );
};

PurchaseOrdersTable.defaultProps = {
  page: 1,
  products: [],
  productsCount: 0,
  selectedProducts: [],
  sort: 'desc',
  sortBy: 'createdAt'
};

PurchaseOrdersTable.propTypes = {
  error: Proptypes.string,
  isLoading: Proptypes.bool,
  onPageChange: Proptypes.func,
  onSelect: Proptypes.func,
  onSelectAll: Proptypes.func,
  onSortChange: Proptypes.func,
  page: Proptypes.number,
  products: Proptypes.array,
  productsCount: Proptypes.number,
  selectedProducts: Proptypes.array,
  sort: Proptypes.oneOf(['asc', 'desc']),
  sortBy: Proptypes.string
};
