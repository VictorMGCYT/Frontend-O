import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FilterInput } from "@/components/custom/table/FilterInput";
import Swal from "sweetalert2";
import { Label } from "@/components/ui/label";

interface DentistTableFiltersProps {
  dentista: string;
  setDentista: React.Dispatch<React.SetStateAction<string>>;
  telefono: string;
  setTelefono: React.Dispatch<React.SetStateAction<string>>;
  domicilio: string;
  setDomicilio: React.Dispatch<React.SetStateAction<string>>;
  cedula: string;
  setCedula: React.Dispatch<React.SetStateAction<string>>;
  creacion: string;
  setCreacion: React.Dispatch<React.SetStateAction<string>>;
  updateQueryParams: (updates: Record<string, string>) => void;
}

export default function DentistFilters({
  dentista,
  setDentista,
  telefono,
  setTelefono,
  domicilio,
  setDomicilio,
  cedula,
  setCedula,
  creacion,
  setCreacion,
  updateQueryParams,
}: DentistTableFiltersProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const url: string | undefined = process.env.NEXT_PUBLIC_API;
  const token = sessionStorage.getItem('token');

  const [dentistaData, setDentistaData] = useState({
    dentista_nombres: "",
    dentista_apellidos: "",
    dentista_telefono: "",
    dentista_domicilio: "",
    dentista_cedula: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDentistaData({
      ...dentistaData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    // Validación básica
    if (!dentistaData.dentista_nombres || !dentistaData.dentista_apellidos) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Nombre y apellidos son requeridos",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${url}/dentista/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(dentistaData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al agregar Dentista");
      }

      const data = await response.json();
      
      Swal.fire({
        icon: "success",
        title: "Dentista agregado",
        text: "El Dentista ha sido registrado correctamente",
        timer: 3000,
      });

      // Limpiar el formulario
      setDentistaData({
        dentista_nombres: "",
        dentista_apellidos: "",
        dentista_telefono: "",
        dentista_domicilio: "",
        dentista_cedula: "",
      });

      // Cerrar el diálogo
      setOpen(false);
      
      // Opcional: recargar la lista de dentistas o actualizar el estado
      // Podrías agregar una función de callback para esto

    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error instanceof Error ? error.message : "Error desconocido al agregar dentista",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center py-4">
      <div className="flex justify-center gap-12 flex-wrap w-full">
        <FilterInput
          placeholder="Dentista"
          value={dentista}
          onChange={(event) => setDentista(event.target.value)}
          onEnter={() => updateQueryParams({ dentista, offset: "0" })}
          className="w-30"
        />
        <FilterInput
          placeholder="Teléfono"
          value={telefono}
          onChange={(event) => setTelefono(event.target.value)}
          onEnter={() => updateQueryParams({ telefono, offset: "0" })}
          className="w-30"
        />
        <FilterInput
          placeholder="Domicilio"
          value={domicilio}
          onChange={(event) => setDomicilio(event.target.value)}
          onEnter={() => updateQueryParams({ domicilio, offset: "0" })}
          className="w-30"
        />
        <FilterInput
          placeholder="Cédula"
          value={cedula}
          onChange={(event) => setCedula(event.target.value)}
          onEnter={() => updateQueryParams({ cedula, offset: "0" })}
          className="w-30"
        />
        <FilterInput
          placeholder="Creación"
          value={creacion}
          onChange={(event) => setCreacion(event.target.value)}
          onEnter={() => updateQueryParams({ creacion, offset: "0" })}
          className="w-30"
        />

        <Button variant={"blue"} onClick={() => setOpen(true)}>Agregar Dentista</Button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Agregar Nuevo Dentista</DialogTitle>
          </DialogHeader>
          <Label>Nombres</Label>
          <Input
            type="text" 
            placeholder="Nombre"
            id="dentista_nombres"
            name="dentista_nombres"
            value={dentistaData.dentista_nombres}
            onChange={handleChange}
            className="w-full"
            required
          />

          <Label>Apellidos</Label>
          <Input
            type="text" 
            placeholder="Apellido"
            id="dentista_apellidos"
            name="dentista_apellidos"
            value={dentistaData.dentista_apellidos}
            onChange={handleChange}
            className="w-full"
            required
          />

          <Label>Telefono</Label>
          <Input
            type="text" 
            placeholder="Telefono"
            id="dentista_telefono"
            name="dentista_telefono"
            value={dentistaData.dentista_telefono}
            onChange={handleChange}
            className="w-full"
          />

          <Label>Direccion</Label>
          <Input
            type="text" 
            placeholder="Direccion"
            id="dentista_domicilio"
            name="dentista_domicilio"
            value={dentistaData.dentista_domicilio}
            onChange={handleChange}
            className="w-full"
          />

          <Label>Cedula</Label>
          <Input
            type="text" 
            placeholder="Cedula"
            id="dentista_cedula"
            name="dentista_cedula"
            value={dentistaData.dentista_cedula}
            onChange={handleChange}
            className="w-full"
          />

          <div className="flex justify-end gap-2 mt-4">
            <Button 
              onClick={() => setOpen(false)}
              variant="red"
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button 
            variant="blue"
              onClick={handleSave}
              disabled={isLoading}
            >
              {isLoading ? "Guardando..." : "Guardar"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}