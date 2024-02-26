'use client';

import { ColumnDef } from '@tanstack/react-table';

import { Badge } from '@/components/ui/badge';

import { Button } from '@/components/ui/button';
import { CaretSortIcon } from '@radix-ui/react-icons';
import { TableAction } from '../components/data-table-action';

export type Report = {
  appeal_id: number;
  ticket_status_id: number;
  ticket_status: string;
  user_id: number;
  username: string;
  ban_id: number;
  ban_reason: string;
  ban_reason_detail: string;
  appeal_information: string;
};

export const appealColumns: ColumnDef<Report>[] = [
  {
    id: 'select',
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'appeal_id',
    header: () => <div className="text-left">Appeal ID</div>,
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue('appeal_id')}</div>
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
          Username
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>@{row.getValue('username')}</div>,
  },
  {
    accessorKey: 'ban_reason',
    header: () => <div className="text-left">Banned Reason</div>,
    cell: ({ row }) => (
      <div className="uowercase">{row.getValue('ban_reason')}</div>
    ),
  },
  {
    accessorKey: 'ticket_status',
    header: 'Status',
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
  {
    id: 'actions',
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
