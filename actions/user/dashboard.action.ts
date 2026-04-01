"use server";

import { getUserDashboardData } from "@/services/user/dashboard.service";

export const getUserDashboardDataAction = async () => {
  const result = await getUserDashboardData();
  return result;
};
