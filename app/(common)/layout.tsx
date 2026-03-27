import { Hexagon} from "lucide-react"
import { Navbar } from "./_components/shared/navbar/Navbar"
import { Footer } from "./_components/shared/footer/Footer"


export default function CommonLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
      <div>
        <Navbar />
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
  )
}
