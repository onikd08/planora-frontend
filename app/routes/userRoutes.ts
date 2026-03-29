import { Route } from "./route.interface";

export const userRoutes: Route[] = [
  {
    title: "User",
    items: [
      {
        url: "/dashboard",
        title: "Analytics",
      },
      {
        url: "/dashboard/users",
        title: "Manage Users",
      },
      {
        url: "/dashboard/my-events",
        title: "My Events",
      },
      {
        url: "/dashboard/my-participations",
        title: "My Participations",
      },
    ],
  },
];
