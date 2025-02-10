"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AddDentist from "./Home";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

export default function Home({ children }: { children: React.ReactNode }) {

    const router = useRouter();

    useEffect(() => {

        const token = sessionStorage.getItem('token')
        const email = sessionStorage.getItem('user_email')

        if(token === null || email === null){
            router.push('/Login')
        }

    }, []) 

    return (
        <SidebarProvider>
            <div className="flex h-screen">
                {/* Sidebar */}
                <AppSidebar />
            </div>
            {/* Contenido principal */}
            <div className="flex-1 flex flex-col w-full p-6">
                    <AddDentist />
                    {children}
                </div>
        </SidebarProvider>
    );    
}