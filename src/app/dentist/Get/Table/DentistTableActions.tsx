import * as React from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from 'lucide-react';
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import useTableStore from "@/stores/table-store";
import AlertDialogTable from "@/components/custom/table/AlertDialogTable";
import { deleteDentist } from "./deleteDentist";
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

export default function DentistTableActions({ dentista }: { dentista: any }) {

  const { setTableActionUsed, tableActionUsed } = useTableStore();
  const router = useRouter();

  const [formData, setFormData] = useState({
      nombre: dentista.nombre || '',
      apellido: dentista.apellido || '',
      telefono: dentista.telefono || '',
      domicilio: dentista.domicilio || ''
    });
    const [open, setOpen] = useState(false);
  

  const handleDelete = async () => {
    try {
      await deleteDentist(dentista.dentista_id);
      toast.success('Dentista eliminado correctamente');
      setTableActionUsed(!tableActionUsed);
    } catch (error: any) {
      toast.error('Error: No tienes acceso para eliminar');
    }
  };

  const handleModify = () => {
    // Save the dentist ID to the store or session storage
    sessionStorage.setItem('dentista_id', dentista.dentista_id);
    router.push(`/dentist/modify/${dentista.dentista_id}`);
  };

  const handleUpdate = async () => {
      try {
        // Aquí deberías implementar la función para actualizar el dentista
        // await updateDentist(dentista.dentista_id, formData);
        toast.success('Dentista actualizado correctamente');
        setTableActionUsed(!tableActionUsed);
        setOpen(false);
      } catch (error) {
        toast.error('Error al actualizar el dentista');
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
        <DropdownMenuLabel>{'Acciones'}</DropdownMenuLabel>


        <DropdownMenuSeparator />

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              Actualizar
            </DropdownMenuItem>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Actualizar Dentista</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="nombre" className="text-right">
                  Nombre
                </Label>
                <Input
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="apellido" className="text-right">
                  Apellido
                </Label>
                <Input
                  id="apellido"
                  name="apellido"
                  value={formData.apellido}
                  onChange={handleChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="telefono" className="text-right">
                  Teléfono
                </Label>
                <Input
                  id="telefono"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="domicilio" className="text-right">
                  Domicilio
                </Label>
                <Input
                  id="domicilio"
                  name="domicilio"
                  value={formData.domicilio}
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

        <AlertDialogTable
          alertAction={handleDelete}
          title={'Eliminar Dentista'}
          description={'¿Estás seguro de que deseas eliminar a este dentista?'}
          cancel={'Cancelar'}
          continueText={'Continuar'}
          textAction={'Eliminar'}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}