import * as React from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from 'lucide-react';
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import useTableStore from "@/stores/table-store";
import AlertDialogTable from "@/components/custom/table/AlertDialogTable";
import { deleteServicio } from "./deleteServicios";

export default function ServiciosTableActions({ servicio }: { servicio: any }) {

  const { setTableActionUsed, tableActionUsed } = useTableStore();
  const router = useRouter();

  const handleDelete = async () => {
    try {
      await deleteServicio(servicio.servicio_id);
      toast.success('Servicio deliminado corrrectamente');
      setTableActionUsed(!tableActionUsed);
    } catch (error: any) {
      toast.error('Error:No tienens acceso para eliminar');
    }
  };

  //TODO:Arreglar esto de dentista
  // const handleModify = () => {
  //   saveTableId(pet.pet_id);
  //   router.replace('modify');

  // };

  return (

    <DropdownMenu>
      <DropdownMenuTrigger asChild>

        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal />
        </Button>

      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{'Acciones'}</DropdownMenuLabel>

        {/* <DropdownMenuItem
          onClick={handleModify}
        >
         {'Modificar'}
        </DropdownMenuItem>

        <DropdownMenuSeparator /> */}


        <DropdownMenuSeparator />

        <AlertDialogTable
          alertAction={handleDelete}
          title={'Eliminar Servicio'}
          description={'¿Estás seguro de que deseas eliminar a este Servicio?'}
          cancel={'Cancelar'}
          continueText={'Continuar'}
          textAction={'Eliminar'}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}