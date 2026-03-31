"use server";

import { EventService } from "@/services/user/event.service";
import { updateTag } from "next/cache";

export const createEvent = async (payload: any) => {
  const result = await EventService.createEvent(payload);
  updateTag("my-events");
  return result;
};

export const getMyEvents = async () => {
  const result = await EventService.getMyEvents();
  return result;
};
