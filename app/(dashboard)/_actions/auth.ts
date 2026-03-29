"use server";

import { cookies } from "next/headers";

export const getCurrentUser = async () => {
  const cookieStore = await cookies();
  const userInfo = cookieStore.get("user")?.value;
  if (!userInfo) {
    return null;
  }
  return JSON.parse(userInfo);
};
