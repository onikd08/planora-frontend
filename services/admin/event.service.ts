import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getAllEvents = async (params: {
  page?: number;
  limit?: number;
  searchTerm?: string;
  categoryId?: string;
  feeType?: string;
  eventStatus?: string;
  sortBy?: string;
  sortOrder?: string;
}) => {
  const cookieStorage = await cookies();
  const token = cookieStorage.get("accessToken")?.value;

  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (
      value !== undefined &&
      value !== null &&
      value !== "" &&
      value !== "all"
    ) {
      query.set(key, String(value));
    }
  });

  const res = await fetch(`${API_URL}/events?${query.toString()}`, {
    next: { revalidate: 60, tags: ["events"] },
    headers: {
      "Content-Type": "application/json",
      Authorization: token!,
    },
  });
  const data = await res.json();
  return data; // matches backend response shape
};

const toggleFeaturedEvent = async (id: string) => {
  const cookieStorage = await cookies();
  const token = cookieStorage.get("accessToken")?.value;

  try {
    const res = await fetch(`${API_URL}/events/${id}/feature`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token!,
      },
    });
    if (!res.ok) {
      return {
        success: false,
        message: "Failed to updated feature event",
      };
    }
    const { success, message } = await res.json();
    return { success, message };
  } catch (error) {
    return { success: false, message: "Failed to toggle featured event" };
  }
};

export const EventService = {
  getAllEvents,
  toggleFeaturedEvent,
};
