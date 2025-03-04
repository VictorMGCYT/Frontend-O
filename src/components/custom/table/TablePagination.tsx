import * as React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface TablePaginationProps {
  offset: number;
  limit: number;
  dataLength: number;
updateQueryParams: (updates: Record<string, string>) => void;
  resetInputs: () => void;
  exportToCSV: () => void; 
}

export default function TablePagination({ offset, limit, dataLength, updateQueryParams, resetInputs, exportToCSV }: TablePaginationProps) {


  return (
    <div>

      <div className="flex-1 text-sm text-muted-foreground my-4">
        <Label>{dataLength} filas.</Label>
      </div>

      <div className="flex justify-end">

        <div className="space-x-2">
          <Button
            className="md:w-24 md:h-10"
            variant="outline"
            size="sm"
            onClick={() => updateQueryParams({ offset: String(Math.max(offset - limit, 0)) })}
            disabled={offset === 0}
          >
            Previo
          </Button>
          <Button
            className="md:w-24 md:h-10"
            variant="outline"
            size="sm"
            onClick={() => updateQueryParams({ offset: String(offset + limit) })}
            disabled={dataLength < limit}
          >
            Siguiente
            </Button>
          <Button
            className="md:w-24 md:h-10"
            variant="outline"
            size="sm"
            onClick={() => {
              updateQueryParams({ offset: '0', limit: '10', name: '', createdAt: '', is_active: '' });
              resetInputs();
            }}
          >
            Quitar filtros
            </Button>
          <Button
            className="md:w-24 md:h-10"
            variant="outline"
            size="sm"
            onClick={exportToCSV} 
          >
            Exportar a exel
            </Button>
        </div>
      </div>

    </div>
  );
}