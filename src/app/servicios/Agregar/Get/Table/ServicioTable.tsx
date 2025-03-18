"use client";

import { useState, useEffect } from 'react';
import { ColumnFiltersState, SortingState, VisibilityState } from "@tanstack/react-table";
import useExportStore from "@/stores/exportToCSV-store";
import useTableStore from '@/stores/table-store';
import PageContainer from '@/components/custom/layout/page-container';
import { useQueryParams } from '@/components/custom/table/useQueryParams';
import ServicioTableContent from './ServicioTableContent';
import { Servicio, getColumnsServicio } from './ServicioTableColumns';
import SkeletonLayout from '@/components/custom/table/skeleton-layout';
import ServicioFilters from './ServicioTableFiltres';
import { getServicio } from './getServicio';

export default function DentistTable() {
  const { searchParams, updateQueryParams } = useQueryParams();
  const { tableActionUsed } = useTableStore();
  const exportToCSV = useExportStore((state) => state.exportToCSV);

  let [data, setData] = useState<Servicio[]>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const [servicio, setServicio] = useState(searchParams.get('servicio') || '');
  const [precio, setPrecio] = useState(searchParams.get('precio') || '');
  const [creacion, setCreacion] = useState(searchParams.get('creacion') || '');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const limit = Number(searchParams.get('limit')) || 10;
  const offset = Number(searchParams.get('offset')) || 0;

  const resetInputs = () => {
    setServicio('');
    setPrecio('');
    setCreacion('');
   

    updateQueryParams({
      servicio: '',
      precio: '',
      creacion: '',
      limit: limit.toString(),
      offset: '0',
    });
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(searchParams);
    setIsLoading(true);
    setError(null);

    getServicio(queryParams)
      .then((data: any) => {
        setData(data);
        setIsLoading(false);
      })
      .catch((error: any) => {
        setError(error.message);
        setIsLoading(false);
      });

  }, [searchParams, tableActionUsed]);

  const columns = getColumnsServicio();

  if (isLoading) {
    return <SkeletonLayout />;
  }

  if (error) {
    data = [];
  }

  return (
    <PageContainer>
      <div className="w-full">
        <ServicioFilters
          servicio={servicio}
          setServicio={setServicio}
          precio={precio}
          setPrecio={setPrecio}
          
          creacion={creacion}
          setCreacion={setCreacion}
          updateQueryParams={updateQueryParams}
        />
        <ServicioTableContent
          data={data}
          columns={columns}
          sorting={sorting}
          setSorting={setSorting}
          columnFilters={columnFilters}
          setColumnFilters={setColumnFilters}
          columnVisibility={columnVisibility}
          setColumnVisibility={setColumnVisibility}
          rowSelection={rowSelection}
          setRowSelection={setRowSelection}
          offset={offset}
          limit={limit}
          updateQueryParams={updateQueryParams}
          resetInputs={resetInputs}
          exportToCSV={() => exportToCSV(data, 'Dentistas')}
        />
      </div>
    </PageContainer>
  );
}