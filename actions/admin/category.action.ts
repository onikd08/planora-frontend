"use server";

import { updateTag } from "next/cache";
import { CategoryService } from "@/services/admin/category.service";

export const getAllCategories = async () => {
  const data = await CategoryService.getAllCategories();
  return data;
};

export const deleteCategory = async (id: string) => {
  const data = await CategoryService.deleteCategory(id);

  updateTag("categories");
  return data;
};

export const createCategory = async (name: string, icon: string) => {
  const data = await CategoryService.createCategory(name, icon);

  updateTag("categories");
  return data;
};

export const updateCategory = async (
  id: string,
  payload: { name?: string; icon?: string }
) => {
  const data = await CategoryService.updateCategory(id, payload);

  updateTag("categories");
  return data;
};
