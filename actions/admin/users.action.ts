"use server";
import { UserService } from "@/services/admin/user.service";
import { updateTag } from "next/cache";

export const getAllUsers = async () => {
  const result = await UserService.getAllUsers();
  return result;
};

export const updateUserStatus = async (id: string) => {
  const result = await UserService.updateUserStatus(id);
  updateTag("users");
  return result;
};
