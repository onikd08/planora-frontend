import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getAllUsers = async () => {
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
    const res = await fetch(`${API_URL}/users`, {
      headers: {
        Authorization: token,
      },
      next: { revalidate: 60, tags: ["users"] },
    });

    if (!res.ok) {
      return {
        success: false,
        message: "Failed to fetch users",
        data: null,
      };
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Fetch Users Exception:", error);
    return {
      success: false,
      message: "Failed to fetch users",
      error: error,
    };
  }
};

const updateUserStatus = async (userId: string) => {
  const cookieStorage = await cookies();
  const token = cookieStorage.get("accessToken")?.value;

  try {
    const res = await fetch(`${API_URL}/users/update-status/${userId}`, {
      method: "PUT",
      headers: {
        Authorization: token!,
      },
    });

    if (!res.ok) {
      return {
        success: false,
        message: "Failed to update user status",
        data: null,
      };
    }
    const data = await res.json();
    return {
      success: true,
      message: "User status updated successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to update user status",
      error: error,
    };
  }
};

const createAdmin = async (payload: any) => {
  const cookieStorage = await cookies();
  const token = cookieStorage.get("accessToken")?.value;

  try {
    const res = await fetch(`${API_URL}/users/create-admin`, {
      method: "POST",
      headers: {
        Authorization: token!,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      return {
        success: false,
        message: "Failed to create admin",
        data: null,
      };
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Create Admin Exception:", error);
    return {
      success: false,
      message: "Failed to create admin",
      error: error,
    };
  }
};

export const UserService = {
  getAllUsers,
  updateUserStatus,
  createAdmin,
};
