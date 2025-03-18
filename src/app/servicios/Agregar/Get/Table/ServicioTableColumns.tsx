import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from 'lucide-react';
import { useIsMobile } from "@/hooks/use-mobile";
import HeaderTitle from "@/components/custom/table/HeaderColum";
import { getNavigatorLanguage } from "@/app/helpers/getNavigatorLanguage";
import DentistTableActions from "./ServicioTableActions";

export type Servicio = {
  servicio_id: number;
  servicio_nombre: string;
  servicio_precio: 0;
  servicio_creacion: string;
};

export const getColumnsServicio = (): ColumnDef<Servicio>[] => {
  const isMobile = useIsMobile();

  const columns: ColumnDef<Servicio>[] = [
    {
      accessorKey: "servicio_nombre",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <HeaderTitle text="Nombre" />
          <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => <div className="lowercase">{row.getValue("servicio_nombre")}</div>,
    },
    {
      header: () => <HeaderTitle text="Acciones" />,
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => <DentistTableActions servicio={row.original} />,
    },
  ];

  if (!isMobile) {
    columns.push(
      {
        accessorKey: "servicio_precio",
        header: () => <HeaderTitle text="Precio" />,
        cell: ({ row }) => <div>{row.getValue("servicio_precio")}</div>,
      },
    
      {
        accessorKey: "servicio_creacion",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <ArrowUpDown />
            <HeaderTitle text="Creación" />
          </Button>
        ),
        cell: ({ row }) => {
          const date = new Date(row.getValue("servicio_creacion"));
          const formattedDate = getNavigatorLanguage(date);
          return <div>{formattedDate}</div>;
        },
        sortingFn: 'datetime'
      }
    );
  }

  return columns;
};