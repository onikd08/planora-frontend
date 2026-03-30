"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { Loader2, Save } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { updateProfile } from "@/actions/admin/users.action";

// 1. Zod Schema
const GENDER_ENUM = z.enum(["MALE", "FEMALE", "OTHER"]);
const profileSchema = z.object({
  firstName: z.string().min(2, "First name is too short"),
  lastName: z.string().min(2, "Last name is too short"),
  phone: z
    .string()
    .length(11, "Phone number must be exactly 11 digits")
    .regex(/^[0-9]+$/, "Phone number must only contain digits")
    .optional()
    .nullable()
    .or(z.literal("")),
  gender: GENDER_ENUM.optional().nullable(),
  profilePhoto: z.url("Invalid image URL").optional().or(z.literal("")),
});

type ProfileValues = z.infer<typeof profileSchema>;

export function ProfileUpdateForm({ user }: { user: any }) {
  const form = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      phone: user.phone || "",
      gender: (user.gender as any) || undefined,
      profilePhoto: user.profilePhoto || "",
    },
  });

  // Watch photo for live preview
  const photoUrl = form.watch("profilePhoto");

  async function onSubmit(data: ProfileValues) {
    try {
      // Convert empty strings to undefined for the API
      const payload = Object.fromEntries(
        Object.entries(data).map(([k, v]) => [k, v === "" ? undefined : v])
      );

      const res = await updateProfile(payload as any);

      if (res.success) {
        toast.success("Profile updated successfully");
      } else {
        toast.error(res.message || "Failed to update");
      }
    } catch (err) {
      toast.error("An unexpected error occurred");
    }
  }

  return (
    <form id="profile-form" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        {/* Photo Preview Section */}
        <div className="mb-4 flex items-center gap-4 rounded-lg border border-dashed bg-muted/20 p-4">
          <Avatar className="h-16 w-16 border">
            <AvatarImage src={photoUrl || ""} />
            <AvatarFallback>{user.firstName[0]}</AvatarFallback>
          </Avatar>
          <Controller
            name="profilePhoto"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field className="flex-1" data-invalid={fieldState.invalid}>
                <FieldLabel>Profile Photo URL</FieldLabel>
                <Input {...field} placeholder="https://..." />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Controller
            name="firstName"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>First Name</FieldLabel>
                <Input {...field} placeholder="Super" />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="lastName"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Last Name</FieldLabel>
                <Input {...field} placeholder="Admin" />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Controller
            name="phone"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Phone Number</FieldLabel>
                <Input
                  {...field}
                  // Convert null to an empty string for the HTML input
                  value={field.value ?? ""}
                  placeholder="01XXXXXXXXX"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="gender"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Gender</FieldLabel>
                <select
                  {...field}
                  value={field.value || ""}
                  className="flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
                >
                  <option value="">Select Gender</option>
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                  <option value="OTHER">Other</option>
                </select>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>
      </FieldGroup>

      <div className="mt-6">
        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="w-full gap-2 md:w-auto"
        >
          {form.formState.isSubmitting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          Save Changes
        </Button>
      </div>
    </form>
  );
}
