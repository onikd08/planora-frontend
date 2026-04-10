"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Hexagon, Mail, Lock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { loginAction } from "@/actions/auth/auth.action";
import { User, ShieldCheck } from "lucide-react";

const loginSchema = z.object({
  email: z.email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const LoginComponent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const router = useRouter();

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    // Validate with Zod
    const result = loginSchema.safeParse({ email, password });

    if (!result.success) {
      const newErrors: { email?: string; password?: string } = {};
      result.error.issues.forEach((issue) => {
        const path = issue.path[0] as "email" | "password";
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
      const res = await loginAction(result.data);
      if (res.success) {
        toast.success(res.message);
        router.push("/dashboard");
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };

  const fillDemo = (role: "USER" | "ADMIN") => {
    if (role === "ADMIN") {
      setEmail("admin@planora.com");
      setPassword("admin1234");
      toast.success("Admin credentials applied!", {
        description: "Viewing as: System Administrator",
      });
    } else {
      setEmail("jane@gmail.com");
      setPassword("12345678");
      toast.success("User credentials applied!", {
        description: "Viewing as: Event Attendee",
      });
    }
    setErrors({});
  };
  return (
    <>
      {/* Dynamic Left Side */}
      <div className="relative hidden w-0 flex-1 overflow-hidden lg:block lg:w-1/2">
        <div className="absolute inset-0 bg-linear-to-br from-primary via-primary/80 to-indigo-900" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-30 mix-blend-overlay" />

        <div className="relative z-10 flex h-full flex-col justify-center p-12 text-white lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="text-5xl font-extrabold tracking-tight xl:text-6xl">
              Welcome back to <br /> your event hub.
            </h1>
            <p className="mt-6 max-w-lg text-lg text-white/80 xl:text-xl">
              Thousands of organizers trust Planora to create, manage, and scale
              their events effortlessly. Log in to continue your journey.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Form Right Side */}
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:w-1/2 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="mb-8 lg:hidden">
            <Link href="/" className="flex items-center gap-2 text-primary">
              <Hexagon className="h-8 w-8" />
              <span className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Planora
              </span>
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              Sign in to your account
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="dark:hover:text-primary-light font-semibold text-primary transition-colors hover:text-primary/80"
              >
                Start for free
              </Link>
            </p>
          </motion.div>

          <motion.div
            className="mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            {/* NEW: Multi-Role Demo Switcher */}
            <div className="mb-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="bg-slate-50 px-4 py-2 dark:bg-slate-800/50">
                <span className="text-[10px] font-bold tracking-wider text-slate-500 uppercase">
                  Quick Demo Access
                </span>
              </div>
              <div className="flex divide-x divide-slate-100 dark:divide-slate-800">
                <button
                  type="button"
                  onClick={() => fillDemo("USER")}
                  className="group flex flex-1 flex-col items-center gap-1 py-3 transition-colors hover:bg-primary/5"
                >
                  <User className="h-4 w-4 text-slate-400 group-hover:text-primary" />
                  <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                    User
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => fillDemo("ADMIN")}
                  className="group flex flex-1 flex-col items-center gap-1 py-3 transition-colors hover:bg-primary/5"
                >
                  <ShieldCheck className="h-4 w-4 text-slate-400 group-hover:text-primary" />
                  <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                    Admin
                  </span>
                </button>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
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
                <div className="flex items-center justify-between">
                  <label className="block text-sm leading-6 font-medium text-gray-900 dark:text-gray-200">
                    Password
                  </label>
                  <div className="text-sm leading-6">
                    <Link
                      href="/forget-password"
                      className="dark:hover:text-primary-light font-semibold text-primary hover:text-primary/80"
                    >
                      Forgot password?
                    </Link>
                  </div>
                </div>
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

              <div className="flex items-center gap-3">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary dark:border-gray-700 dark:bg-gray-800"
                />
                <label
                  htmlFor="remember-me"
                  className="block text-sm leading-6 text-gray-900 dark:text-gray-300"
                >
                  Remember me
                </label>
              </div>

              <div>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="group flex w-full justify-center gap-2"
                  size="lg"
                >
                  {isLoading ? "Signing in..." : "Sign in"}
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
    </>
  );
};

export default LoginComponent;
