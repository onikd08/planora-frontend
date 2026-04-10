import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getAllCategories = async () => {
  const cookieStorage = await cookies();
  const token = cookieStorage.get("accessToken")?.value;
  try {
    const res = await fetch(`${API_URL}/event-categories`, {
      next: { revalidate: 60, tags: ["categories"] },
      headers: {
        "Content-Type": "application/json",
        Authorization: token!,
      },
    });
    const data = await res.json();
    if (!res.ok) {
      return {
        success: false,
        message: "Failed to fetch categories",
      };
    }
    return data;
  } catch (error) {
    console.error("Fetch Categories Exception:", error);
    return {
      success: false,
      message: "Failed to fetch categories",
      error: error,
    };
  }
};

const createCategory = async (name: string, icon: string) => {
  const cookieStorage = await cookies();
  const token = cookieStorage.get("accessToken")?.value;
  try {
    const res = await fetch(`${API_URL}/event-categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token!,
      },
      body: JSON.stringify({ name, icon }),
    });
    const data = await res.json();
    if (!res.ok) {
      return {
        success: false,
        message: "Failed to create category",
      };
    }
    return {
      success: true,
      message: "Category created successfully",
    };
  } catch (error) {
    console.error("Create Category Exception:", error);
    return {
      success: false,
      message: "Failed to create category",
      error: error,
    };
  }
};

const updateCategory = async (
  id: string,
  payload: { name?: string; icon?: string }
) => {
  const cookieStorage = await cookies();
  const token = cookieStorage.get("accessToken")?.value;
  try {
    const res = await fetch(`${API_URL}/event-categories/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token!,
      },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) {
      return {
        success: false,
        message: "Failed to update category",
      };
    }
    return {
      success: true,
      message: "Category updated successfully",
    };
  } catch (error) {
    console.error("Update Category Exception:", error);
    return {
      success: false,
      message: "Failed to update category",
      error: error,
    };
  }
};

const deleteCategory = async (id: string) => {
  const cookieStorage = await cookies();
  const token = cookieStorage.get("accessToken")?.value;
  try {
    const res = await fetch(`${API_URL}/event-categories/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token!,
      },
    });
    const data = await res.json();
    if (!res.ok) {
      return {
        success: false,
        message:
          "Failed to delete category, category might be used in an event",
      };
    }
    return {
      success: true,
      message: "Category deleted successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to delete category",
      error: error,
    };
  }
};

export const CategoryService = {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
