import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
  {
    title: "Menú Principal",
    url: "/Home",
    icon: Home,
  },
  {
    title: "Dentistas",
    url: "/dentist",
    icon: Home,
  },
  {
    title: "Pacientes",
    url: "/paciente",
    icon: Home,
  },
]

export function AppSidebar() {
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
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
