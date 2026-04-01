"use server";

import { getAdminDashboardData } from "@/services/admin/dashboard.service";

export const getAdminDashboardDataAction = async () => {
  const result = await getAdminDashboardData();
  return result;
};
