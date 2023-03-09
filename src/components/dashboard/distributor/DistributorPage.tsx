import type { MouseEvent } from 'react';
import { useCallback, useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Box, Button, Card, Container, Divider, Typography } from '@mui/material';
import type { Filter } from '@/types/filter';
import { productApi } from '@/pages/api/product';
import { ProductCreateDialog } from '@/components/dashboard/product/product-create-dialog';
import { distributorsFilter } from './DistributorFilter';
import { DistributorTable } from './DistributorTable';
import type { Product } from '@/types/product';
import { useMounted } from '@/hooks/use-mounted';
import { useSelection } from '@/hooks/use-selection';
import { Plus as PlusIcon } from '@/icons/plus';
import { gtm } from '@/lib/gtm';




interface ProductsState {
  data?: {
    products: Product[];
    productsCount: number;
  };
  error?: string;
  isLoading: boolean;
}

interface Controller {
  filters: Array<{ property: string; value: string; operator: string }>;
  page: number;
  query: string;
  sort: 'asc' | 'desc';
  sortBy: string;
  view: string;
}

const DistributorPage: NextPage = () => {
  const isMounted = useMounted();
  const [controller, setController] = useState<Controller>({
    filters: [],
    page: 0,
    query: '',
    sort: 'desc',
    sortBy: 'updatedAt',
    view: 'all'
  });
  const [productsState, setProductsState] = useState<ProductsState>({ isLoading: true });
  const [
    selectedProducts,
    handleSelect,
    handleSelectAll
  ] = useSelection(productsState.data?.products);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);

  const getProducts = useCallback(async () => {
    setProductsState(() => ({ isLoading: true }));

    try {
      const result = await productApi.getProducts({
        filters: controller.filters,
        page: controller.page,
        query: controller.query,
        sort: controller.sort,
        sortBy: controller.sortBy,
        view: controller.view
      });

      if (isMounted()) {
        setProductsState(() => ({
          isLoading: false,
          data: result
        }));
      }
    } catch (err) {
      console.error(err);

      if (isMounted()) {
        setProductsState(() => ({
          isLoading: false,
          error: err.message
        }));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [controller]);

  useEffect(() => {
    getProducts().catch(console.error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [controller]);

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  const handleViewChange = (newView: string): void => {
    setController({
      ...controller,
      page: 0,
      view: newView
    });
  };

  const handleQueryChange = (newQuery: string): void => {
    setController({
      ...controller,
      page: 0,
      query: newQuery
    });
  };

  const handleFiltersApply = (newFilters: Filter[]): void => {
    const parsedFilters = newFilters.map((filter) => ({
      property: filter.property.name,
      value: filter.value,
      operator: filter.operator.value
    }));

    setController({
      ...controller,
      page: 0,
      filters: parsedFilters
    });
  };

  const handleFiltersClear = (): void => {
    setController({
      ...controller,
      page: 0,
      filters: []
    });
  };

  const handlePageChange = (newPage: number): void => {
    setController({
      ...controller,
      page: newPage - 1
    });
  };

  const handleSortChange = (event: MouseEvent<HTMLElement>, property: string): void => {
    const isAsc = controller.sortBy === property && controller.sort === 'asc';

    setController({
      ...controller,
      page: 0,
      sort: isAsc ? 'desc' : 'asc',
      sortBy: property
    });
  };

  return (
    <>

      <Box sx={{ flexGrow: 1 }}>
        <Container
          maxWidth="xl"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%'
          }}
        >
          <Box sx={{ py: 4 }}>
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex'
              }}
            >
              {/* <Typography
                                color="textPrimary"
                                variant="h4"
                            >
                                Products
                            </Typography> */}
              <Box sx={{ flexGrow: 1 }} />
              <Button
                color="primary"
                onClick={() => setOpenCreateDialog(true)}
                size="large"
                startIcon={<PlusIcon fontSize="small" />}
                variant="contained"
              >
                Add Company
              </Button>
            </Box>
          </Box>

          <Card
            sx={{
              display: 'flex',
              flexDirection: 'column',
              flexGrow: 1
            }}
          >
            <distributorsFilter
              disabled={productsState.isLoading}
              filters={controller.filters}
              onFiltersApply={handleFiltersApply}
              onFiltersClear={handleFiltersClear}
              onQueryChange={handleQueryChange}
              onViewChange={handleViewChange}
              query={controller.query}
              selectedProducts={selectedProducts}
              view={controller.view}
            />
            <Divider />
            <DistributorTable
              error={productsState.error}
              isLoading={productsState.isLoading}
              onPageChange={handlePageChange}
              onSelect={handleSelect}
              onSelectAll={handleSelectAll}
              onSortChange={handleSortChange}
              page={controller.page + 1}
              products={productsState.data?.products}
              productsCount={productsState.data?.productsCount}
              selectedProducts={selectedProducts}
              sort={controller.sort}
              sortBy={controller.sortBy}
            />
          </Card>
        </Container>
      </Box>
      <ProductCreateDialog
        onClose={() => setOpenCreateDialog(false)}
        open={openCreateDialog}
      />
    </>
  );
};


export default DistributorPage;
