"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function Registrar() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState(''); 
    const url: string | undefined = process.env.NEXT_PUBLIC_API;

    const handleRegistrar = () => {
        const formData = new FormData();
        formData.append('user_email', email);
        formData.append('user_password', password);
        formData.append('user_isActive', 'true');
        formData.append('user_roles', role);

        fetch(`${url}/auth/Create`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            },
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error la contraseña debe tener al menos una mayuscula, y un numero o punto');
            } else {
                return response.json();
            }
        })
        .then(data => {
            console.log(data);
            sessionStorage.setItem('user_email', data.user_email);
            router.push('/Login');
        })
        .catch(error => {
            Swal.fire({
                toast: true,
                icon: 'error',
                title: 'Error, Correo ya registrado',
                position: 'bottom-start',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true
            });
            console.log(error);
        });
    };

    return (
        <>
            <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
                <h1>HOLAMUNDO</h1>
                <div className="w-[300px] lg:w-[400px] border border-gray-300 p-[30px] rounded-md shadow-[10px_10px_30px_rgba(0,0,0,0.6)]">
                    <Label htmlFor="email">Email:</Label>
                    <Input
                        className="mb-[30px] border-gray-400"
                        type="email"
                        id="email"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Label htmlFor="password">Contraseña:</Label>
                    <Input
                        className="mb-[30px] border-gray-400"
                        type="password"
                        id="password"
                        placeholder="Contraseña"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <RadioGroup defaultValue="Usuario" className="w-full my-4" onValueChange={setRole}>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Usuario" id="Usuario" />
                            <Label htmlFor="Usuario">Usuario</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Dentista" id="Dentista" />
                            <Label htmlFor="Dentista">Dentista</Label>
                        </div>
                    </RadioGroup>
                    <Button onClick={handleRegistrar} className="w-full mt-4">Registrarse</Button>
                </div>
            </div>
        </>
    );
}