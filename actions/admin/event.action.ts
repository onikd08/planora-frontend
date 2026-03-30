"use server";

import { EventService } from "@/services/admin/event.service";
import { updateTag } from "next/cache";

export const toggleFeaturedEvent = async (id: string) => {
  const data = await EventService.toggleFeaturedEvent(id);
  updateTag("events");
  return data;
};
