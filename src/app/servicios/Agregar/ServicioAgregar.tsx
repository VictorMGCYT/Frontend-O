'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";


export default function ServicioAgregar() {

    //TODO: fix this form
    const router = useRouter();
    const url: string | undefined = process.env.NEXT_PUBLIC_API;

    const token = sessionStorage.getItem('token');
    const [pacienteData, setPacienteData] = useState({
        servicio_nombre:"",
        servicio_precio:0,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPacienteData({
            ...pacienteData,
            [e.target.name]: e.target.value,
        });

        console.log(pacienteData)
    };

    

    const handleSubmit = () => {
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
                router.push("/servicios");
            })
            .catch((error) => {
                console.log(error)
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: error.message,
                });
            });
    };

    return (
        <>
            <div className="flex justify-center items-center min-h-screen white w-screen">
                <div className="w-full p-8 bg-gray-100 shadow-md rounded-lg">
                    <h1 className="text-2xl font-bold text-center mb-6">Agregar Servicio</h1>
                    <div className="space-y-5">
                        <Label>Servicio</Label>
                        <Input
                            type="text" placeholder="Servicio"
                            id="servicio_nombre"
                            name="servicio_nombre"
                            value={pacienteData.servicio_nombre}
                            onChange={handleChange}
                            className="w-full"
                        />

                        <Label>Precio</Label>
                        <Input
                            type="text" placeholder="Precio"
                            id="servicio_precio"
                            name="servicio_precio"
                            value={ (+pacienteData.servicio_precio) }
                            onChange={handleChange}
                            className="w-full"
                        />
               

                        <div className="flex justify-center">
                            <Button onClick={handleSubmit} className="w-1/3">Agregar Servicio</Button>
                        </div>
                    </div>
                </div>
            </div>  
        </>
    )
}



