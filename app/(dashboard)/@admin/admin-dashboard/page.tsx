import {
  Users,
  Calendar,
  DollarSign,
  TrendingUp,
  ArrowUpRight,
  ShieldCheck,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AdminCharts } from "../_components/AdminCharts";
import { getAdminDashboardDataAction } from "@/actions/admin/dashboard.action";

export const metadata = {
  title: "Admin Dashboard",
  description: "Admin Dashboard",
};

export default async function AdminDashboard() {
  // Fetch your data from the API
  const result = await getAdminDashboardDataAction();
  const data = result.data || {};
  return (
    <div className="mx-auto max-w-7xl space-y-8 p-8">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight">
            Admin Console
          </h1>
          <p className="mt-1 text-muted-foreground">
            Real-time platform analytics and overview.
          </p>
        </div>
        <Badge
          variant="outline"
          className="border-primary/20 px-4 py-1 font-mono text-sm text-primary"
        >
          v2.1.0-stable
        </Badge>
      </div>

      {/* --- TOP STATS CARDS --- */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Revenue"
          value={`$${data.revenue.total}`}
          icon={DollarSign}
          trend={`+${data.revenue.growthPercentage}%`}
          sub="vs last month"
        />
        <StatCard
          title="Active Users"
          value={data.users.totalActive}
          icon={Users}
          trend={`${data.users.totalInactive} Banned`}
          sub="Current status"
        />
        <StatCard
          title="Total Events"
          value={data.events.total}
          icon={Calendar}
          trend={`${data.events.participations} Joins`}
          sub="Overall participation"
        />
        <StatCard
          title="Admins"
          value={
            data.users.roles.find((r: any) => r.role === "ADMIN")?._count
              ._all || 0
          }
          icon={ShieldCheck}
          sub="Security & Staff"
        />
      </div>

      {/* --- CHARTS SECTION --- */}
      <AdminCharts data={data} />
    </div>
  );
}

function StatCard({ title, value, icon: Icon, trend, sub }: any) {
  return (
    <Card className="border-none bg-card/50 shadow-md backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="rounded-lg bg-primary/10 p-2">
          <Icon className="h-4 w-4 text-primary" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{value}</div>
        <div className="mt-1 flex items-center gap-1">
          {trend && (
            <span className="flex items-center text-xs font-bold text-emerald-500">
              <TrendingUp className="mr-1 h-3 w-3" /> {trend}
            </span>
          )}
          <span className="text-xs text-muted-foreground">{sub}</span>
        </div>
      </CardContent>
    </Card>
  );
}
