"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, Filter, SortDesc, Tag } from "lucide-react";

interface Category {
  id: string;
  name: string;
}

export default function SearchFilters({
  categories,
}: {
  categories: Category[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("searchTerm") || ""
  );
  const [categoryId, setCategoryId] = useState(
    searchParams.get("categoryId") || "all"
  );
  const [feeType, setFeeType] = useState(searchParams.get("type") || "all");
  const [eventStatus, setEventStatus] = useState(
    searchParams.get("eventStatus") || "all"
  );
  const [sortBy, setSortBy] = useState(
    searchParams.get("sortBy") || "createdAt"
  );
  const [sortOrder, setSortOrder] = useState(
    searchParams.get("sortOrder") || "desc"
  );

  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

  // Sync state when URL is gracefully cleared (e.g. from "Clear Filters" or empty state)
  useEffect(() => {
    const hasAnyFilter =
      searchParams.has("searchTerm") ||
      searchParams.has("categoryId") ||
      (searchParams.has("type") && searchParams.get("type") !== "all") ||
      (searchParams.has("eventStatus") &&
        searchParams.get("eventStatus") !== "all") ||
      (searchParams.has("sortBy") &&
        searchParams.get("sortBy") !== "createdAt") ||
      (searchParams.has("sortOrder") &&
        searchParams.get("sortOrder") !== "desc");

    if (!hasAnyFilter) {
      setSearchTerm("");
      setDebouncedSearchTerm("");
      setCategoryId("all");
      setFeeType("all");
      setEventStatus("all");
      setSortBy("createdAt");
      setSortOrder("desc");
    }
  }, [searchParams]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (debouncedSearchTerm) params.set("searchTerm", debouncedSearchTerm);
    else params.delete("searchTerm");

    if (categoryId !== "all") params.set("categoryId", categoryId);
    else params.delete("categoryId");

    if (feeType !== "all") params.set("type", feeType);
    else params.delete("type");

    if (eventStatus !== "all") params.set("eventStatus", eventStatus);
    else params.delete("eventStatus");

    if (sortBy !== "createdAt") params.set("sortBy", sortBy);
    else params.delete("sortBy");

    if (sortOrder !== "desc") params.set("sortOrder", sortOrder);
    else params.delete("sortOrder");

    // Reset to page 1 on filter changes to prevent empty pages
    params.set("page", "1");

    router.push(`/events?${params.toString()}`);
  }, [
    debouncedSearchTerm,
    categoryId,
    feeType,
    eventStatus,
    sortBy,
    sortOrder,
  ]); // omit searchParams and router

  return (
    <div className="mb-8 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gray-200 dark:bg-gray-900 dark:ring-gray-800">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-sm font-bold tracking-wider text-gray-900 uppercase dark:text-white">
          Search & Filter
        </h3>
        <button
          onClick={() => router.push("/events")}
          className="text-xs font-semibold text-primary transition-all hover:underline dark:text-blue-600"
        >
          Reset Filters
        </button>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {/* Search */}
        <div className="relative">
          <label className="mb-2 block text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
            Search
          </label>
          <div className="relative">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search events, organizers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border-0 bg-gray-50/50 py-2.5 pr-4 pl-10 text-sm text-gray-900 ring-1 ring-gray-300 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-primary focus:ring-inset dark:bg-gray-800 dark:text-white dark:ring-gray-700"
            />
          </div>
        </div>

        {/* Category */}
        <div className="relative">
          <label className="mb-2 block text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
            Category
          </label>
          <div className="relative">
            <Tag className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full appearance-none rounded-xl border-0 bg-gray-50/50 py-2.5 pr-8 pl-10 text-sm text-gray-900 ring-1 ring-gray-300 ring-inset focus:ring-2 focus:ring-primary focus:ring-inset dark:bg-gray-800 dark:text-white dark:ring-gray-700"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Price/Type Option */}
        <div className="relative">
          <label className="mb-2 block text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
            Pricing
          </label>
          <div className="relative">
            <Filter className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <select
              value={feeType}
              onChange={(e) => setFeeType(e.target.value)}
              className="w-full appearance-none rounded-xl border-0 bg-gray-50/50 py-2.5 pr-8 pl-10 text-sm text-gray-900 ring-1 ring-gray-300 ring-inset focus:ring-2 focus:ring-primary focus:ring-inset dark:bg-gray-800 dark:text-white dark:ring-gray-700"
            >
              <option value="all">All Prices</option>
              <option value="free">Free</option>
              <option value="paid">Paid</option>
            </select>
          </div>
        </div>

        {/* Status Option */}
        <div className="relative">
          <label className="mb-2 block text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
            Status
          </label>
          <select
            value={eventStatus}
            onChange={(e) => setEventStatus(e.target.value)}
            className="w-full appearance-none rounded-xl border-0 bg-gray-50/50 px-4 py-2.5 text-sm text-gray-900 ring-1 ring-gray-300 ring-inset focus:ring-2 focus:ring-primary focus:ring-inset dark:bg-gray-800 dark:text-white dark:ring-gray-700"
          >
            <option value="all">All</option>
            <option value="UPCOMING">Upcoming</option>
            <option value="ONGOING">Ongoing</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>

        {/* Sort By */}
        <div className="relative">
          <label className="mb-2 block text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
            Sort By
          </label>
          <div className="relative">
            <SortDesc className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full appearance-none rounded-xl border-0 bg-gray-50/50 py-2.5 pr-8 pl-10 text-sm text-gray-900 ring-1 ring-gray-300 ring-inset focus:ring-2 focus:ring-primary focus:ring-inset dark:bg-gray-800 dark:text-white dark:ring-gray-700"
            >
              <option value="createdAt">Date added</option>
              <option value="startTime">Event Date</option>
              <option value="fee">Price</option>
              <option value="title">Alphabetical</option>
            </select>
          </div>
        </div>

        {/* Sort Order */}
        <div className="relative">
          <label className="mb-2 block text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
            Order
          </label>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="w-full cursor-pointer appearance-none rounded-xl border-0 bg-gray-50/50 px-4 py-2.5 text-center text-sm text-gray-900 ring-1 ring-gray-300 ring-inset focus:ring-2 focus:ring-primary focus:ring-inset dark:bg-gray-800 dark:text-white dark:ring-gray-700"
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </div>
      </div>
    </div>
  );
}
