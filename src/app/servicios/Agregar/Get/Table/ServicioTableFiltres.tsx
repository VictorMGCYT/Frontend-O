import React, { useState } from "react";
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
  const [formData, setFormData] = useState({ name: "", precio: "" });

  const url: string | undefined = process.env.NEXT_PUBLIC_API;

    const token = sessionStorage.getItem('token');
    const [pacienteData, setPacienteData] = useState({
      servicio_nombre: "",
      servicio_precio: 0.0
    });


    const handleChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
      setPacienteData({
          ...pacienteData,
          [e.target.name]: e.target.value,
      });
      console.log(pacienteData)
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {

    fetch(`${url}/servicios/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(pacienteData),
    })
      .then((response) => {
        if (!response.ok) {

          throw new Error("Error al agregar servicio");
        }
        console.log(response.json())
        return response.json();
      })
      .then((data) => {
        Swal.fire({
          icon: "success",
          title: "servicio agregado",
          text: "El servicio ha sido registrado correctamente",
          timer: 3000,
        });
        //router.push("/servicios");
      })
      .catch((error) => {
        console.log(error)
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
        <Button onClick={() => setOpen(true)}>Agregar Paciente</Button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Agregar Nuevo Paciente</DialogTitle>
          </DialogHeader>
          <Input
            type="text"
            name="name"
            placeholder="Nombre"
            value={formData.name}
            onChange={handleChange}
          />
          <Input
            type="number"
            name="precio"
            placeholder="0.0"
            value={formData.precio}
            onChange={handleChange}
          />
          <div className="flex justify-end gap-2 mt-4">
            <Button onClick={() => setOpen(false)}>Cancelar</Button>
            <Button onClick={handleSave}>Guardar</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
