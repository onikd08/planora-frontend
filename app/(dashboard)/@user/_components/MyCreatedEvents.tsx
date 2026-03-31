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
import { Edit, Eye, Calendar, Users, MapPin } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

export default async function MyEvents({ events }: { events: any[] }) {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 px-4 py-8">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            My Events
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage the events you have organized.
          </p>
        </div>
        <Button asChild className="w-fit">
          <Link href="/dashboard/create-event">Create New Event</Link>
        </Button>
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="py-4">Event Details</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Capacity</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events.length > 0 ? (
              events.map((event: any) => (
                <TableRow
                  key={event.id}
                  className="border-border hover:bg-muted/30"
                >
                  <TableCell className="py-4">
                    <div className="mb-1 leading-none font-semibold text-foreground">
                      {event.title}
                    </div>
                    <div className="font-mono text-xs text-muted-foreground">
                      ID: {event.id.slice(0, 8)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {event.city}, {event.country}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <Calendar className="h-3 w-3 text-muted-foreground" />
                      {format(new Date(event.startTime), "MMM d, yyyy")}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm font-medium">
                      <Users className="h-3 w-3 text-muted-foreground" />
                      {event.eventParticipations?.length || 0} /{" "}
                      {event.capacity}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={event.isCancelled ? "destructive" : "secondary"}
                      className="capitalize"
                    >
                      {event.isCancelled
                        ? "Cancelled"
                        : event.eventStatus.toLowerCase()}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div>
                      <Button variant="outline" size="icon" asChild>
                        <Link href={`/events/${event.id}`}>
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="h-40 text-center text-muted-foreground"
                >
                  <div className="flex flex-col items-center gap-2">
                    <span>You haven't created any events yet.</span>
                    <Button variant="link" asChild>
                      <Link href="/dashboard/create-event">
                        Host your first event
                      </Link>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
