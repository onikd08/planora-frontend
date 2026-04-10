import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getAdminDashboardData = async () => {
  const cookieStorage = await cookies();
  const token = cookieStorage.get("accessToken")?.value;

  if (!token) {
    throw new Error("Unauthorized");
  }
  try {
    const res = await fetch(`${API_URL}/dashboard/admin`, {
      cache: "no-store",
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
  } catch (error) {
    return {
      success: false,
      message: "Failed to fetch admin dashboard data",
      error: error,
    };
  }
};
