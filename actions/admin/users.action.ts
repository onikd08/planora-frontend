"use server";
import { IUpdateProfile, UserService } from "@/services/admin/user.service";
import { updateTag } from "next/cache";

export const getAllUsers = async (role?: string) => {
  const result = await UserService.getAllUsers(role);
  return result;
};

export const updateUserStatus = async (id: string) => {
  const result = await UserService.updateUserStatus(id);
  updateTag("users");
  return result;
};

export const getProfile = async () => {
  const result = await UserService.getProfile();
  return result;
};

export const updateProfile = async (payload: IUpdateProfile) => {
  const result = await UserService.updateProfile(payload);
  updateTag("profile");
  return result;
};

export const changePasswordAction = async (payload: any) => {
  const result = await UserService.changePasswordService(payload);
  return result;
};

export const updateUserRole = async (userId: string, role: string) => {
  const result = await UserService.updateUserRole(userId, role);
  updateTag("users");
  return result;
};

export const getUserById = async (id: string) => {
  const result = await UserService.getUserById(id);
  return result;
};
