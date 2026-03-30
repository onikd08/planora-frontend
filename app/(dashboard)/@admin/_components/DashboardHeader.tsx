"use client";

import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function DashboardBreadcrumb({ role }: { role: string }) {
  const pathname = usePathname();

  const segments = pathname.split("/").filter(Boolean);

  // ✅ Detect base
  const base = segments[0]; // "dashboard" or "admin-dashboard"

  // remove base from breadcrumb items
  const rest = segments.slice(1);

  const format = (segment: string) =>
    segment.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase());

  return (
    <div className="flex flex-col">
      {/* Title */}
      <h1 className="text-lg font-semibold">{role} Dashboard</h1>

      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          {/* Root */}
          <BreadcrumbItem>
            <BreadcrumbLink href={`/${base}`}>Dashboard</BreadcrumbLink>
          </BreadcrumbItem>

          {rest.map((segment, index) => {
            const href = "/" + [base, ...rest.slice(0, index + 1)].join("/");

            const isLast = index === rest.length - 1;

            return (
              <div key={href} className="flex items-center">
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  {isLast ? (
                    <span className="text-muted-foreground">
                      {format(segment)}
                    </span>
                  ) : (
                    <BreadcrumbLink href={href}>
                      {format(segment)}
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </div>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
