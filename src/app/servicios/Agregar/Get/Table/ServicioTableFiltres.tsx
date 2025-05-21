import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FilterInput } from "@/components/custom/table/FilterInput";
import Swal from "sweetalert2";

interface DentistTableFiltersProps {
  servicio: string;
  setServicio: React.Dispatch<React.SetStateAction<string>>;
  precio: string;
  setPrecio: React.Dispatch<React.SetStateAction<string>>;
  creacion: string;
  setCreacion: React.Dispatch<React.SetStateAction<string>>;
  updateQueryParams: (updates: Record<string, string>) => void;
}

export default function DentistFilters({
  servicio,
  setServicio,
  precio,
  setPrecio,
  creacion,
  setCreacion,
  updateQueryParams,
}: DentistTableFiltersProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    servicio_nombre: "",
    servicio_precio: ""
  });

 

  const url: string | undefined = process.env.NEXT_PUBLIC_API;
  const token = sessionStorage.getItem("token");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    const dataToSend = {
      servicio_nombre: formData.servicio_nombre,
      servicio_precio: parseFloat(formData.servicio_precio) || 0,
    };

    fetch(`${url}/servicios/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(dataToSend),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((errorData) => {
            throw new Error(errorData.message || "Error al agregar servicio");
          });
        }
        return response.json();
      })
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Servicio agregado",
          text: "El servicio ha sido registrado correctamente",
          timer: 3000,
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.message,
        });
      });

    setOpen(false);
  };

  return (
    <div className="flex items-center py-4">
      <div className="flex justify-center gap-12 flex-wrap w-full">
        <FilterInput
          placeholder="Servicio"
          value={servicio}
          onChange={(event) => setServicio(event.target.value)}
          onEnter={() => updateQueryParams({ servicio, offset: "0" })}
          className="w-30"
        />
        <FilterInput
          placeholder="Precio"
          value={precio}
          onChange={(event) => setPrecio(event.target.value)}
          onEnter={() => updateQueryParams({ precio, offset: "0" })}
          className="w-30"
        />
        <FilterInput
          placeholder="Creación"
          value={creacion}
          onChange={(event) => setCreacion(event.target.value)}
          onEnter={() => updateQueryParams({ creacion, offset: "0" })}
          className="w-30"
        />
        <Button variant="blue" onClick={() => setOpen(true)}>Agregar Servicio</Button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Agregar Nuevo Servicio</DialogTitle>
          </DialogHeader>
          <Input
            type="text"
            name="servicio_nombre"
            placeholder="Nombre del servicio"
            value={formData.servicio_nombre}
            onChange={handleChange}
          />
          <Input
            type="number"
            name="servicio_precio"
            placeholder="Precio"
            value={formData.servicio_precio}
            onChange={handleChange}
          />
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="red" onClick={() => setOpen(false)}>Cancelar</Button>
            <Button variant="blue" onClick={handleSave}>Guardar</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
