"use client";
import { useState, useEffect } from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";

export default function Page() {
 /* {pacientes.map((patient) => (
    <TableRow key={patient.id}>
        <TableCell className="font-medium">{paciente.nombre}</TableCell>
        <TableCell>{paciente_apellido}</TableCell>
        <TableCell>{paciente_telefono}</TableCell>
        <TableCell>{paciente_domicilio}</TableCell>
        <TableCell className="text-right">{paciente.estado}</TableCell>
    </TableRow>
))}*/
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <h1 className="text-4xl font-bold mb-4">DethCare</h1>
            <h2 className="text-2xl mb-4">¡Bienvenid@!</h2>
            <p className="text-lg text-center max-w-md">
                En DethCare nos preocupamos por tu salud y bienestar, por eso te ofrecemos una amplia gama de servicios médicos y de bienestar para que te sientas mejor que nunca.
            </p>

            <Table>
                <TableCaption>Lista de pacientes recientes.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Nombre</TableHead>
                        <TableHead className="w-[100px]">Apellido</TableHead>
                        <TableHead className="w-[100px]">Teléfono</TableHead>
                        <TableHead className="w-[100px]">Domicilio</TableHead>
                        <TableHead className="text-right">Estado</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>

                </TableBody>
            </Table>
        </div>
    );
}