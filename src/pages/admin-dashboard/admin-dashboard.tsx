/* eslint-disable react-refresh/only-export-components */
import * as React from 'react';
import { CaretSortIcon, DotsHorizontalIcon } from '@radix-ui/react-icons';
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
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useMutation } from 'react-query';
import { getUserReports } from '@/services/admin-api';
import { Loading } from '@/components/ui/loading';
import { useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Sheet } from '@/components/ui/sheet';
import TicketDetails from './view-details/view-details';

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
  reported_user: string;
  report_category: string;
  ticket_status_id: number;
  report_detail: string;
};

export function AdminDashboard() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [detailsOpen, setDetailsOpen] = React.useState<boolean>(false);

  const columns: ColumnDef<Report>[] = [
    // {
    //   id: 'select',
    //   // header: ({ table }) => (
    //   // //   <Checkbox
    //   // //     checked={table.getIsAllPageRowsSelected()}
    //   // //     onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
    //   // //     aria-label="Select all"
    //   // //   />
    //   // ),
    //   // cell: ({ row }) => (
    //   // //   <Checkbox
    //   // //     checked={row.getIsSelected()}
    //   // //     onCheckedChange={(value) => row.toggleSelected(!!value)}
    //   // //     aria-label="Select row"
    //   // //   />
    //   // ),
    //   enableSorting: false,
    //   enableHiding: false,
    // },
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
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue('reported_user')}</div>
      ),
    },
    {
      accessorKey: 'report_category',
      header: () => <div className="text-left">Reported Category</div>,
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue('report_category')}</div>
      ),
    },
    {
      accessorKey: 'ticket_status',
      header: 'Status',
      cell: ({ row }) => (
        <>
          {console.log(row.original.ticket_status_id)}
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
      id: 'actions',
      enableHiding: false,
      cell: () => {
        // const Report = row.original;

        return (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <DotsHorizontalIcon className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                {/* <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(Report.id)}
              >
                Copy Report ID
              </DropdownMenuItem> */}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setDetailsOpen(true)}>
                  View details
                </DropdownMenuItem>
                <DropdownMenuItem>Close Ticket</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Sheet open={detailsOpen} onOpenChange={setDetailsOpen}>
              <TicketDetails
                closeSheet={handleDetailsClose}
                username={'johndoe'}
              />
            </Sheet>
          </>
        );
      },
    },
  ];

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

  const { mutate, isLoading } = useMutation(getUserReports, {
    onSuccess: (response) => {
      data = response.data;
    },
  });

  useEffect(() => {
    onSubmit();
  }, []);

  const onSubmit = () => {
    mutate({});
  };

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
    </>
  );
}
