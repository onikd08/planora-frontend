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

const joinEvent = async (payload: any, mode: string) => {
  const cookieStorage = await cookies();
  const token = cookieStorage.get("accessToken")?.value;

  const endpoint =
    mode === "immediate"
      ? `${API_URL}/participations/join`
      : `${API_URL}/participations/join-with-pay-later`;

  if (!token) {
    return {
      success: false,
      message: "Unauthorized",
      data: null,
    };
  }

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      return {
        success: false,
        message: "Failed to join event",
      };
    }
    const data = await res.json();
    return data;
  } catch (error) {
    return { success: false, message: "Failed to join event" };
  }
};

const initiatePayment = async (participationId: string) => {
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
    const res = await fetch(
      `${API_URL}/participations/initiate-payment/${participationId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );

    if (!res.ok) {
      return {
        success: false,
        message: "Failed to initiate payment",
      };
    }
    const data = await res.json();
    return data;
  } catch (error) {
    return { success: false, message: "Failed to initiate payment" };
  }
};

export const EventService = {
  createEvent,
  getMyEvents,
  joinEvent,
  initiatePayment,
};
