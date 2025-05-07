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
import { deletePaciente } from "./deletePaciente";
import { updatePaciente } from "./updatePaciente";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function PacienteTableActions({ paciente }: { paciente: any }) {
  const { setTableActionUsed, tableActionUsed } = useTableStore();
  const router = useRouter();
  const [formData, setFormData] = useState({
    paciente_nombres: paciente.paciente_nombres || '',
    paciente_apellidos: paciente.paciente_apellidos || '',
    paciente_telefono: paciente.paciente_telefono || '',
    paciente_domicilio: paciente.paciente_domicilio || ''
  });
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await deletePaciente(paciente.paciente_id);
      toast.success('Paciente eliminado correctamente');
      setTableActionUsed(!tableActionUsed);
    } catch (error: any) {
      toast.error('Error: No tienes acceso para eliminar');
    }
  };

  const handleUpdate = async () => {
    try {
      await updatePaciente(paciente.paciente_id, formData);
      toast.success('Paciente actualizado correctamente');
      setTableActionUsed(!tableActionUsed);
      setOpen(false);
    } catch (error) {
      toast.error('Error al actualizar el paciente');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {/* Diálogo para actualizar paciente */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              Actualizar
            </DropdownMenuItem>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Actualizar Paciente</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="paciente_nombres" className="text-right">
                  Nombres
                </Label>
                <Input
                  id="paciente_nombres"
                  name="paciente_nombres"
                  value={formData.paciente_nombres}
                  onChange={handleChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="paciente_apellidos" className="text-right">
                  Apellidos
                </Label>
                <Input
                  id="paciente_apellidos"
                  name="paciente_apellidos"
                  value={formData.paciente_apellidos}
                  onChange={handleChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="paciente_telefono" className="text-right">
                  Teléfono
                </Label>
                <Input
                  id="paciente_telefono"
                  name="paciente_telefono"
                  value={formData.paciente_telefono}
                  onChange={handleChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="paciente_domicilio" className="text-right">
                  Domicilio
                </Label>
                <Input
                  id="paciente_domicilio"
                  name="paciente_domicilio"
                  value={formData.paciente_domicilio}
                  onChange={handleChange}
                  className="col-span-3"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleUpdate}>Guardar cambios</Button>
            </div>
          </DialogContent>
        </Dialog>

        <DropdownMenuSeparator />

        <AlertDialogTable
          alertAction={handleDelete}
          title={'Eliminar Paciente'}
          description={'¿Estás seguro de que deseas eliminar a este paciente?'}
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