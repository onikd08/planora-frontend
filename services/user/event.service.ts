import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const createEvent = async (payload: any) => {
  const cookieStorage = await cookies();
  const token = cookieStorage.get("accessToken")?.value;

  try {
    const res = await fetch(`${API_URL}/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token!,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      return {
        success: false,
        message: "Failed to create event",
      };
    }
    const data = await res.json();
    return data;
  } catch (error) {
    return { success: false, message: "Failed to create event" };
  }
};

const getMyEvents = async () => {
  const cookieStorage = await cookies();
  const token = cookieStorage.get("accessToken")?.value;

  if (!token) {
    return {
      success: false,
      message: "Unauthorized",
      data: null,
    };
  }

  try {
    const res = await fetch(`${API_URL}/events/my-created-events`, {
      headers: {
        Authorization: token,
      },
      next: { revalidate: 60, tags: ["my-events"] },
    });

    if (!res.ok) {
      return {
        success: false,
        message: "Failed to fetch my events",
        data: null,
      };
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Fetch My Events Exception:", error);
    return {
      success: false,
      message: "Failed to fetch my events",
      error: error,
    };
  }
};

export const EventService = {
  createEvent,
  getMyEvents,
};
