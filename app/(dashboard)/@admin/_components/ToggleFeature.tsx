"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner"; // or your preferred toast library
import { toggleFeaturedEvent } from "@/actions/admin/event.action";

export function FeaturedToggle({
  eventId,
  initialValue,
}: {
  eventId: string;
  initialValue: boolean;
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCheckedChange = async () => {
    setLoading(true);
    try {
      const { success, message } = await toggleFeaturedEvent(eventId);
      if (!success) {
        toast.error(message);
        return;
      }
      router.refresh();
      toast.success(message);
    } catch (error) {
      toast.error("Failed to update event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Checkbox
      checked={initialValue}
      disabled={loading}
      onCheckedChange={handleCheckedChange}
    />
  );
}
