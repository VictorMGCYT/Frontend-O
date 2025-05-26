'use client'
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";
import { useState } from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { title } from "process";
import { url } from "inspector";

// Menu items.
const items = [
  {
    title: "Menú Principal",
    url: "/Home",
    //icon: Home,
  },
  {
    title: "Dentistas",
    url: "/dentist/Get",
    icon: Home,
    
  },
  {
    title: "Pacientes",
    url: "/paciente/Get",
    icon: Home,
  },
  {
    title: "Servicios",
    url: "/servicios/Agregar/Get",
    icon: Home,
  },
];

export function AppSidebar() {
  const [openSubmenus, setOpenSubmenus] = useState<{ [key: string]: boolean }>({});

  const toggleSubmenu = (title: string) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <Sidebar variant="inset" className="sm:h-screen">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Secciones</SidebarGroupLabel>
          <SidebarGroupContent> 
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <div onClick={() => item && toggleSubmenu(item.title)}>
                      <a href={item.url}>
                        
                        <span>{item.title}</span>
                      </a>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}