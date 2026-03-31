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
        url: "/dashboard/profile",
        title: "Manage Profile",
      },
      {
        url: "/dashboard/my-events",
        title: "My Events",
      },
      {
        url: "/dashboard/my-participations",
        title: "My Participations",
      },
      {
        url: "/dashboard/create-event",
        title: "Create Event",
      },
    ],
  },
];
