'use client';

import { Cross2Icon } from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DataTableFacetedFilter } from './data-table-faceted-filter';
import { ticketStausesAPI } from '@/services/admin-api';
import { useQuery } from 'react-query';
import { Loading } from '@/components/ui/loading';
import { DataTableViewOptions } from './data-table-view-options';
import { reportCategoriesAPI } from '@/services/report-api';

// import { priorities, statuses } from "../data/data"

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  const { data: statuses, isLoading: statusLoading } = useQuery(
    ['ticket_statuses'],
    () => ticketStausesAPI()
  );
  const { data: userReportCategories, isLoading: loadingUserReprotCategories } =
    useQuery(['user_report_categories'], () => reportCategoriesAPI(1));

  const {
    data: productReportCategories,
    isLoading: loadingProductReportCategories,
  } = useQuery(['product_report_categories'], () => reportCategoriesAPI(2));

  const {
    data: collectionReportCategories,
    isLoading: loadingCollectionReportCategories,
  } = useQuery(['collection_report_categories'], () => reportCategoriesAPI(3));

  const { data: banReasons, isLoading: loadingBanReasons } = useQuery(
    ['collection_report_categories'],
    () => reportCategoriesAPI(0)
  );

  if (statusLoading) {
    return <Loading />;
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter username"
          value={
            (table.getColumn('username')?.getFilterValue() as string) ?? ''
          }
          onChange={(event) =>
            table.getColumn('username')?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn('ticket_status') && (
          <DataTableFacetedFilter
            column={table.getColumn('ticket_status')}
            title="Status"
            options={statuses?.data}
          />
        )}
        {!loadingUserReprotCategories &&
          table.getColumn('user_report_category') && (
            <DataTableFacetedFilter
              column={table.getColumn('user_report_category')}
              title="Category"
              options={userReportCategories?.data}
            />
          )}
        {!loadingProductReportCategories &&
          table.getColumn('product_report_category') && (
            <DataTableFacetedFilter
              column={table.getColumn('product_report_category')}
              title="Category"
              options={productReportCategories?.data}
            />
          )}
        {!loadingCollectionReportCategories &&
          table.getColumn('collection_report_category') && (
            <DataTableFacetedFilter
              column={table.getColumn('collection_report_category')}
              title="Category"
              options={collectionReportCategories?.data}
            />
          )}
        {!loadingBanReasons && table.getColumn('ban_reason') && (
          <DataTableFacetedFilter
            column={table.getColumn('ban_reason')}
            title="Ban reason"
            options={banReasons?.data}
          />
        )}
        {/* {table.getColumn("priority") && (
          <DataTableFacetedFilter
            column={table.getColumn("priority")}
            title="Priority"
            options={priorities}
          />
        )} */}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
