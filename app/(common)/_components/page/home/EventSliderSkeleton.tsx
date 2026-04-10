export default function EventSliderSkeleton({
  status,
}: {
  status: "Featured" | "Upcoming";
}) {
  return (
    <div className="overflow-hidden px-4 py-8 sm:py-16">
      <div className="mx-auto max-w-6xl">
        {/* Header Skeleton */}
        <div className="mb-8 flex flex-col items-center text-center sm:mb-12 md:mb-16">
          <div className="mb-3 h-6 w-24 animate-pulse rounded-full bg-gray-200 dark:bg-gray-800" />
          <div className="mt-1 h-10 w-48 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
          <div className="mt-4 h-1 w-16 animate-pulse rounded bg-gray-200 sm:mt-6 sm:w-24 dark:bg-gray-800" />
        </div>

        <div className="relative">
          {/* Controls Skeleton */}
          <div className="right-0 mb-4 flex justify-center space-x-2 sm:absolute sm:-top-16 sm:mb-0 sm:justify-end">
            <div className="h-9 w-9 animate-pulse rounded-full bg-gray-200 dark:bg-gray-800" />
            <div className="h-9 w-9 animate-pulse rounded-full bg-gray-200 dark:bg-gray-800" />
          </div>

          <div className="relative overflow-hidden px-2 sm:px-0">
            <div className="flex">
              {/* 3 Skeleton Cards */}
              {[1, 2, 3].map((item) => (
                <div key={item} className="w-full shrink-0 p-2 md:w-1/3">
                  <div className="flex h-[450px] flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
                    {/* Image Placeholder */}
                    <div className="relative h-48 w-full animate-pulse bg-gray-200 dark:bg-gray-800" />

                    {/* Content Placeholder */}
                    <div className="flex flex-1 flex-col p-6">
                      <div className="mb-4 flex gap-4">
                        <div className="h-4 w-20 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
                        <div className="h-4 w-16 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
                      </div>
                      <div className="mb-3 h-6 w-3/4 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
                      <div className="mb-6 h-12 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
                      <div className="mt-auto border-t border-gray-100 pt-5 dark:border-gray-800">
                        <div className="h-12 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
