"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";

export default function Login() {

    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const url: string | undefined = process.env.NEXT_PUBLIC_API
    const handleRegistrar = () => {
        router.push('/Registrar')
    };

    const handleLogin = () => {

        fetch(`${url}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_email: email,
                user_password: password
            })
        })
            .then(response => {
                if(!response.ok){
                    throw new Error('Email o contraseña incorrectos')
                }
                else{
                    return response.json()
                }
            })
            .then(data => {
                console.log(data)
                sessionStorage.setItem('token', data.token)
                sessionStorage.setItem('user_email', data.user_email)
                sessionStorage.setItem('user_roles', data.user_roles[0])

                const role = (sessionStorage.getItem('user_roles'));
                if(role === 'creator') router.push('Home');
                if(role === 'user') router.push('Home');
                if(role === 'dentist') router.push('Home');
            })
            .catch(error => {
                Swal.fire({
                    toast: true,
                    icon: 'error',
                    title: 'Email o contraseña incorrectos',
                    position: 'bottom-start', // You can also use 'top-start', 'bottom-start', 'bottom-end'
                    showConfirmButton: false,
                    timer: 3000, // Auto-close after 3 seconds
                    timerProgressBar: true
                  });
                console.log(error);
            });
      
    };
 
    return (
        
        <>
            <div className="flex flex-col items-center justify-center h-screen bg-gray-100 w-screen mt-[-40px]">
                <h1 className="text-4xl mb-[30px] font-bold">
                    Inicia Sesión
                </h1>
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
                    <Button variant="blue" onClick={handleLogin} className="mb-[20px] w-full">Ingresar</Button>

                    <br></br>

                    <Button variant="red" onClick={handleRegistrar} className="w-full">Registrarse</Button>
                </div>
            </div>
        </>

    )
}