import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getMyParticipations = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;
  if (!token) {
    return null;
  }
  try {
    const res = await fetch(`${API_URL}/participations/my-participations`, {
      cache: "no-store",
      headers: {
        Authorization: token,
      },
    });
    if (!res.ok) {
      return {
        success: false,
        message: "Failed to fetch my participations",
        data: null,
      };
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Fetch My Participations Exception:", error);
    return {
      success: false,
      message: "Failed to fetch my participations",
      error: error,
    };
  }
};

export const ParticipationService = {
  getMyParticipations,
};
