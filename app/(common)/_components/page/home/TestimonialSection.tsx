"use client";

import { motion, Variants } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    body: "Planora made it incredibly easy to find and book tickets to the jazz concert I've been wanting to see. The whole process took less than 2 minutes!",
    author: {
      name: "Sarah Jenkins",
      handle: "@sjenkins",
      imageUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
  {
    body: "As an event organizer, Planora's dashboard is a game-changer. Tracking attendees and managing sales on the go has never been more intuitive.",
    author: {
      name: "Michael Chen",
      handle: "@michael_events",
      imageUrl:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
  {
    body: "I love discovering local tech meetups through this platform. The recommendations are always spot on and the app is gorgeous.",
    author: {
      name: "Emily Rodriguez",
      handle: "@em_tech",
      imageUrl:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
];

// Animation Variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export default function TestimonialSection() {
  return (
    <section className="bg-white py-24 transition-colors duration-200 sm:py-32 dark:bg-slate-900">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header Animation */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-xl text-center"
        >
          <h2 className="text-lg leading-8 font-semibold tracking-tight text-indigo-600 dark:text-indigo-400">
            Testimonials
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            Loved by attendees and organizers alike
          </p>
        </motion.div>

        {/* Testimonials Grid Animation */}
        <motion.div
          className="mx-auto mt-16 flow-root max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.author.handle}
                variants={cardVariants}
                whileHover={{
                  y: -5,
                  transition: { duration: 0.2 },
                }}
                className="group flex flex-col justify-between rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200 transition-all duration-300 hover:shadow-xl hover:ring-indigo-500/30 dark:bg-slate-800 dark:ring-slate-700"
              >
                <div>
                  <div className="mb-4 flex gap-x-1 text-indigo-500">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                      >
                        <Star className="h-5 w-5 fill-current" />
                      </motion.div>
                    ))}
                  </div>
                  <p className="text-base leading-7 text-slate-700 italic dark:text-slate-300">
                    "{testimonial.body}"
                  </p>
                </div>

                <div className="mt-6 border-t border-slate-100 pt-6 dark:border-slate-700">
                  <div className="flex items-center gap-x-4">
                    <motion.img
                      whileHover={{ scale: 1.1 }}
                      className="h-10 w-10 rounded-full bg-slate-50 object-cover ring-2 ring-transparent transition-all group-hover:ring-indigo-500 dark:bg-slate-700"
                      src={testimonial.author.imageUrl}
                      alt={testimonial.author.name}
                    />
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-white">
                        {testimonial.author.name}
                      </div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">
                        {testimonial.author.handle}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
