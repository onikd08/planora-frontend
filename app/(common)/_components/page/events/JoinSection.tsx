"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "sonner"; // or your toast library
import { Loader2, CreditCard, Clock } from "lucide-react";
import { joinEvent } from "@/actions/user/event.action";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface JoinSectionProps {
  eventId: string;
  fee: number;
  isJoined: boolean; // Pass this from your server component
}

export function JoinSection({ eventId, fee, isJoined }: JoinSectionProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  if (isJoined) {
    return (
      <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-center">
        <p className="font-medium text-emerald-700">
          You have already joined this event!
        </p>
        <Button
          variant="link"
          onClick={() => router.push("/dashboard/my-participations")}
        >
          My Participations
        </Button>
      </div>
    );
  }

  const handleJoin = async (mode: "immediate" | "later") => {
    setLoading(true);
    try {
      const data = await joinEvent({ eventId }, mode);

      // 1. Handle Redirect to Stripe (Immediate Payment)
      if (data.data?.paymentURL) {
        window.location.href = data.data.paymentURL;
        return;
      }

      // 2. Handle Free or Pay Later (Internal Redirect)
      //console.log(data);
      //toast.success(data.message);
      router.push("/dashboard/my-participations");
      router.refresh();
    } catch (error: any) {
      toast.error(error.message || "Failed to join event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3 rounded-xl border bg-card p-6 shadow-sm">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-muted-foreground">Total Fee</span>
        <span className="text-2xl font-bold">
          {fee === 0 ? "Free" : `$${fee}`}
        </span>
      </div>

      {fee === 0 ? (
        <Button
          size="lg"
          className="w-full"
          onClick={() => handleJoin("immediate")}
          disabled={loading}
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            "Join for Free"
          )}
        </Button>
      ) : (
        <div className="grid gap-3">
          <Button
            size="lg"
            className="w-full gap-2"
            onClick={() => handleJoin("immediate")}
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <CreditCard className="h-4 w-4" />
            )}
            Pay & Join Now
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="w-full gap-2"
            onClick={() => handleJoin("later")}
            disabled={loading}
          >
            <Clock className="h-4 w-4" />
            Reserve & Pay Later
          </Button>
          <p className="mt-2 text-center text-xs text-muted-foreground">
            Secure payment processing via Stripe
          </p>
        </div>
      )}
    </div>
  );
}
