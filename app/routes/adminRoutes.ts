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
        url: "/admin-dashboard/user-management",
        title: "Manage Users",
      },
      {
        url: "/admin-dashboard/event-management",
        title: "Manage Events",
      },
      {
        url: "/admin-dashboard/category-management",
        title: "Manage Categories",
      },
    ],
  },
];
