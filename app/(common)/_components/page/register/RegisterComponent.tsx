"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Hexagon,
  Mail,
  Lock,
  User,
  ArrowRight,
  Phone,
  Image as ImageIcon,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { registerAction } from "@/actions/auth/auth.action";

const registerSchema = z
  .object({
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Confirm password must be at least 6 characters"),
    gender: z.enum(["MALE", "FEMALE", "OTHER"]).optional(),
    profilePhoto: z.string().url("Please enter a valid URL").optional(),
    phone: z
      .string()
      .min(11, "Phone number must be at least 11 characters")
      .optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const RegisterComponent = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");
  const [errors, setErrors] = useState<{
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    gender?: string;
    phone?: string;
    profilePhoto?: string;
  }>({});

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    // Validate with Zod
    const result = registerSchema.safeParse({
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      gender: gender || undefined,
      phone: phone || undefined,
      profilePhoto: profilePhoto || undefined,
    });

    if (!result.success) {
      const newErrors: {
        firstName?: string;
        lastName?: string;
        email?: string;
        password?: string;
        confirmPassword?: string;
        gender?: string;
        phone?: string;
        profilePhoto?: string;
      } = {};

      result.error.issues.forEach((issue) => {
        const path = issue.path[0] as keyof typeof newErrors;
        if (path && !newErrors[path]) {
          newErrors[path] = issue.message;
        }
      });

      setErrors(newErrors);
      return;
    }

    // Clear errors if successful
    setErrors({});
    setIsLoading(true);

    try {
      const payload = {
        firstName,
        lastName,
        email,
        password,
        phone: phone || undefined,
        gender: gender || undefined,
        profilePhoto: profilePhoto || undefined,
      };

      const res = await registerAction(payload);

      if (res.success) {
        toast.success(res.message);
        router.push("/login");
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      {/* Form Left Side */}
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:w-1/2 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-[420px]">
          <div className="mb-8 lg:hidden">
            <Link href="/" className="flex items-center gap-2 text-primary">
              <Hexagon className="h-8 w-8" />
              <span className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Planora
              </span>
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              Create an account
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{" "}
              <Link
                href="/login"
                className="dark:hover:text-primary-light font-semibold text-primary transition-colors hover:text-primary/80"
              >
                Sign in instead
              </Link>
            </p>
          </motion.div>

          <motion.div
            className="mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm leading-6 font-medium text-gray-900 dark:text-gray-200">
                    First Name
                  </label>
                  <div className="relative mt-2">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => {
                        setFirstName(e.target.value);
                        if (errors.firstName)
                          setErrors((prev) => ({
                            ...prev,
                            firstName: undefined,
                          }));
                      }}
                      className={`block w-full rounded-xl border-0 bg-gray-50/50 py-2.5 pl-10 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 dark:bg-gray-800 dark:text-white ${errors.firstName ? "ring-red-500 focus:ring-red-500 dark:ring-red-500/50" : "ring-gray-300 focus:ring-primary dark:ring-gray-700"}`}
                      placeholder="Jane"
                    />
                  </div>
                  {errors.firstName && (
                    <p className="mt-1.5 text-xs text-red-500">
                      {errors.firstName}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm leading-6 font-medium text-gray-900 dark:text-gray-200">
                    Last Name
                  </label>
                  <div className="relative mt-2">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => {
                        setLastName(e.target.value);
                        if (errors.lastName)
                          setErrors((prev) => ({
                            ...prev,
                            lastName: undefined,
                          }));
                      }}
                      className={`block w-full rounded-xl border-0 bg-gray-50/50 py-2.5 pl-10 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 dark:bg-gray-800 dark:text-white ${errors.lastName ? "ring-red-500 focus:ring-red-500 dark:ring-red-500/50" : "ring-gray-300 focus:ring-primary dark:ring-gray-700"}`}
                      placeholder="Doe"
                    />
                  </div>
                  {errors.lastName && (
                    <p className="mt-1.5 text-xs text-red-500">
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm leading-6 font-medium text-gray-900 dark:text-gray-200">
                    Phone Number
                  </label>
                  <div className="relative mt-2">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <Phone className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        if (errors.phone)
                          setErrors((prev) => ({ ...prev, phone: undefined }));
                      }}
                      className={`block w-full rounded-xl border-0 bg-gray-50/50 py-2.5 pl-10 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 dark:bg-gray-800 dark:text-white ${errors.phone ? "ring-red-500 focus:ring-red-500 dark:ring-red-500/50" : "ring-gray-300 focus:ring-primary dark:ring-gray-700"}`}
                      placeholder="01xxxxxxxxx"
                    />
                  </div>
                  {errors.phone && (
                    <p className="mt-1.5 text-xs text-red-500">
                      {errors.phone}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm leading-6 font-medium text-gray-900 dark:text-gray-200">
                    Gender
                  </label>
                  <div className="relative mt-2">
                    <select
                      value={gender}
                      onChange={(e) => {
                        setGender(e.target.value);
                        if (errors.gender)
                          setErrors((prev) => ({ ...prev, gender: undefined }));
                      }}
                      className={`block w-full rounded-xl border-0 bg-gray-50/50 px-4 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 dark:bg-gray-800 dark:text-white ${errors.gender ? "ring-red-500 focus:ring-red-500 dark:ring-red-500/50" : "ring-gray-300 focus:ring-primary dark:ring-gray-700"}`}
                    >
                      <option value="">Select gender</option>
                      <option value="MALE">Male</option>
                      <option value="FEMALE">Female</option>
                      <option value="OTHER">Other</option>
                    </select>
                  </div>
                  {errors.gender && (
                    <p className="mt-1.5 text-xs text-red-500">
                      {errors.gender}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm leading-6 font-medium text-gray-900 dark:text-gray-200">
                  Profile Photo URL
                </label>
                <div className="relative mt-2">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <ImageIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="url"
                    value={profilePhoto}
                    onChange={(e) => {
                      setProfilePhoto(e.target.value);
                      if (errors.profilePhoto)
                        setErrors((prev) => ({
                          ...prev,
                          profilePhoto: undefined,
                        }));
                    }}
                    className={`block w-full rounded-xl border-0 bg-gray-50/50 py-2.5 pl-10 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 dark:bg-gray-800 dark:text-white ${errors.profilePhoto ? "ring-red-500 focus:ring-red-500 dark:ring-red-500/50" : "ring-gray-300 focus:ring-primary dark:ring-gray-700"}`}
                    placeholder="https://example.com/photo.jpg"
                  />
                </div>
                {errors.profilePhoto && (
                  <p className="mt-1.5 text-xs text-red-500">
                    {errors.profilePhoto}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm leading-6 font-medium text-gray-900 dark:text-gray-200">
                  Email address
                </label>
                <div className="relative mt-2">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email)
                        setErrors((prev) => ({ ...prev, email: undefined }));
                    }}
                    className={`block w-full rounded-xl border-0 bg-gray-50/50 py-2.5 pl-10 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 dark:bg-gray-800 dark:text-white ${errors.email ? "ring-red-500 focus:ring-red-500 dark:ring-red-500/50" : "ring-gray-300 focus:ring-primary dark:ring-gray-700"}`}
                    placeholder="you@example.com"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1.5 text-xs text-red-500">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm leading-6 font-medium text-gray-900 dark:text-gray-200">
                  Password
                </label>
                <div className="relative mt-2">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password)
                        setErrors((prev) => ({ ...prev, password: undefined }));
                    }}
                    className={`block w-full rounded-xl border-0 bg-gray-50/50 py-2.5 pl-10 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 dark:bg-gray-800 dark:text-white ${errors.password ? "ring-red-500 focus:ring-red-500 dark:ring-red-500/50" : "ring-gray-300 focus:ring-primary dark:ring-gray-700"}`}
                    placeholder="••••••••"
                  />
                </div>
                {errors.password && (
                  <p className="mt-1.5 text-xs text-red-500">
                    {errors.password}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm leading-6 font-medium text-gray-900 dark:text-gray-200">
                  Confirm Password
                </label>
                <div className="relative mt-2">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      if (errors.confirmPassword)
                        setErrors((prev) => ({
                          ...prev,
                          confirmPassword: undefined,
                        }));
                    }}
                    className={`block w-full rounded-xl border-0 bg-gray-50/50 py-2.5 pl-10 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 dark:bg-gray-800 dark:text-white ${errors.confirmPassword ? "ring-red-500 focus:ring-red-500 dark:ring-red-500/50" : "ring-gray-300 focus:ring-primary dark:ring-gray-700"}`}
                    placeholder="••••••••"
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1.5 text-xs text-red-500">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              <div>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="group flex w-full justify-center gap-2"
                  size="lg"
                >
                  {isLoading ? "Creating account..." : "Create account"}
                  {!isLoading && (
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  )}
                </Button>
              </div>
            </form>

            <div className="mt-10">
              <div className="relative">
                <div
                  className="absolute inset-0 flex items-center"
                  aria-hidden="true"
                ></div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Dynamic Right Side */}
      <div className="relative hidden w-0 flex-1 overflow-hidden lg:block lg:w-1/2">
        <div className="absolute inset-0 bg-linear-to-bl from-indigo-900 via-primary/80 to-primary" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1505236858219-8359eb29e325?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-30 mix-blend-overlay" />

        <div className="relative z-10 flex h-full flex-col justify-center p-12 text-white lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-right"
          >
            <h1 className="text-5xl font-extrabold tracking-tight xl:text-6xl">
              Start building <br /> lasting memories.
            </h1>
            <p className="mt-6 ml-auto max-w-lg text-lg text-white/80 xl:text-xl">
              Join the growing community of event creators and attendees. Secure
              your tickets, host your friends, and manage it all in one
              platform.
            </p>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default RegisterComponent;
