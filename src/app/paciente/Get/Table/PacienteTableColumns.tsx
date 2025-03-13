import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from 'lucide-react';
import { useIsMobile } from "@/hooks/use-mobile";
import HeaderTitle from "@/components/custom/table/HeaderColum";
import { getNavigatorLanguage } from "@/app/helpers/getNavigatorLanguage";
import DentistTableActions from "./PacienteTableActions";

export type Dentist = {
  paciente_id: number;
  paciente_nombres: string;
  paciente_apellidos: string;
  paciente_telefono: string;
  paciente_domicilio: string;
  paciente_creacion: string;
};

export const getColumnsDentist = (): ColumnDef<Dentist>[] => {
  const isMobile = useIsMobile();

  const columns: ColumnDef<Dentist>[] = [
    {
      header: () => <HeaderTitle text="Acciones" />,
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => <DentistTableActions dentista={row.original} />,
    },
    {
      accessorKey: "paciente_nombres",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <HeaderTitle text="Nombre" />
          <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => <div className="lowercase">{row.getValue("paciente_nombres")}</div>,
    },
    {
      accessorKey: "paciente_apellidos",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <HeaderTitle text="Apellidos" />
          <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => <div className="lowercase">{row.getValue("paciente_apellidos")}</div>,
    },
    
  ];

  if (!isMobile) {
    columns.push(
      {
        accessorKey: "paciente_telefono",
        header: () => <HeaderTitle text="Teléfono" />,
        cell: ({ row }) => <div>{row.getValue("paciente_telefono")}</div>,
      },
      {
        accessorKey: "paciente_domicilio",
        header: () => <HeaderTitle text="Domicilio" />,
        cell: ({ row }) => <div>{row.getValue("paciente_domicilio")}</div>,
      },
      {
        accessorKey: "paciente_creacion",
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
          const date = new Date(row.getValue("paciente_creacion"));
          const formattedDate = getNavigatorLanguage(date);
          return <div>{formattedDate}</div>;
        },
        sortingFn: 'datetime'
      }
    );
  }

  return columns;
};