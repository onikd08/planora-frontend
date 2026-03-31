"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, FormSubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Loader2, CalendarPlus, MapPin, DollarSign, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";

import { z } from "zod";
import { createEvent } from "@/actions/user/event.action";

const createEventSchema = z
  .object({
    title: z.string().min(5, "Title must be at least 5 characters").max(100),
    description: z
      .string()
      .min(20, "Description must be at least 20 characters")
      .max(1000),
    imageURL: z
      .url("Invalid image URL")
      .optional()
      .nullable()
      .or(z.literal("")),

    startTime: z.string().min(1, "Start time is required"),
    endTime: z.string().min(1, "End time is required"),
    country: z.string().min(1, "Country is required"),
    city: z.string().min(1, "City is required"),
    address: z.string().min(1, "Address is required"),
    postalCode: z.string().min(1, "Postal code is required"),
    fee: z.coerce.number().min(0, "Fee cannot be negative"),
    capacity: z.coerce.number().int().min(1, "Capacity must be at least 1"),
    categoryId: z.string().min(1, "Please select a category"),
  })
  .refine(
    (data) => {
      const start = new Date(data.startTime).getTime();
      const end = new Date(data.endTime).getTime();
      return end > start;
    },
    {
      message: "End time must be after the start time",
      path: ["endTime"], // This highlights the 'endTime' field in your form
    }
  );

type CreateEventValues = z.infer<typeof createEventSchema>;

interface Category {
  id: string;
  name: string;
}

export function CreateEventForm({ categories }: { categories: Category[] }) {
  const form = useForm<CreateEventValues>({
    resolver: zodResolver(createEventSchema),
    defaultValues: {
      title: "",
      description: "",
      imageURL: "",
      startTime: "",
      endTime: "",
      country: "",
      city: "",
      address: "",
      postalCode: "",
      fee: 0,
      capacity: 1,
      categoryId: "",
    },
  });

  const descriptionValue = form.watch("description");

  const onSubmit: FormSubmitHandler<CreateEventValues> = async (data: any) => {
    let payload = {};
    if (data.imageURL === "") {
      const { imageURL, ...rest } = data;
      payload = rest;
    } else {
      payload = data;
    }
    try {
      const res = await createEvent(payload);
      if (res.success) {
        toast.success("Event created successfully!");
        form.reset();
      } else {
        toast.error(res.message || "Failed to create event");
      }
    } catch (err) {
      toast.error("A network error occurred");
    }
  };

  return (
    <Card className="mx-auto w-full max-w-3xl border-none bg-transparent p-5 shadow-none">
      <CardHeader className="px-0">
        <CardTitle className="text-2xl">Create New Event</CardTitle>
        <CardDescription>
          Host a new experience for your community.
        </CardDescription>
      </CardHeader>
      <CardContent className="px-0">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FieldGroup>
            {/* Title */}
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Event Title</FieldLabel>
                  <Input {...field} placeholder="Summer Music Fest 2026" />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Description with Character Counter */}
            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Description</FieldLabel>
                  <div className="relative">
                    <textarea
                      {...field}
                      rows={4}
                      className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                      placeholder="Tell people what your event is about..."
                    />
                    <span className="absolute right-2 bottom-2 rounded bg-background/80 px-1 text-[10px] text-muted-foreground tabular-nums">
                      {descriptionValue?.length || 0} / 1000
                    </span>
                  </div>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Category Dropdown */}
            <Controller
              name="categoryId"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Category</FieldLabel>
                  <select
                    {...field}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-ring"
                  >
                    <option value="" disabled>
                      Select a category
                    </option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Timings */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Controller
                name="startTime"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Start Time</FieldLabel>
                    <Input {...field} type="datetime-local" />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="endTime"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>End Time</FieldLabel>
                    <Input {...field} type="datetime-local" />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>

            {/* Location Info */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Controller
                name="country"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Country</FieldLabel>
                    <Input {...field} placeholder="USA" />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="city"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>City</FieldLabel>
                    <Input {...field} placeholder="New York" />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>

            <Controller
              name="address"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Full Address</FieldLabel>
                  <Input {...field} placeholder="123 Event Street, Suite 100" />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Contact & Logistics */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <Controller
                name="postalCode"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Postal Code</FieldLabel>
                    <Input {...field} placeholder="1100" />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="fee"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Entry Fee ($)</FieldLabel>
                    <Input {...field} type="number" step="0.01" />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="capacity"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Capacity</FieldLabel>
                    <Input {...field} type="number" />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>

            <Controller
              name="imageURL"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Cover Image URL</FieldLabel>
                  <Input {...field} placeholder="https://unsplash.com..." />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>

          <Button
            type="submit"
            className="h-11 w-full text-base font-semibold transition-all hover:scale-[1.01]"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              <CalendarPlus className="mr-2 h-5 w-5" />
            )}
            Publish Event
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
