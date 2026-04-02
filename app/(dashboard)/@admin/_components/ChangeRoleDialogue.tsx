"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { updateUserRole } from "@/actions/admin/users.action";
import { Loader2 } from "lucide-react";

export function ChangeRoleDialog({
  userId,
  currentRole,
}: {
  userId: string;
  currentRole: string;
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState(currentRole);

  const handleConfirm = async () => {
    if (selectedRole === currentRole) {
      setOpen(false);
      return;
    }

    setLoading(true);
    try {
      const result = await updateUserRole(userId, selectedRole);
      if (result.success) {
        toast.success(result.message);
        setOpen(false);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Failed to update user role");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Badge
          variant="secondary"
          className="cursor-pointer text-[10px] font-medium uppercase transition-colors hover:bg-secondary/80"
        >
          {currentRole}
        </Badge>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Change User Role</DialogTitle>
          <DialogDescription>
            Select a new role for this user. This will update their platform
            permissions immediately.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              Current Role:{" "}
              <span className="font-bold text-foreground">{currentRole}</span>
            </p>
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger>
                <SelectValue placeholder="Select a new role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USER">USER</SelectItem>
                <SelectItem value="ADMIN">ADMIN</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button onClick={handleConfirm} disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Confirm Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
