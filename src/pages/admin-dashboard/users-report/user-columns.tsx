'use client';

import { ColumnDef } from '@tanstack/react-table';

import { Badge } from '@/components/ui/badge';

import { Button } from '@/components/ui/button';
import { CaretSortIcon } from '@radix-ui/react-icons';
import { TableAction } from '../components/data-table-action';

export type Report = {
  report_id: number;
  username: string;
  user_report_category: string;
  report_category: string;
  ticket_status_id: number;
  report_information: string;
  reporter_email: string;
  user_id: number;
};

export const userColumns: ColumnDef<Report>[] = [
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
    cell: ({ row }) => <div>{row.getValue('report_id')}</div>,
  },
  {
    accessorKey: 'username',
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
      <div className="lowercase">@{row.getValue('username')}</div>
    ),
  },
  {
    accessorKey: 'user_report_category',
    header: () => <div className="text-left">Reported Category</div>,
    cell: ({ row }) => {
      return (
        <div className="Uppercase">{row.getValue('user_report_category')}</div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'ticket_status',
    header: () => <div className="text-left">Status</div>,
    cell: ({ row }) => {
      return (
        <>
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
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
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
    header: 'Action',
    enableHiding: false,
    cell: ({ row }) => {
      // const Report = row.original;

      return (
        <>
          <TableAction info={row.original} />
        </>
      );
    },
  },
];
