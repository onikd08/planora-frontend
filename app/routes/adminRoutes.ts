import { Route } from "./route.interface";

export const adminRoutes: Route[] = [
  {
    title: "Admin",
    items: [
      {
        url: "/admin-dashboard",
        title: "Analytics",
      },
      {
        url: "/admin-dashboard/users",
        title: "Manage Users",
      },
      {
        url: "/admin-dashboard/events",
        title: "All Events",
      },
      {
        url: "/admin-dashboard/categories",
        title: "Manage Categories",
      },
    ],
  },
];
