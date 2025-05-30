'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";

export default function Paciente() {

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
        <>
            <div className="w-screen flex flex-col items-center justify-center h-screen bg-gray-100">
                <div className="w-[300px] lg:w-[400px] border border-gray-300 p-[30px] rounded-md shadow-[10px_10px_30px_rgba(0,0,0,0.6)]">
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
        </>
    )
}