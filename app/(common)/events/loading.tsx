import React from "react";

export default function EventsLoading() {
  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-gray-50/50 py-12 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="h-10 w-64 rounded-md bg-gray-200 dark:bg-gray-800 animate-pulse mb-4" />
          <div className="h-6 w-48 rounded bg-gray-200 dark:bg-gray-800 animate-pulse" />
        </div>

        {/* Search Filters Skeleton */}
        <div className="mb-8 h-16 w-full rounded-2xl bg-white dark:bg-gray-900 shadow-sm ring-1 ring-gray-100 dark:ring-gray-800" />

        {/* Grid Skeleton */}
        <div className="relative z-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="group relative flex flex-col items-start justify-between rounded-3xl p-6 shadow-md ring-1 ring-gray-200 dark:ring-gray-800 bg-white dark:bg-gray-900"
            >
              {/* Image */}
              <div className="relative mb-6 aspect-video w-full overflow-hidden rounded-2xl bg-gray-200 dark:bg-gray-800 animate-pulse" />

              {/* Badges */}
              <div className="mb-3 flex w-full items-center gap-x-4 text-xs">
                <div className="h-4 w-24 rounded bg-gray-200 dark:bg-gray-800 animate-pulse" />
                <div className="ml-auto h-6 w-20 rounded-full bg-gray-200 dark:bg-gray-800 animate-pulse" />
              </div>

              {/* Title & Description */}
              <div className="group relative mt-1 w-full">
                <div className="h-6 w-3/4 rounded bg-gray-200 dark:bg-gray-800 animate-pulse mb-3" />
                <div className="h-4 w-full rounded bg-gray-200 dark:bg-gray-800 animate-pulse mb-2" />
                <div className="h-4 w-5/6 rounded bg-gray-200 dark:bg-gray-800 animate-pulse" />
              </div>

              {/* Location & Time */}
              <div className="mt-6 flex w-full flex-col gap-2">
                <div className="h-4 w-1/2 rounded bg-gray-200 dark:bg-gray-800 animate-pulse" />
                <div className="h-4 w-2/3 rounded bg-gray-200 dark:bg-gray-800 animate-pulse" />
              </div>

              {/* Footer */}
              <div className="mt-8 flex w-full items-center justify-between border-t border-gray-100 dark:border-gray-800 pt-6">
                <div className="flex items-center gap-x-3">
                  <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-800 animate-pulse" />
                  <div>
                    <div className="h-4 w-24 rounded bg-gray-200 dark:bg-gray-800 animate-pulse mb-1" />
                    <div className="h-3 w-32 rounded bg-gray-200 dark:bg-gray-800 animate-pulse" />
                  </div>
                </div>
                <div className="h-9 w-24 rounded-md bg-gray-200 dark:bg-gray-800 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
