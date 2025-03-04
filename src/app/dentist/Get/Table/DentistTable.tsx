"use client";

import { useState, useEffect } from 'react';
import { ColumnFiltersState, SortingState, VisibilityState } from "@tanstack/react-table";
import useExportStore from "@/stores/exportToCSV-store";
import useTableStore from '@/stores/table-store';
import PageContainer from '@/components/custom/layout/page-container';
import { useQueryParams } from '@/components/custom/table/useQueryParams';
import DentistTableContent from './DentistTableContent';
import { Dentist, getColumnsDentist } from './DentistTableColumns';
import SkeletonLayout from '@/components/custom/table/skeleton-layout';
import DentistFilters from './DentistTableFilters';
import { getDentists } from './getDentists';

export default function DentistTable() {
  const { searchParams, updateQueryParams } = useQueryParams();
  const { tableActionUsed } = useTableStore();
  const exportToCSV = useExportStore((state) => state.exportToCSV);

  let [data, setData] = useState<Dentist[]>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const [dentista, setDentista] = useState(searchParams.get('dentista') || '');
  const [telefono, setTelefono] = useState(searchParams.get('telefono') || '');
  const [domicilio, setDomicilio] = useState(searchParams.get('domicilio') || '');
  const [cedula, setCedula] = useState(searchParams.get('cedula') || '');
  const [creacion, setCreacion] = useState(searchParams.get('creacion') || '');

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const limit = Number(searchParams.get('limit')) || 10;
  const offset = Number(searchParams.get('offset')) || 0;

  const resetInputs = () => {
    setDentista('');
    setTelefono('');
    setDomicilio('');
    setCedula('');
    setCreacion('');

    updateQueryParams({
      dentista: '',
      telefono: '',
      domicilio: '',
      cedula: '',
      creacion: '',
      limit: limit.toString(),
      offset: '0',
    });
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(searchParams);
    setIsLoading(true);
    setError(null);

    getDentists(queryParams)
      .then((data: any) => {
        setData(data);
        setIsLoading(false);
      })
      .catch((error: any) => {
        setError(error.message);
        setIsLoading(false);
      });

    console.log(data);
  }, [searchParams, tableActionUsed]);

  const columns = getColumnsDentist();

  if (isLoading) {
    return <SkeletonLayout />;
  }

  if (error) {
    data = [];
  }

  return (
    <PageContainer>
      <div className="w-full">
        <DentistFilters
          dentista={dentista}
          setDentista={setDentista}
          telefono={telefono}
          setTelefono={setTelefono}
          domicilio={domicilio}
          setDomicilio={setDomicilio}
          cedula={cedula}
          setCedula={setCedula}
          creacion={creacion}
          setCreacion={setCreacion}
          updateQueryParams={updateQueryParams}
        />
        <DentistTableContent
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