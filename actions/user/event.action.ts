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

export const joinEvent = async (payload: any, mode: string) => {
  const result = await EventService.joinEvent(payload, mode);
  updateTag("my-participations");
  return result;
};

export const initiatePayment = async (participationId: string) => {
  const result = await EventService.initiatePayment(participationId);
  return result;
};
