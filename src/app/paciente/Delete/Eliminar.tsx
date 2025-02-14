'use client';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";
import { ComboBox } from "@/components/custom/combobox/combobox";

export default function Eliminar() {
    const router = useRouter();
    const url: string | undefined = process.env.NEXT_PUBLIC_API;

    const [role, setRole] = useState('');
    const token = sessionStorage.getItem('token');

    const [nombre, setNombre] = useState([])
    const [id, setId] = useState([])

    async function getData() {
        try {
            console.log(url)
            const res = await fetch(`${url}/paciente/pacientesToDelete`);

            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }

            const data = await res.json(); // O usa res.text() si no es JSON
            console.log(data);

            const formattedData = data.map((cosa : any) => ({
                value: cosa.id,
                label: cosa.nombre,
            }));
            setNombre(formattedData);

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }


    useEffect(() => {
        getData()
    }, [])

    const handleSubmit = () => {

    }

    const roles = [
        {
            value: 'user'
            , label: 'Usuario'
        },
        { value: 'dentis', label: 'Dentista' }
    ];

    return (
        <div className="flex justify-center items-center min-h-screen white w-screen">
            <div className="w-full p-8 bg-gray-100 shadow-md rounded-lg">
                <h1 className="text-2xl font-bold text-center mb-6">Eliminar Paciente</h1>
                <div className="space-y-5">
                    <ComboBox
                        data={nombre}
                        onChange={(value) => setRole(value)}
                        title="Selecciona un paciente"
                        className="w-full"
                    ></ComboBox>

                    <div className="flex justify-center">
                        <Button onClick={handleSubmit} className="w-1/3">Eliminar Paciente</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}