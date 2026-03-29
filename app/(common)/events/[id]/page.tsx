import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Calendar,
  MapPin,
  Users,
  ArrowLeft,
  Star,
  UserPlus,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Pre-render known event pages at build time as Static HTML
export async function generateStaticParams() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/events?limit=100`
  );
  if (!res.ok) return [];
  const json = await res.json();
  const events = json.data?.data || [];

  return events.map((event: any) => ({
    id: event.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events/${id}`);
  if (!res.ok) return { title: "Event Not Found | Planora" };
  const data = await res.json();
  return {
    title: `${data.data?.title} | Planora`,
    description: data.data?.description,
  };
}

const EventDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events/${id}`, {
    // Revalidate the static page every 60 seconds (Incremental Static Regeneration)
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    notFound();
  }

  const json = await res.json();
  const event = json.data;

  if (!event) {
    notFound();
  }

  const isFree = event.fee === 0;
  const spotsFilled = event.eventParticipations?.length || 0;
  const spotsRemaining = event.capacity - spotsFilled;

  return (
    <div className="min-h-screen bg-gray-50 pb-20 dark:bg-gray-950">
      {/* Hero Section */}
      <div className="relative h-[40vh] w-full bg-gray-900 md:h-[60vh]">
        {event.imageURL ? (
          <Image
            src={event.imageURL}
            alt={event.title}
            fill
            className="object-cover opacity-60"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-linear-to-br from-primary/40 to-indigo-900/80 opacity-80 mix-blend-multiply" />
        )}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-gray-900 to-transparent" />

        <div className="absolute inset-0 flex flex-col justify-end">
          <div className="mx-auto w-full max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
            <Link
              href="/events"
              className="mb-6 inline-flex items-center text-sm font-medium text-white/80 transition-colors hover:text-white"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Events
            </Link>

            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">
                {event.category?.name}
              </span>
              {event.isFeatured && (
                <span className="flex items-center gap-1 rounded-full bg-amber-500 px-3 py-1 text-xs font-semibold text-white">
                  <Star className="h-3 w-3 fill-current" /> Featured
                </span>
              )}
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  event.eventStatus === "UPCOMING"
                    ? "bg-emerald-500 text-white"
                    : "bg-gray-500 text-white"
                }`}
              >
                {event.eventStatus}
              </span>
            </div>

            <h1 className="mb-4 max-w-4xl text-4xl leading-tight font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl">
              {event.title}
            </h1>

            <p className="line-clamp-2 max-w-2xl text-xl text-white/80">
              {event.description}
            </p>
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto -mt-8 mb-12 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Content (Left) */}
          <div className="space-y-8 lg:col-span-2">
            <div className="rounded-3xl bg-white p-8 shadow-xl ring-1 ring-gray-100 dark:bg-gray-900 dark:ring-gray-800">
              <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
                About this Event
              </h2>
              <div className="prose prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
                <p className="whitespace-pre-wrap">{event.description}</p>
              </div>
            </div>

            {/* Organizer Section */}
            <div className="rounded-3xl bg-white p-8 shadow-xl ring-1 ring-gray-100 dark:bg-gray-900 dark:ring-gray-800">
              <h2 className="mb-6 text-xl font-bold text-gray-900 dark:text-white">
                Organizer
              </h2>
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-xl font-bold text-primary ring-2 ring-primary/20">
                  {event.creator?.profilePhoto ? (
                    <Image
                      src={event.creator.profilePhoto}
                      alt={event.creator.firstName}
                      width={64}
                      height={64}
                      className="rounded-full object-cover"
                    />
                  ) : (
                    <>
                      {event.creator?.firstName?.[0]}
                      {event.creator?.lastName?.[0]}
                    </>
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {event.creator?.firstName} {event.creator?.lastName}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Event Creator
                  </p>
                </div>
              </div>
            </div>

            {/* Reviews Section */}
            {event.reviews && event.reviews.length > 0 && (
              <div className="rounded-3xl bg-white p-8 shadow-xl ring-1 ring-gray-100 dark:bg-gray-900 dark:ring-gray-800">
                <h2 className="mb-6 text-xl font-bold text-gray-900 dark:text-white">
                  Reviews ({event.reviews.length})
                </h2>
                <div className="space-y-6">
                  {/* Reviews will be mapped here */}
                  <p className="text-gray-500">
                    Testimonials are currently being loaded...
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Sticky Sidebar (Right) */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className="rounded-3xl bg-white p-6 shadow-xl ring-1 ring-gray-100 md:p-8 dark:bg-gray-900 dark:ring-gray-800">
                <div className="mb-6 border-b border-gray-100 pb-6 dark:border-gray-800">
                  <span className="mb-1 block text-sm font-medium text-gray-500 dark:text-gray-400">
                    Ticket Price
                  </span>
                  <span className="text-4xl font-extrabold text-gray-900 dark:text-white">
                    {isFree ? "Free" : `$${event.fee}`}
                  </span>
                </div>

                <div className="mb-8 space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="mt-1 rounded-lg bg-primary/10 p-2 text-primary">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        Date
                      </p>
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        {new Date(event.startTime).toLocaleDateString([], {
                          weekday: "long",
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                      <p className="mt-0.5 text-sm text-gray-500">
                        {new Date(event.startTime).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}{" "}
                        -{" "}
                        {new Date(event.endTime).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="mt-1 rounded-lg bg-primary/10 p-2 text-primary">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        Location
                      </p>
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        {event.address}
                      </p>
                      <p className="mt-0.5 text-sm text-gray-500">
                        {event.city}, {event.country} {event.postalCode}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="mt-1 rounded-lg bg-primary/10 p-2 text-primary">
                      <Users className="h-5 w-5" />
                    </div>
                    <div className="w-full">
                      <p className="font-semibold text-gray-900 dark:text-white">
                        Capacity Details
                      </p>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                          {event.capacity} Spots
                        </span>
                        <span className="text-sm font-bold text-primary">
                          {spotsRemaining} Left
                        </span>
                      </div>
                      <div className="mt-3 h-2 w-full rounded-full bg-gray-100 dark:bg-gray-800">
                        <div
                          className="h-2 rounded-full bg-primary"
                          style={{
                            width: `${(spotsFilled / event.capacity) * 100}%`,
                          }}
                        ></div>
                      </div>
                      {event.eventParticipations?.length > 0 && (
                        <div className="mt-3 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                          <CheckCircle className="h-4 w-4 text-emerald-500" />
                          <span>
                            {spotsFilled} attendee
                            {spotsFilled !== 1 ? "s" : ""} registered
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <Button
                  size="lg"
                  className="flex w-full items-center justify-center gap-2 py-6 text-lg font-semibold shadow-xl shadow-primary/25 transition-all hover:shadow-2xl"
                  disabled={
                    spotsRemaining <= 0 || event.eventStatus !== "UPCOMING"
                  }
                >
                  {spotsRemaining <= 0 ? (
                    "Sold Out"
                  ) : event.eventStatus !== "UPCOMING" ? (
                    "Event Closed"
                  ) : (
                    <>
                      <UserPlus className="h-5 w-5" />
                      {isFree ? "RSVP for Free" : "Buy Ticket"}
                    </>
                  )}
                </Button>

                <p className="mt-4 text-center text-xs text-gray-500">
                  Terms and conditions apply. Secure payment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsPage;
