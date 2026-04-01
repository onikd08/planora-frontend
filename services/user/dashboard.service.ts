import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getUserDashboardData = async () => {
  const cookieStorage = await cookies();
  const token = cookieStorage.get("accessToken")?.value;

  if (!token) {
    throw new Error("Unauthorized");
  }
  try {
    const res = await fetch(`${API_URL}/dashboard/user`, {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch user dashboard data");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Failed to fetch user dashboard data",
      error: error,
    };
  }
};
