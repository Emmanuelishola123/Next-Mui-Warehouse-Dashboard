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
    IconButton
} from '@mui/material';
import type { Product } from '../../../types/product';
import { Pagination } from '../../pagination';
import { ResourceError } from '../../resource-error';
import { ResourceUnavailable } from '../../resource-unavailable';
import { Scrollbar } from '../../scrollbar';
import { Status } from '../../status';
import { DistributorMenu } from './DistributorMenu';
import { ExternalLink } from 'src/icons/external-link';
import DeleteIcon from '@mui/icons-material/Delete';



interface DistributorsTableProps {
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
        id: 'name',
        label: 'Name'
    },
    {
        id: 'email',
        label: 'Email'
    },
    {
        id: 'phoneNumber',
        label: 'Phone Number'
    },
    {
        id: 'mainContact',
        label: 'Main Contact'
    },
    {
        id: 'contactEmail',
        label: 'Contact Main'
    },
    {
        id: 'notes',
        label: 'Notes'
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

export const DistributorTable: FC<DistributorsTableProps> = (props) => {
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
                                        products?.length > 0
                                        && selectedProducts?.length === products?.length
                                    }
                                    disabled={isLoading}
                                    indeterminate={
                                        selectedProducts?.length > 0
                                        && selectedProducts?.length < products?.length
                                    }
                                    onChange={onSelectAll}
                                    
                                /> Action
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
                        {products?.map((product) => {
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
                                       <Box sx={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                                       <Checkbox
                                            checked={!!selectedProducts.find(
                                                (selectedCustomer) => selectedCustomer === product.id
                                            )}
                                            onChange={(event) => onSelect(event, product.id)}
                                        />

                                        <IconButton sx={{borderRadius: '50%'}}>
                                        <ExternalLink />
                                        </IconButton>
                                        <IconButton sx={{borderRadius: '50%'}}>
                                        <DeleteIcon color='error' />
                                        </IconButton>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        {product.name.slice(0,12)}
                                    </TableCell>
                                    <TableCell>
                                        {product.name.slice(0, 4)}@gmail.com
                                    </TableCell>
                                    <TableCell>
                                        {product.sku}
                                    </TableCell>
                                    <TableCell>
                                        {product.name.slice(0, 4)}@gmail.com
                                    </TableCell>
                                    <TableCell>
                                        {product.name.slice(0, 4)}@gmail.com
                                    </TableCell>
                                   
                                    <TableCell>
                                        {product.description}
                                    </TableCell>
                                    {/* <TableCell align="right">
                                        <DistributorMenu />
                                    </TableCell> */}
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

// DistributorTable.defaultProps = {
//   page: 1,
//   products: [],
//   productsCount: 0,
//   selectedProducts: [],
//   sort: 'desc',
//   sortBy: 'createdAt'
// };

// DistributorTable.propTypes = {
//   error: Proptypes.string,
//   isLoading: Proptypes.bool,
//   onPageChange: Proptypes.func,
//   onSelect: Proptypes.func,
//   onSelectAll: Proptypes.func,
//   onSortChange: Proptypes.func,
//   page: Proptypes.number,
//   products: Proptypes.array,
//   productsCount: Proptypes.number,
//   selectedProducts: Proptypes.array,
//   sort: Proptypes.oneOf(['asc', 'desc']),
//   sortBy: Proptypes.string
// };
