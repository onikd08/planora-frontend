import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { FeaturedToggle } from "./ToggleFeature";
import Pagination from "@/app/(common)/_components/page/events/Pagination";
import { EventService } from "@/services/admin/event.service";

export const EventManagement = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const limit = Number(params.limit) || 5;

  const result = await EventService.getAllEvents({ page: currentPage, limit });

  const events = result.data.data;
  const meta = result.data.meta;

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between px-2">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Events
        </h2>
        <Badge variant="secondary" className="font-mono">
          {meta.total} Total
        </Badge>
      </div>

      <div className="rounded-md border border-border bg-card text-card-foreground shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[300px]">Event</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Fee</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="px-6">Featured</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events.length > 0 ? (
              events.map((event: any) => (
                <TableRow key={event.id} className="border-border">
                  <TableCell>
                    <div className="font-semibold text-foreground">
                      {event.title}
                    </div>
                    <div className="font-mono text-xs tracking-tighter text-muted-foreground">
                      {event.creator.email}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-background">
                      {event.category.name}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {event.city}, {event.country}
                  </TableCell>
                  <TableCell className="font-medium">
                    {event.fee === 0 ? (
                      <span className="text-emerald-500">Free</span>
                    ) : (
                      `$${event.fee}`
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        event.eventStatus === "UPCOMING"
                          ? "default"
                          : "secondary"
                      }
                      className={
                        event.eventStatus === "UPCOMING"
                          ? "bg-primary text-primary-foreground"
                          : ""
                      }
                    >
                      {event.eventStatus}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-8 text-right">
                    <FeaturedToggle
                      eventId={event.id}
                      initialValue={event.isFeatured}
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="h-24 text-center text-muted-foreground"
                >
                  No events found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Integration */}
      <div className="px-2">
        <Pagination currentPage={meta.page} totalPages={meta.totalPage} />
      </div>
    </div>
  );
};
