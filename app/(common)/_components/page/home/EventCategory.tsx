"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface IEventCategory {
  id: string;
  name: string;
  icon: string;
}

export default function EventCategory({
  categories,
}: {
  categories: IEventCategory[];
}) {
  const [filterType, setFilterType] = useState<"all" | "free" | "paid">("all");
  const [activeCategory, setActiveCategory] = useState<string>(
    categories?.length > 0 ? categories[0].id : ""
  );

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
          {categories.length &&
            categories.map((category) => {
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
                    <div className="absolute -top-3 -right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white shadow-lg">
                      <Check size={16} strokeWidth={3} />
                    </div>
                  )}
                  <div
                    className={`relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl ring-1 transition-transform group-hover:scale-110`}
                  >
                    {category.icon && (
                      <Image
                        src={category.icon}
                        alt={category.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover"
                      />
                    )}
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
        {/* Go to events button */}
        <Button
          asChild
          className="mx-auto mt-12 flex w-1/3 items-center justify-center sm:w-1/4"
        >
          <Link
            href={`/events?categoryId=${activeCategory}&type=${filterType}`}
          >
            View Events <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
