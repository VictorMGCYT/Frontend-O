"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
        
        <>
            <SidebarProvider>
                <AppSidebar />
                <main>
                    <SidebarTrigger />
                    {children}
                </main>
            </SidebarProvider>
        </>

    )
}