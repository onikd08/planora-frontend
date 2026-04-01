import {
  Calendar,
  DollarSign,
  Users,
  Ticket,
  ArrowUpRight,
  Activity,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getUserDashboardDataAction } from "@/actions/user/dashboard.action";

export default async function UserDashboard() {
  // Replace with your actual API call
  const { data } = (await getUserDashboardDataAction()) || {};

  return (
    <div className="mx-auto max-w-6xl space-y-8 p-6">
      {/* HEADER SECTION */}
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Overview</h1>
          <p className="text-sm text-muted-foreground">
            Welcome back! Here's what's happening with your events.
          </p>
        </div>
        <div className="flex gap-3">
          <Button asChild variant="outline" size="sm">
            <Link href="/events">Explore Events</Link>
          </Button>
          <Button asChild size="sm">
            <Link href="/dashboard/create-event">Host New Event</Link>
          </Button>
        </div>
      </div>

      {/* QUICK STATS - High Level Summary */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Events Hosted"
          value={data.host.eventsHosted}
          icon={Calendar}
          description="Total events organized"
        />
        <StatCard
          title="Revenue Generated"
          value={`$${data.host.revenue}`}
          icon={DollarSign}
          description="Earnings from ticket sales"
          color="text-emerald-500"
        />
        <StatCard
          title="Events Joined"
          value={data.participant.eventsJoined}
          icon={Ticket}
          description="Upcoming & past bookings"
        />
        <StatCard
          title="Total Spent"
          value={`$${data.participant.totalSpent}`}
          icon={Activity}
          description="Investment in experiences"
        />
      </div>

      {/* DETAILED TABS SECTION */}
      <Tabs defaultValue="organizer" className="w-full">
        <TabsList className="mb-8 grid w-full max-w-[400px] grid-cols-2">
          <TabsTrigger value="organizer">As Organizer</TabsTrigger>
          <TabsTrigger value="participant">As Participant</TabsTrigger>
        </TabsList>

        {/* ORGANIZER VIEW */}
        <TabsContent value="organizer" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="bg-gradient-to-br from-primary/5 to-transparent">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Users className="h-5 w-5 text-primary" />
                  Attendee Engagement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">{data.host.attendees}</div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Confirmed participants across all your hosted events.
                </p>
                <Button variant="link" className="mt-4 h-auto px-0" asChild>
                  <Link
                    href="/dashboard/my-events"
                    className="flex items-center gap-1"
                  >
                    Manage your events <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Revenue Summary</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-center py-6">
                {/* You could add a small Bar chart here later */}
                <div className="text-center">
                  <div className="text-5xl font-black text-emerald-500">
                    ${data.host.revenue}
                  </div>
                  <p className="mt-2 text-muted-foreground">
                    Total Net Earnings
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* PARTICIPANT VIEW */}
        <TabsContent value="participant" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Upcoming Experiences</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed py-10 text-center">
                <Ticket className="mb-4 h-10 w-10 text-muted-foreground/40" />
                <p className="font-medium">
                  You have {data.participant.eventsJoined} active participations
                </p>
                <Button variant="outline" size="sm" className="mt-4" asChild>
                  <Link href="/dashboard/my-participations">
                    View My Tickets
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, description, color }: any) {
  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className={`text-2xl font-bold ${color}`}>{value}</div>
        <p className="mt-1 text-[10px] font-medium text-muted-foreground uppercase">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
