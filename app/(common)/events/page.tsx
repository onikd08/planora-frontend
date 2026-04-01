import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import SearchFilters from "../_components/page/events/SearchFilters";
import Pagination from "../_components/page/events/Pagination";

export const metadata = {
  title: "Events Catalog | Planora",
  description: "Browse all events on Planora based on category and pricing.",
};

export const dynamic = "force-dynamic";

const getStatusBadge = (status: string) => {
  switch (status) {
    case "ONGOING":
      return (
        <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 rounded-full bg-emerald-500/90 px-3 py-1 text-sm font-semibold text-white shadow-xs backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-white"></span>
          </span>
          Live Now
        </div>
      );
    case "COMPLETED":
      return (
        <div className="absolute top-4 right-4 z-20 rounded-full bg-gray-900/80 px-3 py-1 text-sm font-semibold text-white shadow-xs backdrop-blur-md dark:bg-gray-800/90">
          Ended
        </div>
      );
    case "CANCELLED":
      return (
        <div className="absolute top-4 right-4 z-20 rounded-full bg-rose-500/90 px-3 py-1 text-sm font-semibold text-white shadow-xs backdrop-blur-md">
          Cancelled
        </div>
      );
    case "UPCOMING":
    default:
      return null;
  }
};

const getCardStyles = (status: string) => {
  const base =
    "group relative flex flex-col items-start justify-between rounded-3xl p-6 shadow-md ring-1 transition-all hover:shadow-xl ";

  switch (status) {
    case "ONGOING":
      return (
        base +
        "bg-white dark:bg-gray-900 ring-emerald-500/30 dark:ring-emerald-500/30 shadow-emerald-500/5 hover:-translate-y-1"
      );
    case "COMPLETED":
      return (
        base +
        "bg-gray-50/80 dark:bg-gray-900/50 ring-gray-200 dark:ring-gray-800 opacity-80 grayscale-[20%] hover:grayscale-0"
      );
    case "CANCELLED":
      return (
        base +
        "bg-rose-50/30 dark:bg-rose-950/10 ring-rose-200 dark:ring-rose-900/40 opacity-75"
      );
    case "UPCOMING":
    default:
      return (
        base +
        "bg-white dark:bg-gray-900 ring-gray-200 dark:ring-gray-800 hover:-translate-y-1"
      );
  }
};

const EventsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const resolvedParams = await searchParams;
  const categoryId = resolvedParams.categoryId as string;
  const type = resolvedParams.type as string; // all, free, paid
  const eventStatus = resolvedParams.eventStatus as string; // UPCOMING, ONGOING, COMPLETED, CANCELLED
  const searchTerm = resolvedParams.searchTerm as string;
  const page = (resolvedParams.page as string) || "1";
  const limit = (resolvedParams.limit as string) || "9";
  const sortBy = (resolvedParams.sortBy as string) || "createdAt";
  const sortOrder = (resolvedParams.sortOrder as string) || "desc";

  // Fetch categories for the filter dropdown
  const catRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/event-categories`,
    { next: { revalidate: 60 } }
  ).catch(() => null);
  const catJson = catRes ? await catRes.json() : { data: [] };
  const categories = catJson?.data || [];

  // Construct query safely
  const queryParams = new URLSearchParams();
  queryParams.append("page", page);
  queryParams.append("limit", limit);
  queryParams.append("sortBy", sortBy);
  queryParams.append("sortOrder", sortOrder);

  if (categoryId && categoryId !== "all")
    queryParams.append("categoryId", categoryId);
  if (searchTerm) queryParams.append("searchTerm", searchTerm);
  if (eventStatus && eventStatus !== "all")
    queryParams.append("eventStatus", eventStatus);

  // Send type to backend natively supporting type=free and type=paid
  if (type && type !== "all") queryParams.append("type", type);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/events?${queryParams.toString()}`,
    { next: { revalidate: 3600 } }
  );
  const json = await res.json();

  let events: any[] = json.data?.data || [];
  const meta = json.data?.meta || {
    page: 1,
    limit: 9,
    totalPage: 1,
    total: events.length,
  };

  // Extract the true total pages from the API (which uses totalPage) or our fallback
  const totalPagesCount = meta.totalPage || meta.totalPages || 1;

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-gray-50/50 py-12 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Discover Events
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            {meta.total} event{meta.total !== 1 ? "s" : ""} found.
          </p>
        </div>

        {/* Client-side Search and Filters Component */}
        <SearchFilters categories={categories} />

        {events.length === 0 ? (
          <div className="rounded-3xl bg-white py-20 text-center shadow-xs ring-1 ring-gray-200 dark:bg-gray-900 dark:ring-gray-800">
            <h3 className="mt-2 text-sm font-semibold text-gray-900 dark:text-white">
              No events found
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Try adjusting your filters or search term.
            </p>
            <div className="mt-6 flex justify-center gap-4">
              <Button asChild variant="outline">
                <Link href="/events">Clear Filters</Link>
              </Button>
              <Button asChild>
                <Link href="/">Back Home</Link>
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="relative z-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => (
                <Link
                  key={event.id}
                  href={`/events/${event.id}`}
                  className={getCardStyles(event.eventStatus)}
                >
                  <div className="relative mb-6 aspect-video w-full overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800">
                    {event.imageURL ? (
                      <Image
                        src={event.imageURL}
                        alt={event.title}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                    ) : (
                      <div className="relative flex h-full items-center justify-center overflow-hidden text-gray-400 transition-transform group-hover:scale-105">
                        <div className="absolute inset-0 bg-linear-to-br from-primary/40 to-indigo-900/80 opacity-80 mix-blend-multiply" />
                        <span className="z-10 font-semibold text-gray-500 dark:text-gray-300">
                          Planora Event
                        </span>
                      </div>
                    )}

                    {/* Status Badge */}
                    {getStatusBadge(event.eventStatus)}

                    <div className="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 text-sm font-semibold text-gray-900 shadow-xs backdrop-blur-sm dark:bg-gray-900/90 dark:text-white">
                      {event.fee === 0 ? "Free" : `$${event.fee}`}
                    </div>
                  </div>

                  <div className="mb-3 flex w-full items-center gap-x-4 text-xs">
                    <time
                      dateTime={event.startTime}
                      className="flex items-center gap-1 text-gray-500 dark:text-gray-400"
                    >
                      <Calendar className="h-4 w-4" />
                      {new Date(event.startTime).toLocaleDateString()}
                    </time>
                    <span className="relative z-10 ml-auto rounded-full bg-primary/10 px-3 py-1.5 font-medium text-primary dark:bg-indigo-500/20 dark:text-indigo-300 dark:ring-1 dark:ring-indigo-500/30">
                      {event.category?.name || "Uncategorized"}
                    </span>
                  </div>

                  <div className="group relative mt-1 w-full">
                    <h3
                      className={`line-clamp-1 text-xl leading-6 font-semibold transition-colors ${event.eventStatus === "CANCELLED" ? "text-gray-500 line-through dark:text-gray-500" : "text-gray-900 group-hover:text-primary dark:text-white"}`}
                    >
                      {event.title}
                    </h3>
                    <p className="mt-3 line-clamp-2 text-sm leading-6 text-gray-600 dark:text-gray-400">
                      {event.description}
                    </p>
                  </div>

                  <div className="mt-6 flex w-full flex-col gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span className="line-clamp-1">
                        {event.city}, {event.country}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" />
                      <span>
                        {new Date(event.startTime).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}{" "}
                        -{" "}
                        {new Date(event.endTime).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>

                  <div className="mt-8 flex w-full items-center justify-between border-t border-gray-100 pt-6 dark:border-gray-800">
                    <div className="flex items-center gap-x-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 font-bold text-primary ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700">
                        {event.creator?.firstName?.[0] || ""}
                        {event.creator?.lastName?.[0] || ""}
                      </div>
                      <div className="text-sm">
                        <p className="line-clamp-1 font-semibold text-gray-900 dark:text-white">
                          {event.creator?.firstName} {event.creator?.lastName}
                        </p>
                        <p className="mt-0.5 line-clamp-1 text-xs text-gray-500 dark:text-gray-400">
                          {event.creator?.email}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant={
                        event.eventStatus === "COMPLETED" ||
                        event.eventStatus === "CANCELLED"
                          ? "outline"
                          : "secondary"
                      }
                      size="sm"
                      className={`transition-transform ${event.eventStatus === "COMPLETED" || event.eventStatus === "CANCELLED" ? "" : "group-hover:scale-105"}`}
                    >
                      {event.eventStatus === "COMPLETED"
                        ? "View Recap"
                        : event.eventStatus === "CANCELLED"
                          ? "View Details"
                          : "View Event"}
                    </Button>
                  </div>
                </Link>
              ))}
            </div>

            {/* Client-side Pagination Component */}
            <Pagination
              currentPage={Number(meta.page)}
              totalPages={Number(totalPagesCount)}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default EventsPage;
