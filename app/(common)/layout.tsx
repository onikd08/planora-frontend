import { cookies } from "next/headers";
import { Hexagon } from "lucide-react";
import { Navbar } from "./_components/shared/navbar/Navbar";
import { Footer } from "./_components/shared/footer/Footer";
import { jwtDecode } from "jwt-decode";

export default async function CommonLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  let user = null;

  if (accessToken) {
    try {
      // Decode the JWT to get user details (id, email, role, etc.)
      user = jwtDecode(accessToken);
    } catch (e) {
      console.error("Invalid token:", e);
    }
  }

  return (
    <div>
      <Navbar user={user} />
      {children}
      <Footer
        logo={<Hexagon className="h-10 w-10" />}
        brandName="Planora"
        mainLinks={[
          { href: "/about", label: "About" },
          { href: "/events", label: "Events" },
          { href: "/dashboard", label: "Dashboard" },
        ]}
        legalLinks={[
          { href: "/privacy", label: "Privacy" },
          { href: "/contact", label: "Contact" },
        ]}
        copyright={{
          text: "© 2026 Planora",
          license: "All rights reserved",
        }}
      />
    </div>
  );
}
