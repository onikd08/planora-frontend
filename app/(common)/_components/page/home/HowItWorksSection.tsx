"use client";

import { motion, Variants } from "framer-motion";
import { Search, CalendarCheck, Ticket } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Discover Events",
    description:
      "Browse through an extensive list of events happening around you, tailored to your interests.",
  },
  {
    icon: CalendarCheck,
    title: "Book & RSVP",
    description:
      "Secure your spot in seconds with our seamless booking and instant confirmation system.",
  },
  {
    icon: Ticket,
    title: "Enjoy the Experience",
    description:
      "Show your digital ticket at the venue and get ready for an unforgettable time.",
  },
];

// 1. Container variant to stagger the children
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3, // Each step appears 0.3s after the previous one
    },
  },
};

// 2. Individual item variant
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function HowItWorksSection() {
  return (
    <section className="overflow-hidden bg-slate-50 py-24 transition-colors duration-200 sm:py-32 dark:bg-slate-900">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Animated Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-base leading-7 font-semibold text-indigo-600 dark:text-indigo-400">
            Simplicity at its best
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            How Planora Works
          </p>
          <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300">
            Getting to your favorite event has never been easier. Follow these
            three simple steps and you're good to go.
          </p>
        </motion.div>

        {/* Animated Steps Grid */}
        <motion.div
          className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }} // Triggers when 100px into view
        >
          <dl className="grid max-w-xl grid-cols-1 gap-x-12 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {steps.map((step) => (
              <motion.div
                key={step.title}
                variants={itemVariants}
                whileHover={{ y: -5 }} // Subtle lift on hover
                className="group flex flex-col items-center text-center"
              >
                {/* Icon Container with a rotating hover effect */}
                <motion.div
                  whileHover={{ rotate: 5, scale: 1.05 }}
                  className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-indigo-500 shadow-lg shadow-indigo-500/20 transition-colors duration-300 group-hover:bg-indigo-600"
                >
                  <step.icon
                    className="h-10 w-10 text-white"
                    aria-hidden="true"
                  />
                </motion.div>

                <dt className="text-xl leading-7 font-semibold text-slate-900 dark:text-white">
                  {step.title}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-slate-600 dark:text-slate-400">
                  <p className="flex-auto leading-relaxed">
                    {step.description}
                  </p>
                </dd>

                {/* Optional: Connecting line logic could go here for desktop, 
                    but for a clean landing page, whitespace is often better. */}
              </motion.div>
            ))}
          </dl>
        </motion.div>
      </div>
    </section>
  );
}
