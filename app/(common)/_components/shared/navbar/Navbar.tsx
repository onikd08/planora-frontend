"use client";
import React from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MenuToggleIcon } from "@/components/ui/menu-toggle-icon";
import { useScroll } from "@/components/ui/use-scroll";
import Link from "next/link";
import { Hexagon, User } from "lucide-react";
import { ModeToggle } from "./ModeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { logoutAction } from "@/actions/auth/auth.action";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Navbar({ user }: { user?: any }) {
  const [open, setOpen] = React.useState(false);
  const scrolled = useScroll(10);
  const router = useRouter();

  const handleLogout = async () => {
    await logoutAction();
    toast.success("Logged out successfully");
    router.push("/login");
    router.refresh();
  };

  const links = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Events",
      href: "/events",
    },
    {
      label: "About",
      href: "/about",
    },
  ];

  React.useEffect(() => {
    if (open) {
      // Disable scroll
      document.body.style.overflow = "hidden";
    } else {
      // Re-enable scroll
      document.body.style.overflow = "";
    }

    // Cleanup when component unmounts (important for Next.js)
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 mx-auto w-full max-w-5xl border-b border-transparent md:rounded-md md:border md:transition-all md:ease-out",
        {
          "border-border bg-background/95 backdrop-blur-lg supports-backdrop-filter:bg-background/50 md:top-4 md:max-w-4xl md:shadow":
            scrolled && !open,
          "bg-background/90": open,
        }
      )}
    >
      <nav
        className={cn(
          "flex h-14 w-full items-center justify-between px-4 md:h-12 md:transition-all md:ease-out",
          {
            "md:px-2": scrolled,
          }
        )}
      >
        <div>
          <span className="flex items-center justify-center gap-2">
            <Hexagon className="h-6 w-6" />
            <Link href="/" className="text-lg font-bold">
              Planora
            </Link>
          </span>
        </div>
        <div className="hidden items-center gap-2 md:flex">
          {links.map((link, i) => (
            <a
              key={i}
              className={buttonVariants({ variant: "ghost" })}
              href={link.href}
            >
              {link.label}
            </a>
          ))}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 rounded-full ring-2 ring-primary/20 transition-all hover:ring-primary/40 focus:ring-primary/60 focus:outline-none">
                <Avatar className="h-9 w-9 border border-border">
                  <AvatarImage src={user?.profilePhoto} alt={user.firstName} />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {user.firstName[0]}
                    {user.lastName[0]}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm leading-none font-medium">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link
                    href={
                      user.role === "ADMIN"
                        ? "/admin-dashboard/profile"
                        : "/dashboard/profile"
                    }
                    className="w-full cursor-pointer"
                  >
                    My Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard" className="w-full cursor-pointer">
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="w-full cursor-pointer text-red-500 focus:bg-red-500/10 focus:text-red-500"
                >
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button asChild variant="outline">
                <Link href="/login">Sign In</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/register">Register</Link>
              </Button>
            </>
          )}
          <ModeToggle />
        </div>
        <Button
          size="icon"
          variant="outline"
          onClick={() => setOpen(!open)}
          className="md:hidden"
        >
          <MenuToggleIcon open={open} className="size-5" duration={300} />
        </Button>
      </nav>

      <div
        className={cn(
          "fixed top-14 right-0 bottom-0 left-0 z-50 flex flex-col overflow-hidden border-y bg-background/90 md:hidden",
          open ? "block" : "hidden"
        )}
      >
        <div
          data-slot={open ? "open" : "closed"}
          className={cn(
            "ease-out data-[slot=closed]:animate-out data-[slot=closed]:zoom-out-95 data-[slot=open]:animate-in data-[slot=open]:zoom-in-95",
            "flex h-full w-full flex-col justify-between gap-y-2 p-4"
          )}
        >
          <div className="grid gap-y-2">
            {links.map((link) => (
              <a
                key={link.label}
                className={buttonVariants({
                  variant: "ghost",
                  className: "justify-start",
                })}
                href={link.href}
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            {user ? (
              <>
                <div className="flex items-center gap-3 px-1 py-2">
                  {user.profilePhoto ? (
                    <img
                      src={user.profilePhoto}
                      alt={user.firstName}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <User className="h-5 w-5" />
                    </div>
                  )}
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">
                      {user.firstName} {user.lastName}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {user.email}
                    </span>
                  </div>
                </div>
                <Button
                  asChild
                  variant="outline"
                  className="w-full justify-start"
                >
                  <Link
                    href={
                      user.role === "ADMIN"
                        ? "/admin-dashboard/profile"
                        : "/dashboard/profile"
                    }
                  >
                    My Profile
                  </Link>
                </Button>
                <Button asChild className="w-full justify-start">
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
                <Button
                  variant="destructive"
                  className="w-full shrink-0"
                  onClick={() => {
                    setOpen(false);
                    handleLogout();
                  }}
                >
                  Log out
                </Button>
              </>
            ) : (
              <>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/register">Register</Link>
                </Button>
              </>
            )}
            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
