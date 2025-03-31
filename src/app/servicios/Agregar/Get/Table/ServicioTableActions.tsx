import * as React from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from 'lucide-react';
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import useTableStore from "@/stores/table-store";
import AlertDialogTable from "@/components/custom/table/AlertDialogTable";
import { deleteServicio } from "./deleteServicios";
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

export default function ServiciosTableActions({ servicio }: { servicio: any }) {
  const { setTableActionUsed, tableActionUsed } = useTableStore();
  const router = useRouter();
  const [formData, setFormData] = useState({
    nombre: servicio.nombre || '',
    precio: servicio.precio || 0
  });
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteServicio(servicio.servicio_id);
      toast.success('Servicio eliminado correctamente');
      setTableActionUsed(!tableActionUsed);
    } catch (error: any) {
      toast.error('Error: No tienes acceso para eliminar');
    }
  };

  const handleUpdate = async () => {
    try {
      // Aquí deberías implementar la función para actualizar el servicio
      // await updateServicio(servicio.servicio_id, formData);
      toast.success('Servicio actualizado correctamente');
      setTableActionUsed(!tableActionUsed);
      setOpen(false);
    } catch (error) {
      toast.error('Error al actualizar el servicio');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'precio' ? parseFloat(value) || 0 : value
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

        {/* Diálogo para actualizar servicio */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              Actualizar
            </DropdownMenuItem>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Actualizar Servicio</DialogTitle>
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
                <Label htmlFor="precio" className="text-right">
                  Precio
                </Label>
                <Input
                  id="precio"
                  name="precio"
                  type="number"
                  value={formData.precio}
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
          title={'Eliminar Servicio'}
          description={'¿Estás seguro de que deseas eliminar este servicio?'}
          cancel={'Cancelar'}
          continueText={'Continuar'}
          textAction={'Eliminar'}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}