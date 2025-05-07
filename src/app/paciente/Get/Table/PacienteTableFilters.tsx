import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FilterInput } from "@/components/custom/table/FilterInput";
import Swal from "sweetalert2";
import { Label } from "@/components/ui/label";

interface DentistTableFiltersProps {
  paciente: string;
  setPaciente: React.Dispatch<React.SetStateAction<string>>;
  apellidos: string;
  setApellidos: React.Dispatch<React.SetStateAction<string>>;
  telefono: string;
  setTelefono: React.Dispatch<React.SetStateAction<string>>;
  domicilio: string;
  setDomicilio: React.Dispatch<React.SetStateAction<string>>;
  creacion: string;
  setCreacion: React.Dispatch<React.SetStateAction<string>>;
  updateQueryParams: (updates: Record<string, string>) => void;
}

export default function DentistFilters({
  paciente,
  setPaciente,
  apellidos,
  setApellidos,
  telefono,
  setTelefono,
  domicilio,
  setDomicilio,
  creacion,
  setCreacion,
  updateQueryParams,
}: DentistTableFiltersProps) {

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

  const handleSave = () => {

    fetch(`${url}/paciente/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`

      },
      body: JSON.stringify(pacienteData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al agregar paciente");
        }
        console.log(response.json())
        return response.json();
      })
      .then((data) => {
        Swal.fire({
          icon: "success",
          title: "Paciente agregado",
          text: "El paciente ha sido registrado correctamente",
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
          placeholder="Nombres"
          value={paciente}
          onChange={(event) => setPaciente(event.target.value)}
          onEnter={() => updateQueryParams({ paciente, offset: "0" })}
          className="w-30"
        />
        <FilterInput
          placeholder="Apellidos"
          value={apellidos}
          onChange={(event) => setApellidos(event.target.value)}
          onEnter={() => updateQueryParams({ apellidos, offset: "0" })}
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
            <Button onClick={handleSave}>Guardar</Button>
          </div>
        </DialogContent>
      </Dialog>


    </div>
  );
};