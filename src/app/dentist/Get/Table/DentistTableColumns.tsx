import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from 'lucide-react';
import { useIsMobile } from "@/hooks/use-mobile";
import HeaderTitle from "@/components/custom/table/HeaderColum";
import { getNavigatorLanguage } from "@/app/helpers/getNavigatorLanguage";
import DentistTableActions from "./DentistTableActions";

export type Dentist = {
  dentista_id: number;
  dentista_nombre: string;
  dentista_domicilio: string;
  dentista_telefono: string;
  dentista_cedula: string;
  dentista_creacion: string;
};

export const getColumnsDentist = (): ColumnDef<Dentist>[] => {
  const isMobile = useIsMobile();

  const columns: ColumnDef<Dentist>[] = [
    {
      accessorKey: "dentista_nombre",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <HeaderTitle text="Nombre" />
          <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => <div className="lowercase">{row.getValue("dentista_nombre")}</div>,
    },
    {
      header: () => <HeaderTitle text="Acciones" />,
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => <DentistTableActions dentista={row.original} />,
    },
  ];

  if (!isMobile) {
    columns.push(
      {
        accessorKey: "dentista_telefono",
        header: () => <HeaderTitle text="Teléfono" />,
        cell: ({ row }) => <div>{row.getValue("dentista_telefono")}</div>,
      },
      {
        accessorKey: "dentista_domicilio",
        header: () => <HeaderTitle text="Domicilio" />,
        cell: ({ row }) => <div>{row.getValue("dentista_domicilio")}</div>,
      },
      {
        accessorKey: "dentista_cedula",
        header: () => <HeaderTitle text="Cédula" />,
        cell: ({ row }) => <div>{row.getValue("dentista_cedula")}</div>,
      },
      {
        accessorKey: "dentista_creacion",
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
          const date = new Date(row.getValue("dentista_creacion"));
          const formattedDate = getNavigatorLanguage(date);
          return <div>{formattedDate}</div>;
        },
        sortingFn: 'datetime'
      }
    );
  }

  return columns;
};