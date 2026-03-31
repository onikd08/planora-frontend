"use server";

import { EventService } from "@/services/user/event.service";

export const createEvent = async (payload: any) => {
  const result = await EventService.createEvent(payload);
  return result;
};
