import { Geist, Geist_Mono, Nunito_Sans } from "next/font/google";

import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";

const nunitoSans = Nunito_Sans({ subsets: ["latin"], variable: "--font-sans" });

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        nunitoSans.variable
      )}
    >
      <body>
        <ThemeProvider>
          {children}
          <Toaster
            position="bottom-center"
            richColors
            closeButton
            duration={5000}
            toastOptions={{
              className: "rounded-2xl font-sans tracking-tight",
              style: { padding: "16px" },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
