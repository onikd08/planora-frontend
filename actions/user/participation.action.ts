"use server";

import { ParticipationService } from "@/services/user/participation.service";

export const getMyParticipations = async () => {
  const result = await ParticipationService.getMyParticipations();
  return result;
};
