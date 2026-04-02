import {
  Mail,
  Phone,
  Calendar,
  User as UserIcon,
  Ticket,
  MapPin,
  Shield,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getUserById } from "@/actions/admin/users.action";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "User Details | Planora",
  description: "User Details | Planora",
};

export default async function UserDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data: user } = await getUserById(id);

  const initials = `${user.firstName[0]}${user.lastName[0]}`;

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-6">
      {/* 1. PROFILE HEADER CARD */}
      <Card className="overflow-hidden border-none bg-linear-to-r from-primary/10 via-background to-background shadow-lg">
        <CardContent className="p-8">
          <div className="flex flex-col items-center gap-6 md:flex-row">
            <Avatar className="h-24 w-24 border-4 border-background shadow-xl">
              <AvatarImage src={user.profilePhoto} />
              <AvatarFallback className="bg-primary text-2xl text-primary-foreground">
                {initials}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 space-y-2 text-center md:text-left">
              <div className="flex flex-wrap items-center justify-center gap-3 md:justify-start">
                <h1 className="text-3xl font-bold">
                  {user.firstName} {user.lastName}
                </h1>
                <Badge
                  variant={user.status === "ACTIVE" ? "default" : "destructive"}
                >
                  {user.status}
                </Badge>
              </div>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground md:justify-start">
                <div className="flex items-center gap-1">
                  <Mail className="h-4 w-4" /> {user.email}
                </div>
                <div className="flex items-center gap-1">
                  <Shield className="h-4 w-4" /> {user.role}
                </div>
                <div className="flex items-center gap-1">
                  <UserIcon className="h-4 w-4" />{" "}
                  {user.gender || "Not Specified"}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 2. TABBED CONTENT */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="bg-muted/50 p-1">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="hosted">
            Hosted Events ({user.events.length})
          </TabsTrigger>
          <TabsTrigger value="participations">
            Participations ({user.eventParticipations.length})
          </TabsTrigger>
        </TabsList>

        {/* OVERVIEW TAB */}
        <TabsContent value="overview" className="pt-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <InfoCard
              title="Account Created"
              value={new Date(user.createdAt).toLocaleDateString()}
              icon={Calendar}
            />
            <InfoCard title="Phone" value={user.phone || "N/A"} icon={Phone} />
            <InfoCard
              title="Total Spent"
              value={`$${user.eventParticipations.length * 10}`}
              icon={Ticket}
              description="Est. value"
            />
          </div>
        </TabsContent>

        {/* HOSTED EVENTS TAB */}
        <TabsContent value="hosted" className="pt-4">
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Event Title</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Fee</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {user.events.map((event: any) => (
                  <TableRow key={event.id}>
                    <TableCell className="font-medium">{event.title}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {event.city}, {event.country}
                    </TableCell>
                    <TableCell>
                      {event.fee === 0 ? "Free" : `$${event.fee}`}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{event.eventStatus}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        {/* PARTICIPATIONS TAB */}
        {/* PARTICIPATIONS TAB */}
        <TabsContent value="participations" className="pt-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {user.eventParticipations.length > 0 ? (
              user.eventParticipations.map((p: any) => (
                <Card
                  key={p.id}
                  className="overflow-hidden border-border bg-card/50"
                >
                  <CardHeader className="p-4 pb-2">
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="line-clamp-1 text-base font-bold">
                        {p.event.title}
                      </CardTitle>
                      <Badge
                        variant={
                          p.participationStatus === "CONFIRMED"
                            ? "default"
                            : "outline"
                        }
                        className={
                          p.participationStatus === "CONFIRMED"
                            ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-500"
                            : ""
                        }
                      >
                        {p.participationStatus}
                      </Badge>
                    </div>
                    <Badge
                      variant="secondary"
                      className="w-fit text-[10px] uppercase"
                    >
                      {p.event.category?.name || "Event"}
                    </Badge>
                  </CardHeader>
                  <CardContent className="space-y-3 p-4 pt-0">
                    <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" /> {p.event.city},{" "}
                        {p.event.country}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />{" "}
                        {new Date(p.event.startTime).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="flex items-center justify-between border-t border-border/50 pt-2">
                      <span className="text-xs font-medium text-muted-foreground">
                        Registration Fee
                      </span>
                      <span className="font-bold text-foreground">
                        {p.event.fee === 0 ? "Free" : `$${p.event.fee}`}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full rounded-xl border-2 border-dashed py-12 text-center text-muted-foreground">
                No event participations found for this user.
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function InfoCard({ title, value, icon: Icon, description }: any) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-xl font-bold">{value}</div>
        {description && (
          <p className="mt-1 text-[10px] text-muted-foreground">
            {description}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
