"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Music,
  Laptop,
  Trophy,
  Palette,
  Coffee,
  Briefcase,
  Check,
} from "lucide-react";

const categories = [
  {
    id: "music",
    name: "Music",
    icon: Music,
    color:
      "bg-blue-500/10 text-blue-500 ring-blue-500/20 dark:bg-blue-50/10 dark:text-blue-400",
  },
  {
    id: "tech",
    name: "Tech",
    icon: Laptop,
    color:
      "bg-indigo-500/10 text-indigo-500 ring-indigo-500/20 dark:bg-indigo-50/10 dark:text-indigo-400",
  },
  {
    id: "sports",
    name: "Sports",
    icon: Trophy,
    color:
      "bg-orange-500/10 text-orange-500 ring-orange-500/20 dark:bg-orange-50/10 dark:text-orange-400",
  },
  {
    id: "arts",
    name: "Arts",
    icon: Palette,
    color:
      "bg-pink-500/10 text-pink-500 ring-pink-500/20 dark:bg-pink-50/10 dark:text-pink-400",
  },
  {
    id: "food",
    name: "Food & Drink",
    icon: Coffee,
    color:
      "bg-amber-500/10 text-amber-500 ring-amber-500/20 dark:bg-amber-50/10 dark:text-amber-400",
  },
  {
    id: "business",
    name: "Business",
    icon: Briefcase,
    color:
      "bg-emerald-500/10 text-emerald-500 ring-emerald-500/20 dark:bg-emerald-50/10 dark:text-emerald-400",
  },
];

export default function EventCategory() {
  const [filterType, setFilterType] = useState<"all" | "free" | "paid">("all");
  const [activeCategory, setActiveCategory] = useState<string>("music");

  return (
    <section className="bg-gray-50/50 py-16 sm:py-24 dark:bg-gray-900/50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row sm:items-end">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl text-center sm:text-left"
          >
            <span className="mb-2 block text-sm font-semibold tracking-wider text-primary uppercase">
              Discover
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
              Explore by Category
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              Find exactly what you're looking for. Filter by event type, price,
              and discover amazing experiences near you.
            </p>
          </motion.div>

          {/* Free / Paid Filter Toggle */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center rounded-full bg-white p-1.5 shadow-sm ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700"
          >
            {(["all", "free", "paid"] as const).map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`relative rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                  filterType === type
                    ? "text-primary dark:text-white"
                    : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                }`}
              >
                {filterType === type && (
                  <motion.div
                    layoutId="active-filter"
                    className="absolute inset-0 rounded-full bg-primary/10 dark:bg-primary/30"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10 capitalize">{type}</span>
              </button>
            ))}
          </motion.div>
        </div>

        {/* Category Grid */}
        <motion.div
          className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = activeCategory === category.id;

            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`group relative flex flex-col items-center gap-4 rounded-3xl p-6 transition-all duration-300 ${
                  isActive
                    ? "bg-white shadow-xl ring-2 ring-primary dark:bg-gray-800 dark:ring-primary"
                    : "bg-white shadow-sm ring-1 ring-gray-100 hover:-translate-y-1 hover:shadow-md dark:bg-gray-800/80 dark:ring-gray-800 dark:hover:bg-gray-800"
                }`}
              >
                {isActive && (
                  <div className="absolute -top-3 -right-3 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white shadow-lg">
                    <Check size={16} strokeWidth={3} />
                  </div>
                )}
                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-2xl ring-1 transition-transform group-hover:scale-110 ${category.color}`}
                >
                  <Icon size={32} strokeWidth={1.5} />
                </div>
                <div className="text-center">
                  <h3
                    className={`font-semibold ${
                      isActive
                        ? "text-primary dark:text-white"
                        : "text-gray-900 dark:text-gray-100"
                    }`}
                  >
                    {category.name}
                  </h3>
                </div>
              </button>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
