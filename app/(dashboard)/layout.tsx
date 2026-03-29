import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { getCurrentUser } from "./_actions/auth";
import { redirect } from "next/navigation";
import AppSidebar, { Roles } from "@/components/app-sidebar";

export default async function DashboardLayout({
  children,
  admin,
  user,
}: Readonly<{
  children: React.ReactNode;
  admin: React.ReactNode;
  user: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect("/login");
  }

  const role = currentUser.role?.toUpperCase();

  return (
    <SidebarProvider style={{
      "--sidebar-width": "16rem",
      "--sidebar-width-mobile": "18rem",
    } as React.CSSProperties}>
      <AppSidebar role={role} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <h1>{role} Dashboard</h1>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          {role === Roles.ADMIN
            ? admin
            : role === Roles.USER
              ? user
              : null}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
