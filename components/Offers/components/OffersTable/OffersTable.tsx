'use client';

import { Table } from '@components/Table';

import React from 'react';
import { OfferSorting, OfferColumns, OfferTrade } from '@components/Offers/types';
import { RowSelectionState, SortingState, getCoreRowModel, useReactTable } from '@tanstack/react-table';

import { columns } from './config';
import { OffersTableEmptyState } from './components/OffersTableEmptyState';

type OffersTableProps = {
  offers?: OfferTrade[];
  subtitle?: string;
  showHeader?: boolean;
  showEmptyState?: boolean;
  columnsToDisplay: OfferColumns[];
  isLoading?: boolean;
  sorting: OfferSorting | null;
  onSortingChange: (sorting: OfferSorting | null) => void;
  onRowSelectionChange: (selectedRowId: string | null) => void;
};

const defaultOffers: OfferTrade[] = [];

const OffersTable: React.FC<OffersTableProps> = ({
  offers = defaultOffers,
  isLoading,
  sorting,
  showHeader,
  subtitle,
  showEmptyState,
  columnsToDisplay,
  onSortingChange,
  onRowSelectionChange,
}) => {
  const [sortingState, setSortingState] = React.useState<SortingState>([]);
  const [rowSelectionState, setRowSelectionState] = React.useState<RowSelectionState>({});
  const filteredColumns = React.useMemo(
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
    getCoreRowModel: getCoreRowModel(),
    enableColumnResizing: false,
    enableMultiRowSelection: false,
    enableRowSelection: true,
    enableSorting: true,
    onSortingChange: setSortingState,
    onRowSelectionChange: setRowSelectionState,
  });
  React.useEffect(() => {
    if (sortingState.length === 0 && sorting !== null) {
      onSortingChange(null);
    } else if (sortingState.length !== 0) {
      const newSorting = {
        field: sortingState[0].id as OfferColumns,
        order: sortingState[0].desc ? 'desc' : 'asc',
      } as const;
      onSortingChange(newSorting);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortingState, onSortingChange]);
  React.useEffect(() => {
    const selectedRowId = Object.entries(rowSelectionState).find(([, selected]) => selected)?.[0];
    if (!selectedRowId) {
      onRowSelectionChange(null);
    } else {
      const selectedRow = offersTable.getSelectedRowModel().rowsById[selectedRowId];
      const selectedId = selectedRow.original.id;
      onRowSelectionChange(selectedId);
    }
  }, [rowSelectionState, offersTable, onRowSelectionChange]);
  React.useEffect(() => {
    setRowSelectionState({});
  }, [offers]);
  if (!isLoading && offers.length === 0 && !showEmptyState) {
    return null;
  }
  return (
    <Table
      showHeader={showHeader}
      subtitle={subtitle}
      table={offersTable}
      isLoading={isLoading}
      emptyState={showEmptyState && <OffersTableEmptyState />}
    />
  );
};

export { OffersTable };
