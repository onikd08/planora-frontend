import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getAdminDashboardData = async () => {
  const cookieStorage = await cookies();
  const token = cookieStorage.get("accessToken")?.value;

  if (!token) {
    throw new Error("Unauthorized");
  }
  const res = await fetch(`${API_URL}/dashboard/admin`, {
    next: { revalidate: 60 },
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch admin dashboard data");
  }
  const data = await res.json();
  return data;
};
