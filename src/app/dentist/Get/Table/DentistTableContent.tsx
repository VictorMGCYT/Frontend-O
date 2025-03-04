import * as React from "react";
import { Table } from "@/components/ui/table";
import TableHeader from "../../../../components/custom/table/TableHeader";
import TableRows from "../../../../components/custom/table/TableRows";
import TablePagination from "../../../../components/custom/table/TablePagination";
import { useReactTable, ColumnFiltersState, SortingState, VisibilityState, getCoreRowModel, getPaginationRowModel, getSortedRowModel, getFilteredRowModel } from "@tanstack/react-table";

interface PetTableContentProps {
  data: any[];
  columns: any;
  sorting: SortingState;
  setSorting: React.Dispatch<React.SetStateAction<SortingState>>;
  columnFilters: ColumnFiltersState;
  setColumnFilters: React.Dispatch<React.SetStateAction<ColumnFiltersState>>;
  columnVisibility: VisibilityState;
  setColumnVisibility: React.Dispatch<React.SetStateAction<VisibilityState>>;
  rowSelection: any;
  setRowSelection: React.Dispatch<React.SetStateAction<any>>;
  offset: number;
  limit: number;
  updateQueryParams: (updates: Record<string, string>) => void;
  resetInputs: () => void;
  exportToCSV: () => void;
}

const DentistTableContent: React.FC<PetTableContentProps> = ({
  data,
  columns,
  sorting,
  setSorting,
  columnFilters,
  setColumnFilters,
  columnVisibility,
  setColumnVisibility,
  rowSelection,
  setRowSelection,
  offset,
  limit,
  updateQueryParams,
  resetInputs,
  exportToCSV,
}) => {
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

  return (
    <>
      <div className="rounded-md border border-gray-300">
        
        <Table>
          <TableHeader headerGroups={table.getHeaderGroups()} />
          <TableRows rows={table.getRowModel().rows} columnsLength={columns.length} />
        </Table>

      </div>
      
      <TablePagination
        offset={offset}
        limit={limit}
        dataLength={data.length}
        updateQueryParams={updateQueryParams}
        resetInputs={resetInputs}
        exportToCSV={exportToCSV}
      />
    </>
  );
};

export default DentistTableContent;