'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";

export default function Eliminar() {
    const router = useRouter();
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

    const handleSubmit = () => {
        fetch(`${url}/paciente/Delete`, {
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
                return response.json();
            })
            .then((data) => {
                Swal.fire({
                    icon: "success",
                    title: "Paciente agregado",
                    text: "El paciente ha sido registrado correctamente",
                    timer: 3000,
                });
                router.push("/paciente");
            })
            .catch((error) => {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: error.message,
                });
            });
    };

    return (
        <div className="flex justify-center items-center min-h-screen white w-screen">
            <div className="w-full p-8 bg-gray-100 shadow-md rounded-lg">
                <h1 className="text-2xl font-bold text-center mb-6">Agregar Paciente</h1>
                <div className="space-y-5">
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

                    <div className="flex justify-center">
                        <Button onClick={handleSubmit} className="w-1/3">Agregar Paciente</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}