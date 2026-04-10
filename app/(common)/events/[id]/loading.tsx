import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function EventDetailsLoading() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20 dark:bg-gray-950">
      {/* Hero Section Skeleton */}
      <div className="relative h-[40vh] w-full bg-gray-900 md:h-[60vh] overflow-hidden">
        <div className="absolute inset-0 bg-gray-800 animate-pulse" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-gray-900 to-transparent" />

        <div className="absolute inset-0 flex flex-col justify-end">
          <div className="mx-auto w-full max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
            <Link
              href="/events"
              className="mb-6 inline-flex items-center text-sm font-medium text-white/80 transition-colors hover:text-white"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Events
            </Link>

            <div className="mb-4 flex flex-wrap items-center gap-3">
              <div className="h-6 w-24 rounded-full bg-gray-700 animate-pulse" />
              <div className="h-6 w-20 rounded-full bg-gray-700 animate-pulse" />
            </div>

            <div className="mb-4 h-12 w-3/4 max-w-4xl rounded-md bg-gray-700 animate-pulse md:h-16" />
            <div className="h-6 w-2/3 max-w-2xl rounded bg-gray-700 animate-pulse" />
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto -mt-8 mb-12 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Content (Left) Skeleton */}
          <div className="space-y-8 lg:col-span-2">
            <div className="rounded-3xl bg-white p-8 shadow-xl ring-1 ring-gray-100 dark:bg-gray-900 dark:ring-gray-800">
              <div className="mb-6 h-8 w-48 rounded bg-gray-200 dark:bg-gray-800 animate-pulse" />
              <div className="space-y-4">
                <div className="h-4 w-full rounded bg-gray-200 dark:bg-gray-800 animate-pulse" />
                <div className="h-4 w-full rounded bg-gray-200 dark:bg-gray-800 animate-pulse" />
                <div className="h-4 w-5/6 rounded bg-gray-200 dark:bg-gray-800 animate-pulse" />
                <div className="h-4 w-4/6 rounded bg-gray-200 dark:bg-gray-800 animate-pulse" />
              </div>
            </div>

            {/* Organizer Section Skeleton */}
            <div className="rounded-3xl bg-white p-8 shadow-xl ring-1 ring-gray-100 dark:bg-gray-900 dark:ring-gray-800">
              <div className="mb-6 h-6 w-32 rounded bg-gray-200 dark:bg-gray-800 animate-pulse" />
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-gray-200 dark:bg-gray-800 animate-pulse" />
                <div>
                  <div className="mb-2 h-5 w-40 rounded bg-gray-200 dark:bg-gray-800 animate-pulse" />
                  <div className="h-4 w-24 rounded bg-gray-200 dark:bg-gray-800 animate-pulse" />
                </div>
              </div>
            </div>
          </div>

          {/* Sticky Sidebar (Right) Skeleton */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className="rounded-3xl bg-white p-6 shadow-xl ring-1 ring-gray-100 md:p-8 dark:bg-gray-900 dark:ring-gray-800">
                <div className="mb-6 border-b border-gray-100 pb-6 dark:border-gray-800">
                  <div className="mb-2 h-4 w-24 rounded bg-gray-200 dark:bg-gray-800 animate-pulse" />
                  <div className="h-10 w-32 rounded bg-gray-200 dark:bg-gray-800 animate-pulse" />
                </div>

                <div className="mb-8 space-y-6">
                  {/* Info Row 1 */}
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 shrink-0 rounded-lg bg-gray-200 dark:bg-gray-800 animate-pulse" />
                    <div className="w-full space-y-2">
                      <div className="h-4 w-16 rounded bg-gray-200 dark:bg-gray-800 animate-pulse" />
                      <div className="h-4 w-3/4 rounded bg-gray-200 dark:bg-gray-800 animate-pulse" />
                      <div className="h-3 w-1/2 rounded bg-gray-200 dark:bg-gray-800 animate-pulse" />
                    </div>
                  </div>
                  
                  {/* Info Row 2 */}
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 shrink-0 rounded-lg bg-gray-200 dark:bg-gray-800 animate-pulse" />
                    <div className="w-full space-y-2">
                      <div className="h-4 w-20 rounded bg-gray-200 dark:bg-gray-800 animate-pulse" />
                      <div className="h-4 w-full rounded bg-gray-200 dark:bg-gray-800 animate-pulse" />
                      <div className="h-3 w-2/3 rounded bg-gray-200 dark:bg-gray-800 animate-pulse" />
                    </div>
                  </div>

                  {/* Info Row 3 */}
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 shrink-0 rounded-lg bg-gray-200 dark:bg-gray-800 animate-pulse" />
                    <div className="w-full space-y-2">
                      <div className="h-4 w-24 rounded bg-gray-200 dark:bg-gray-800 animate-pulse" />
                      <div className="flex justify-between mt-2">
                        <div className="h-4 w-16 rounded bg-gray-200 dark:bg-gray-800 animate-pulse" />
                        <div className="h-4 w-16 rounded bg-gray-200 dark:bg-gray-800 animate-pulse" />
                      </div>
                      <div className="mt-3 h-2 w-full rounded-full bg-gray-200 dark:bg-gray-800 animate-pulse" />
                    </div>
                  </div>
                </div>

                {/* Button Skeleton */}
                <div className="h-12 w-full rounded-md bg-gray-200 dark:bg-gray-800 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
