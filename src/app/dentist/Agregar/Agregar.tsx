"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";

export default function Agregar() {
    const router = useRouter();
    const url: string | undefined = process.env.NEXT_PUBLIC_API;

    const token = sessionStorage.getItem('token');
    const [dentistData, setDentistData] = useState({
        dentista_nombres: "",
        dentista_apellidos: "",
        dentista_telefono: "",
        dentista_domicilio: "",
        dentista_cedula: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDentistData({
            ...dentistData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = () => {
        fetch(`${url}/dentista/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`

            },
            body: JSON.stringify(dentistData),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error al agregar dentista");
                }
                return response.json();
            })
            .then((data) => {
                Swal.fire({
                    icon: "success",
                    title: "Dentista agregado",
                    text: "El dentista ha sido registrado correctamente",
                    timer: 3000,
                });
                router.push("/Home");
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
                <h1 className="text-2xl font-bold text-center mb-6">Agregar Nuevo Dentista</h1>
                
                <div className="space-y-5">
                    <div>
                        <Label htmlFor="dentista_nombres">Nombres:</Label>
                        <Input
                            type="text"
                            id="dentista_nombres"
                            name="dentista_nombres"
                            value={dentistData.dentista_nombres}
                            onChange={handleChange}
                            className="w-full"
                        />
                    </div>
                    <div>
                        <Label htmlFor="dentista_apellidos">Apellidos:</Label>
                        <Input
                            type="text"
                            id="dentista_apellidos"
                            name="dentista_apellidos"
                            value={dentistData.dentista_apellidos}
                            onChange={handleChange}
                            className="w-full"
                        />
                    </div>
                    <div>
                        <Label htmlFor="dentista_telefono">Teléfono:</Label>
                        <Input
                            type="text"
                            id="dentista_telefono"
                            name="dentista_telefono"
                            value={dentistData.dentista_telefono}
                            onChange={handleChange}
                            className="w-full"
                        />
                    </div>
                    <div>
                        <Label htmlFor="dentista_domicilio">Domicilio:</Label>
                        <Input
                            type="text"
                            id="dentista_domicilio"
                            name="dentista_domicilio"
                            value={dentistData.dentista_domicilio}
                            onChange={handleChange}
                            className="w-full"
                        />
                    </div>
                    <div>
                        <Label htmlFor="dentista_cedula">Cédula:</Label>
                        <Input
                            type="text"
                            id="dentista_cedula"
                            name="dentista_cedula"
                            value={dentistData.dentista_cedula}
                            onChange={handleChange}
                            className="w-full"
                        />
                    </div>
                    <div className="flex justify-center">
                        <Button onClick={handleSubmit} className="w-1/3">Agregar Dentista</Button>
                    </div>
                </div>
            </div>
        </div>
    );
     
}