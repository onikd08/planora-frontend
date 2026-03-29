import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { Route } from "@/app/routes/route.interface";
import { adminRoutes } from "@/app/routes/adminRoutes";
import { userRoutes } from "@/app/routes/userRoutes";
import { LayoutDashboard, Home, Sparkles } from "lucide-react";

export const Roles = {
  ADMIN: "ADMIN",
  USER: "USER",
};

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  role: string;
}

export default function AppSidebar({ role, ...props }: AppSidebarProps) {
  let routes: Route[] = [];
  
  // Normalizing role to uppercase to match the constant
  const normalizedRole = role?.toUpperCase();

  switch (normalizedRole) {
    case Roles.ADMIN:
      routes = adminRoutes;
      break;
    case Roles.USER:
      routes = userRoutes;
      break;
    default:
      routes = [];
      break;
  }

  return (
    <Sidebar {...props}>
      <SidebarHeader className="border-b border-sidebar-border/50 py-4">
        <Link href="/dashboard" className="flex items-center gap-3 px-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-lg shadow-primary/20">
            <Sparkles className="h-5 w-5" />
          </div>
          <span className="text-lg font-bold tracking-tight">Planora</span>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        {/* Main Routes */}
        {routes.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild tooltip={item.title}>
                      <Link href={item.url}>
                        <LayoutDashboard className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}

        {/* Global Navigation - Always Visible */}
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Home">
                  <Link href="/">
                    <Home className="h-4 w-4" />
                    <span>Home Page</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
