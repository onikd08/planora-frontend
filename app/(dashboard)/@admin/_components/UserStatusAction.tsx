"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { UserMinus, UserCheck } from "lucide-react";
import { updateUserStatus } from "@/actions/admin/users.action";

export function UserStatusAction({
  userId,
  status,
}: {
  userId: string;
  status: string;
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const isBanned = status === "BANNED";

  const handleStatusChange = async () => {
    setLoading(true);
    try {
      await updateUserStatus(userId);
      toast.success(`User ${isBanned ? "Unbanned" : "Banned"} successfully`);
      router.refresh();
    } catch (error) {
      toast.error("Unauthorized or server error");
    } finally {
      setLoading(false);
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant={isBanned ? "outline" : "destructive"}
          size="sm"
          className="gap-2"
        >
          {isBanned ? (
            <UserCheck className="h-4 w-4" />
          ) : (
            <UserMinus className="h-4 w-4" />
          )}
          {isBanned ? "Unban User" : "Ban User"}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action will {isBanned ? "restore access" : "restrict access"}{" "}
            for this user. They will{" "}
            {isBanned ? "be able" : "no longer be able"} to log into the
            platform.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleStatusChange}
            className={
              isBanned
                ? "bg-primary"
                : "text-destructive-foreground bg-destructive"
            }
          >
            {loading ? "Processing..." : "Confirm"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
