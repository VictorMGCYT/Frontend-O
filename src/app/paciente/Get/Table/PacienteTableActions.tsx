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

export default function PacienteTableActions({ paciente }: { paciente: any }) {
  const { setTableActionUsed, tableActionUsed } = useTableStore();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    paciente_nombres: paciente.paciente_nombres || "",
    paciente_apellidos: paciente.paciente_apellidos || "",
    paciente_telefono: paciente.paciente_telefono || "",
    paciente_domicilio: paciente.paciente_domicilio || ""
  });
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deletePaciente(paciente.paciente_id);
      toast.success('Paciente eliminado correctamente');
      setTableActionUsed(!tableActionUsed);
    } catch (error: any) {
      console.error('Error eliminando paciente:', error);
      toast.error(error?.message || 'Error: No tienes acceso para eliminar');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleModify = () => {
    sessionStorage.setItem('paciente_id', paciente.paciente_id);
    router.push(`/paciente/modify/${paciente.paciente_id}`);
  };

  const handleUpdate = async () => {
    try {
      await updatePaciente(paciente.paciente_id, formData);
      toast.success('Paciente actualizado correctamente');
      setTableActionUsed(!tableActionUsed);
      setOpen(false);
    } catch (error: any) {
      console.error('Error actualizando paciente:', error);
      toast.error(error?.message || 'Error al actualizar el paciente');
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
          <MoreHorizontal className="h-4 w-4" />
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
                  type="tel"
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
              <Button variant="red" onClick={() => setOpen(false)}>
                Cancelar
              </Button>
              <Button variant="blue" onClick={handleUpdate}>Guardar cambios</Button>
            </div>
          </DialogContent>
        </Dialog>

        <DropdownMenuSeparator />

        <AlertDialogTable
          alertAction={handleDelete}
          title={'Eliminar Paciente'}
          description={'¿Estás seguro de que deseas eliminar a este paciente?'}
          cancel={'Cancelar'}
          continueText={isDeleting ? 'Eliminando...' : 'Continuar'}
          textAction={isDeleting ? 'Eliminando...' : 'Eliminar'}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}