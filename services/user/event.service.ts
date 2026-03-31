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

export const EventService = {
  createEvent,
};
