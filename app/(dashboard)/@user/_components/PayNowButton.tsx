"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, CreditCard } from "lucide-react";
import { toast } from "sonner";
import { initiatePayment } from "@/actions/user/event.action";

export function PayNowButton({ participationId }: { participationId: string }) {
  const [loading, setLoading] = useState(false);

  const handlePayNow = async () => {
    setLoading(true);
    const result = await initiatePayment(participationId);

    if (result.data?.paymentURL) {
      window.location.href = result.data.paymentURL;
    } else {
      toast.error("Could not initiate payment");
    }
    setLoading(false);
  };

  return (
    <Button
      size="sm"
      onClick={handlePayNow}
      disabled={loading}
      className="gap-2 bg-indigo-600 text-white hover:bg-indigo-700"
    >
      {loading ? (
        <Loader2 className="h-3 w-3 animate-spin" />
      ) : (
        <CreditCard className="h-3 w-3" />
      )}
      Pay Now
    </Button>
  );
}
