import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface IUpdateProfile {
  firstName?: string;
  lastName?: string;
  phone?: string;
  gender?: "MALE" | "FEMALE" | "OTHER";
  profilePhoto?: string;
}

const getAllUsers = async (role?: string) => {
  const url = new URL(`${API_URL}/users`);
  if (role && role !== "ALL") {
    url.searchParams.append("role", role);
  }

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
    const res = await fetch(url.toString(), {
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

const getUserById = async (id: string) => {
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
    const res = await fetch(`${API_URL}/users/${id}`, {
      headers: {
        Authorization: token,
      },
      next: { revalidate: 60, tags: ["users"] },
    });

    if (!res.ok) {
      return {
        success: false,
        message: "Failed to fetch user",
        data: null,
      };
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Fetch User Exception:", error);
    return {
      success: false,
      message: "Failed to fetch user",
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

const getProfile = async () => {
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
    const res = await fetch(`${API_URL}/users/my-profile`, {
      headers: {
        Authorization: token,
      },
      next: { revalidate: 60, tags: ["profile"] },
    });

    if (!res.ok) {
      return {
        success: false,
        message: "Failed to fetch profile",
        data: null,
      };
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Fetch Profile Exception:", error);
    return {
      success: false,
      message: "Failed to fetch profile",
      error: error,
    };
  }
};

const updateProfile = async (payload: IUpdateProfile) => {
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
    const res = await fetch(`${API_URL}/users/update-profile`, {
      method: "PUT",
      headers: {
        Authorization: token!,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      console.error("API Error Response:", {
        status: res.status,
        statusText: res.statusText,
        body: errorData,
      });
      return {
        success: false,
        message: errorData.message || "Response not okay",
        data: null,
      };
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Update Profile Exception:", error);
    return {
      success: false,
      message: "Failed to update profile",
      error: error,
    };
  }
};

const changePasswordService = async (payload: any) => {
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
    const res = await fetch(`${API_URL}/auth/change-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(payload),
    });
    return res.json();
  } catch (error) {
    console.error("Change Password Exception:", error);
    return {
      success: false,
      message: "Failed to change password",
      error: error,
    };
  }
};

const updateUserRole = async (userId: string, role: string) => {
  const cookieStorage = await cookies();
  const token = cookieStorage.get("accessToken")?.value;

  try {
    const res = await fetch(`${API_URL}/users/update-role/${userId}`, {
      method: "PUT",
      headers: {
        Authorization: token!,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ role }),
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Update User Role Exception:", error);
    return {
      success: false,
      message: "Failed to update user role",
      error: error,
    };
  }
};

export const UserService = {
  getAllUsers,
  getUserById,
  updateUserStatus,
  updateUserRole,
  getProfile,
  updateProfile,
  changePasswordService,
};
