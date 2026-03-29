import { getCurrentUser } from "./_actions/auth";
import { redirect } from "next/navigation";

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

  return <div>{currentUser.role === "ADMIN" ? admin : user}</div>;
}
