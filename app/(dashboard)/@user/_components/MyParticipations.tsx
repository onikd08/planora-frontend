import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Ticket, ExternalLink } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { PayNowButton } from "./PayNowButton";

export default async function MyParticipations({ participations }: any) {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 px-4 py-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          My Participations
        </h1>
        <p className="text-sm text-muted-foreground">
          Events you have joined or are planning to attend.
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="py-4">Event</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Ticket Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {participations.length > 0 ? (
              participations.map((item: any) => (
                <TableRow
                  key={item.id}
                  className="border-border hover:bg-muted/30"
                >
                  <TableCell className="py-4">
                    <div className="mb-1 leading-none font-semibold text-foreground">
                      <Link href={`/events/${item.event.id}`}>
                        {item.event.title}
                      </Link>
                    </div>
                    <div className="line-clamp-1 max-w-[200px] text-xs text-muted-foreground">
                      {item.event.description}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5" />
                      {item.event.city}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                      {format(new Date(item.event.startTime), "MMM d, yyyy")}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <Ticket className="h-3.5 w-3.5 text-muted-foreground" />
                      {item.event.fee === 0 ? (
                        <span className="font-medium text-emerald-500">
                          Free
                        </span>
                      ) : (
                        <span className="font-medium">${item.event.fee}</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        item.participationStatus === "CONFIRMED"
                          ? "default"
                          : "outline"
                      }
                      className={
                        item.participationStatus === "CONFIRMED"
                          ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-500"
                          : ""
                      }
                    >
                      {item.participationStatus}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {item.participationStatus === "PENDING" && (
                      <PayNowButton participationId={item.id} />
                    )}
                    {item.participationStatus === "CONFIRMED" && (
                      <span className="text-sm text-muted-foreground">
                        Paid via Stripe
                      </span>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="h-40 text-center text-muted-foreground"
                >
                  You haven't joined any events yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
