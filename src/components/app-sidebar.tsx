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
    //url: "/Home",
    //icon: Home,
    submenu: [
      {
        title: "Agregar Paciente",
        url: "/paciente/Create",
      },
      {
        title: "Eliminar Paciente",
        url: "/paciente/Delete",
      },
      {
        title: "Editar Paciente",
        url: "/paciente/Edit",
      }
    ],
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
                    <div onClick={() => item.submenu && toggleSubmenu(item.title)}>
                      <a href={item.url}>
                        
                        <span>{item.title}</span>
                      </a>
                    </div>
                  </SidebarMenuButton>
                  {item.submenu && openSubmenus[item.title] && (
                    <SidebarMenu>
                      {item.submenu.map((subitem) => (
                        <SidebarMenuItem key={subitem.title}>
                          <SidebarMenuButton asChild>
                            <a href={subitem.url}>
                              <span>{subitem.title}</span>
                            </a>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}