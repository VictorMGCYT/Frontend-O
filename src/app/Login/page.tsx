"use client";
import Login from "./Login";
import { useEffect } from "react";
import { useSidebar } from "@/components/ui/sidebar";



export default function LoginPage() {

    let {open, setOpen, setOpenMobile, openMobile} = useSidebar();

    useEffect(()=>{

        setOpen(false);
        setOpenMobile(false);
        openMobile = false;
        open = false

    }, [setOpen, openMobile])

    return (
        
        <>
            <Login></Login>
        </>

    )
}