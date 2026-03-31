import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Payment Success",
  description: "Payment Success",
};

export default function PaymentSuccessPage() {
  return (
    <div className="flex min-h-[60vh] animate-in flex-col items-center justify-center px-4 text-center duration-500 fade-in zoom-in">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
        <CheckCircle2 className="h-10 w-10 text-green-600" />
      </div>

      <h1 className="mb-3 text-3xl font-bold text-foreground">
        Payment Successful!
      </h1>
      <p className="mb-8 max-w-md text-lg text-muted-foreground">
        Thank you for your purchase. Your participation has been confirmed and
        your ticket is ready.
      </p>

      <div className="flex flex-col gap-4 sm:flex-row">
        <Button asChild size="lg" className="gap-2">
          <Link href="/dashboard/my-participations">
            My Participations <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
        <Button variant="outline" asChild size="lg">
          <Link href="/events">Browse More Events</Link>
        </Button>
      </div>
    </div>
  );
}
