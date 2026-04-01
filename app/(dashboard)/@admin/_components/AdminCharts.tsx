"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function AdminCharts({ data }: { data: any }) {
  // Format Category Data for Pie Chart
  const categoryData = data.events.categories.map((cat: any) => ({
    name: cat.name,
    value: cat._count.events,
  }));

  // Format Role Data for Bar Chart
  const roleData = data.users.roles.map((r: any) => ({
    name: r.role,
    count: r._count._all,
  }));

  const COLORS = [
    "#3b82f6",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
    "#ec4899",
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* CATEGORY DISTRIBUTION */}
      <Card className="col-span-1 shadow-xl">
        <CardHeader>
          <CardTitle className="text-lg">Event Categories</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {categoryData.map((_: any, index: number) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  borderRadius: "8px",
                  border: "none",
                  boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                }}
              />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* ROLE BREAKDOWN */}
      <Card className="col-span-1 shadow-xl">
        <CardHeader>
          <CardTitle className="text-lg">User Role Distribution</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px] pr-6">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={roleData}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                opacity={0.1}
              />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
              />
              <Tooltip
                cursor={{ fill: "rgba(59, 130, 246, 0.1)" }}
                contentStyle={{ borderRadius: "8px" }}
              />
              <Bar
                dataKey="count"
                fill="#3b82f6"
                radius={[4, 4, 0, 0]}
                barSize={40}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
