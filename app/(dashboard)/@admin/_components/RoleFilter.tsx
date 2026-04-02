"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function RoleFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentRole = searchParams.get("role") || "ALL";

  const handleRoleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "ALL") {
      params.delete("role");
    } else {
      params.set("role", value);
    }
    // Update the URL, which triggers the Server Component to re-fetch
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">Filter by Role:</span>
      <Select value={currentRole} onValueChange={handleRoleChange}>
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Select Role" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ALL">All Roles</SelectItem>
          <SelectItem value="ADMIN">Admin</SelectItem>
          <SelectItem value="USER">User</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
