'use client';

import type { RowSelectionState, SortingState } from '@tanstack/react-table';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import type { FC } from 'react';
import { useEffect, useMemo, useState } from 'react';

import type { OfferSorting, OfferColumns, OfferTrade } from '@berezka-dao/features/displayOffers/types';
import { Table } from '@berezka-dao/shared/ui-kit/Table';

import { columns } from './config';

type OffersTableProps = {
  offers?: OfferTrade[];
  subtitle?: string;
  columnsToDisplay: OfferColumns[];
  isLoading?: boolean;
  sorting: OfferSorting | null;
  onSortingChange: (sorting: OfferSorting | null) => void;
  onRowSelectionChange: (selectedRowId: string | null) => void;
};

const defaultOffers: OfferTrade[] = [];

const OffersTable: FC<OffersTableProps> = ({
  offers = defaultOffers,
  isLoading,
  sorting,
  subtitle,
  columnsToDisplay,
  onSortingChange,
  onRowSelectionChange,
}) => {
  const [sortingState, setSortingState] = useState<SortingState>(
    sorting ? [{ id: sorting.field, desc: sorting.order === 'desc' }] : [],
  );
  const [rowSelectionState, setRowSelectionState] = useState<RowSelectionState>({});
  const filteredColumns = useMemo(
    () => columns.filter((column) => !!column.id && columnsToDisplay.includes(column.id as OfferColumns)),
    [columnsToDisplay],
  );
  const offersTable = useReactTable({
    data: offers,
    columns: filteredColumns,
    state: {
      sorting: sortingState,
      rowSelection: rowSelectionState,
    },
    enableSortingRemoval: false,
    getCoreRowModel: getCoreRowModel(),
    enableColumnResizing: false,
    enableMultiRowSelection: false,
    enableRowSelection: true,
    enableSorting: true,
    onSortingChange: setSortingState,
    onRowSelectionChange: setRowSelectionState,
  });
  useEffect(() => {
    let newSorting: OfferSorting | null = null;
    if (sortingState.length === 0) {
      if (sorting) {
        newSorting = {
          field: sorting.field,
          order: sorting.order === 'asc' ? 'desc' : 'asc',
        };
      } else {
        newSorting = null;
      }
    } else {
      const [{ id, desc }] = sortingState;
      newSorting = { field: id as OfferColumns, order: desc ? 'desc' : 'asc' };
    }
    onSortingChange(newSorting);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortingState, onSortingChange]);
  useEffect(() => {
    const selectedRowId = Object.entries(rowSelectionState).find(([, selected]) => selected)?.[0];
    if (!selectedRowId) {
      onRowSelectionChange(null);
    } else {
      const selectedRow = offersTable.getSelectedRowModel().rowsById[selectedRowId];
      const selectedId = selectedRow.original.id;
      onRowSelectionChange(selectedId);
    }
  }, [rowSelectionState, offersTable, onRowSelectionChange]);
  useEffect(() => {
    setRowSelectionState({});
  }, [offers]);
  if (!isLoading && offers.length === 0) {
    return null;
  }
  return <Table subtitle={subtitle} table={offersTable} isLoading={isLoading} />;
};

export { OffersTable };
