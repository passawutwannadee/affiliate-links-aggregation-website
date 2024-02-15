/* eslint-disable react-refresh/only-export-components */
import * as React from 'react';
import { CaretSortIcon } from '@radix-ui/react-icons';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
// import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useQuery } from 'react-query';
import { getUserReports } from '@/services/admin-api';
import { Loading } from '@/components/ui/loading';
import { Badge } from '@/components/ui/badge';
import { Sheet } from '@/components/ui/sheet';
import TicketDetails from './view-details/view-details';
import { MousePointerSquare } from 'lucide-react';

let data: Report[] = [
  // {
  //   reported_user: 'John Doe',
  //   report_category: 'Illegal Item',
  //   report_status: 'processing',
  //   report_detail:
  //     'This guy pretends to sell fry chicken, but he actually is selling crystal meth.',
  // },
];

export type Report = {
  report_id: number;
  reported_user: string;
  report_category: string;
  ticket_status_id: number;
  ticket_status: string;
  report_information: string;
  reporter_email: string;
  user_id: string;
  product_id: number;
};

export function ProductsReport() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [detailsOpen, setDetailsOpen] = React.useState<boolean>(false);
  const [info, setInfo] = React.useState<Report>({
    product_id: 0,
    report_category: 'Loading',
    report_id: 0,
    report_information: 'Loading',
    reported_user: 'Loading',
    reporter_email: 'Loading',
    ticket_status: 'Loading',
    ticket_status_id: 0,
    user_id: '0',
  });

  const onAction = (row: Report) => {
    setInfo(row);
    setDetailsOpen(true);
  };

  const columns: ColumnDef<Report>[] = [
    {
      id: 'select',
      // header: ({ table }) => (
      // //   <Checkbox
      // //     checked={table.getIsAllPageRowsSelected()}
      // //     onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      // //     aria-label="Select all"
      // //   />
      // ),
      // cell: ({ row }) => (
      // //   <Checkbox
      // //     checked={row.getIsSelected()}
      // //     onCheckedChange={(value) => row.toggleSelected(!!value)}
      // //     aria-label="Select row"
      // //   />
      // ),
      enableSorting: true,
      enableHiding: false,
    },
    {
      accessorKey: 'report_id',
      header: () => <div className="text-left">Report ID</div>,
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue('report_id')}</div>
      ),
    },
    {
      accessorKey: 'reported_user',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Reported User
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div>@{row.getValue('reported_user')}</div>,
    },
    {
      accessorKey: 'report_category',
      header: () => <div className="text-left">Reported Category</div>,
      cell: ({ row }) => (
        <div className="uowercase">{row.getValue('report_category')}</div>
      ),
    },
    {
      accessorKey: 'ticket_status',
      header: 'Status',
      cell: ({ row }) => (
        <>
          {/* <Badge>{row}</Badge> */}
          <Badge
            variant={
              row.original.ticket_status_id === 1
                ? 'secondary'
                : row.original.ticket_status_id === 2
                ? 'default'
                : 'default'
            }
          >
            {row.getValue('ticket_status')}
          </Badge>
        </>
      ),
    },
    // {
    //   id: 'ticket_status',
    //   accessorFn: (row: any) => (
    //     <>
    //       <Badge className="capitalize">{row.ticket_status_id}</Badge>
    //       <Badge className="capitalize">{row.ticket_status}</Badge>
    //     </>
    //   ),
    // },
    {
      header: 'Action',
      enableHiding: false,
      cell: ({ row }) => {
        // const Report = row.original;

        return (
          <>
            {row.original.ticket_status_id === 1 ? (
              <Button
                onClick={() => onAction(row.original)}
                className="w-12 h-8"
              >
                <MousePointerSquare />
              </Button>
            ) : (
              <Button
                disabled
                onClick={() => setDetailsOpen(true)}
                className="w-12 h-8"
              >
                <MousePointerSquare />
              </Button>
            )}
          </>
        );
      },
    },
  ];

  const { isLoading } = useQuery(
    ['product_reports'],
    () => getUserReports({ products: 'true' }),
    {
      onSuccess: (response) => {
        data = response.data;
      },
    }
  );

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  // const { isLoading } = useQuery(['user_report'], () => {
  //   onSuccess: (response) => {
  //     data = response.data;
  //   },
  // });

  // useEffect(() => {
  //   onSubmit();
  // }, []);

  // const onSubmit = () => {
  //   mutate({});
  // };

  const handleDetailsClose = () => {
    setDetailsOpen(false);
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <div className="container mx-auto">
        <div className="w-full">
          <div className="flex items-center py-4">
            {/* <Input
            placeholder="Filter emails..."
            value={(table.getColumn('email')?.getFilterValue() as string) ?? ''}
            onChange={(event) =>
              table.getColumn('email')?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          /> */}
            <DropdownMenu>
              {/* <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columndfsdsfsdfs <ChevronDownIcon className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger> */}
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && 'selected'}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-end space-x-2 py-4">
            {/* <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of{' '}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div> */}
            <div className="space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
      <p>{info?.report_id}</p>
      <Sheet open={detailsOpen} onOpenChange={setDetailsOpen}>
        <TicketDetails
          closeSheet={handleDetailsClose}
          productId={info.product_id}
          reportId={info.report_id}
          reporterEmail={info.reporter_email}
          reportedUser={info.reported_user}
          reportReason={info.report_category}
          reportInformation={info.report_information}
          userId={parseInt(info.user_id)}
        />
      </Sheet>
    </>
  );
}
