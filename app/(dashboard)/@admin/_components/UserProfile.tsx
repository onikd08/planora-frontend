import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Mail, ShieldCheck } from "lucide-react";
import { ProfileUpdateForm } from "./ProfileUpdateForm";
import { ChangePasswordForm } from "./ChangePasswordForm";

export default async function UserProfile({ userData }: { userData: any }) {
  const user = userData.data;
  const initials = `${user.firstName[0]}${user.lastName[0]}`;

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-6">
      {/* 1. EYE-CATCHING HEADER */}
      <Card className="relative overflow-hidden border-none bg-linear-to-r from-primary/10 via-background to-background shadow-lg">
        <div className="absolute top-0 right-0 p-4">
          <Badge
            variant={user.status === "ACTIVE" ? "default" : "destructive"}
            className="tracking-wider uppercase"
          >
            {user.status}
          </Badge>
        </div>

        <CardContent className="flex flex-col items-center gap-6 pt-8 pb-6 md:flex-row">
          <Avatar className="h-24 w-24 border-4 border-background shadow-xl">
            <AvatarImage src={user.profilePhoto} />
            <AvatarFallback className="bg-primary text-2xl text-primary-foreground">
              {initials}
            </AvatarFallback>
          </Avatar>

          <div className="space-y-2 text-center md:text-left">
            <h1 className="text-3xl font-bold text-foreground">
              {user.firstName} {user.lastName}
            </h1>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground md:justify-start">
              <div className="flex items-center gap-1">
                <Mail className="h-4 w-4" /> {user.email}
              </div>
              <div className="flex items-center gap-1">
                <ShieldCheck className="h-4 w-4" /> {user.role}
              </div>
              <div className="flex items-center gap-1">
                <CalendarDays className="h-4 w-4" /> Joined{" "}
                {new Date(user.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 2. UPDATE FORM SECTION */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>
              Update your profile details and contact info.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ProfileUpdateForm user={user} />
          </CardContent>
        </Card>

        {/* STATS / ACTIVITY MINI CARDS */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Events Organized
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{user.events.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Participations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {user.eventParticipations.length}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>Update your password</CardDescription>
        </CardHeader>
        <CardContent>
          <ChangePasswordForm />
        </CardContent>
      </Card>
    </div>
  );
}
