'use client';

import { ColumnDef } from '@tanstack/react-table';

import { Badge } from '@/components/ui/badge';

import { Button } from '@/components/ui/button';
import { CaretSortIcon } from '@radix-ui/react-icons';
import { TableAction } from '../components/data-table-action';
import { Check, Clock, X } from 'lucide-react';

export type Report = {
  report_id: number;
  username: string;
  product_report_category: string;
  ticket_status_id: number;
  report_information: string;
  reporter_email: string;
  user_id: number;
  warn_reason: string;
  warn_reason_detail: string;
  report_date: string;
};

export const productColumns: ColumnDef<Report>[] = [
  {
    id: 'select',
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
    cell: ({ row }) => <div>@{row.getValue('username')}</div>,
  },
  {
    accessorKey: 'product_report_category',
    header: () => <div className="text-left">Reported Category</div>,
    cell: ({ row }) => (
      <div className="uowercase">{row.getValue('product_report_category')}</div>
    ),
  },
  {
    accessorKey: 'report_date',
    header: () => <div className="text-left">Report Date</div>,
    cell: ({ row }) => {
      return <div>{row.getValue('report_date')}</div>;
    },
  },
  {
    accessorKey: 'ticket_status',
    header: 'Status',
    cell: ({ row }) => {
      return (
        <>
          {row.original.ticket_status_id === 1 ? (
            <Badge variant={'secondary'}>
              <Clock className="w-4 h-4 mr-1" />
              {row.getValue('ticket_status')}
            </Badge>
          ) : null}
          {row.original.ticket_status_id === 2 ? (
            <Badge variant={'default'}>
              <Check className="w-4 h-4 mr-1" />
              {row.getValue('ticket_status')}
            </Badge>
          ) : null}
          {row.original.ticket_status_id === 3 ? (
            <Badge variant={'destructive'}>
              <X className="w-4 h-4 mr-1" />
              {row.getValue('ticket_status')}
            </Badge>
          ) : null}
        </>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    header: 'Action',
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <>
          <TableAction info={row.original} />
        </>
      );
    },
  },
];
