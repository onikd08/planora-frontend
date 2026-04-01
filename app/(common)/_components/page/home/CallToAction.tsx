"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { PlusCircle, Search } from "lucide-react";
import Link from "next/link";

export default function CallToAction() {
  return (
    <section className="relative overflow-hidden bg-primary py-24 sm:py-32">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-1/2 left-1/2 -z-10 aspect-1155/678 w-144.5 max-w-none -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-40rem)] sm:w-288.75"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        ></div>
      </div>

      <div className="absolute top-0 right-0 translate-x-1/3 -translate-y-12">
        <div className="h-64 w-64 rounded-full bg-white/10 blur-3xl lg:h-96 lg:w-96" />
      </div>
      <div className="absolute bottom-0 left-0 -translate-x-1/3 translate-y-1/3">
        <div className="h-64 w-64 rounded-full bg-white/10 blur-3xl lg:h-96 lg:w-96" />
      </div>

      <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        <motion.h2
          className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Ready to Make Unforgettable Memories?
        </motion.h2>

        <motion.p
          className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/80 sm:text-xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          Whether you're looking to host the next big event or discover amazing
          experiences near you, Planora has everything you need to get started
          today.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Button
            size="lg"
            className="group flex w-full items-center gap-2 rounded-full bg-white px-8 text-primary shadow-xl hover:bg-gray-100 hover:shadow-2xl sm:w-auto"
          >
            <Link
              href="/dashboard/create-event"
              className="flex items-center gap-2"
            >
              <PlusCircle
                className="transition-transform group-hover:rotate-90"
                size={20}
              />
              Create Event
            </Link>
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="group flex w-full items-center gap-2 rounded-full border-2 border-white/30 bg-white/5 px-8 text-white backdrop-blur-md transition-colors hover:bg-white/20 hover:text-white sm:w-auto"
            asChild
          >
            <Link href="/events">
              <Search
                className="transition-transform group-hover:scale-110"
                size={20}
              />
              Join Events
            </Link>
          </Button>
        </motion.div>

        {/* Floating statistics/badges */}
        <motion.div
          className="mt-16 grid grid-cols-2 gap-4 border-t border-white/10 pt-10 sm:grid-cols-4 sm:gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex flex-col gap-y-2">
            <dt className="text-sm leading-6 text-white/70">Events Hosted</dt>
            <dd className="order-first text-3xl font-semibold tracking-tight text-white">
              10K+
            </dd>
          </div>
          <div className="flex flex-col gap-y-2">
            <dt className="text-sm leading-6 text-white/70">Happy Attendees</dt>
            <dd className="order-first text-3xl font-semibold tracking-tight text-white">
              50K+
            </dd>
          </div>
          <div className="flex flex-col gap-y-2">
            <dt className="text-sm leading-6 text-white/70">Cities Covered</dt>
            <dd className="order-first text-3xl font-semibold tracking-tight text-white">
              120+
            </dd>
          </div>
          <div className="flex flex-col gap-y-2">
            <dt className="text-sm leading-6 text-white/70">Support Rating</dt>
            <dd className="order-first text-3xl font-semibold tracking-tight text-white">
              4.9/5
            </dd>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
