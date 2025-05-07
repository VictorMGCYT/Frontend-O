import * as React from "react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from 'lucide-react';
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import useTableStore from "@/stores/table-store";
import AlertDialogTable from "@/components/custom/table/AlertDialogTable";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { deleteDentist } from "./deletePaciente";

export default function DentistTableActions({ dentista }: { dentista: any }) {

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ nombres: "", apellidos: "", telefono: "", domicilio: "" });

  const url: string | undefined = process.env.NEXT_PUBLIC_API;

  const token = sessionStorage.getItem('token');
  const [pacienteData, setPacienteData] = useState({
    paciente_nombres: "",
    paciente_apellidos: "",
    paciente_telefono: "",
    paciente_domicilio: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setPacienteData({
        ...pacienteData,
        [e.target.name]: e.target.value,
      });
    };

  const { setTableActionUsed, tableActionUsed } = useTableStore();
  const router = useRouter();

  const handleDelete = async () => {
    try {
      await deleteDentist(dentista.dentista_id);
      toast.success('Paciente deliminado corrrectamente');
      setTableActionUsed(!tableActionUsed);
    } catch (error: any) {
      toast.error('Error:No tienens acceso para eliminar');
    }
  };

  const handleActualizar = async () => {

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
          title={'Eliminar Dentista'}
          description={'¿Estás seguro de que deseas eliminar a este dentista?'}
          cancel={'Cancelar'}
          continueText={'Continuar'}
          textAction={'Eliminar'}
        />

        <AlertDialogTable
          alertAction={handleDelete}
          title={'Actualizar Paciente'}
          description={'¿Estás seguro de que deseas eliminar a este dentista?'}
          cancel={'Cancelar'}
          continueText={'Continuar'}
          textAction={'Actualizar'}
        />

        <Button variant="ghost" className="h-8 w-8 p-0" onClick={() => setOpen(true)}> Hola 2</Button>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Editar Paciente</DialogTitle>
            </DialogHeader>
            <Label>Nombres</Label>
            <Input
              type="text" placeholder="Nombre"
              id="paciente_nombres"
              name="paciente_nombres"
              value={pacienteData.paciente_nombres}
              onChange={handleChange}
              className="w-full"
            />

            <Label>Apellidos</Label>
            <Input
              type="text" placeholder="Apellido"
              id="paciente_apellidos"
              name="paciente_apellidos"
              value={pacienteData.paciente_apellidos}
              onChange={handleChange}
              className="w-full"
            />

            <Label>Telefono</Label>
            <Input
              type="text" placeholder="Telefono"
              id="paciente_telefono"
              name="paciente_telefono"
              value={pacienteData.paciente_telefono}
              onChange={handleChange}
              className="w-full"
            />

            <Label>Direccion</Label>
            <Input
              type="text" placeholder="Direccion"
              id="paciente_domicilio"
              name="paciente_domicilio"
              value={pacienteData.paciente_domicilio}
              onChange={handleChange}
              className="w-full"
            />
            <div className="flex justify-end gap-2 mt-4">
              <Button onClick={() => setOpen(false)}>Cancelar</Button>
              <Button onClick={handleActualizar}>Guardar</Button>
            </div>
          </DialogContent>
        </Dialog>

      </DropdownMenuContent>
    </DropdownMenu>
  );
}