"use client";
import { motion } from "framer-motion";
import { ShieldCheck, Zap, Globe, Heart } from "lucide-react";

const WhyPlanora = () => {
  const benefits = [
    {
      title: "Lightning Fast Setup",
      description:
        "Go from idea to live event page in under 60 seconds. Our intuitive editor does the heavy lifting.",
      icon: <Zap className="h-6 w-6 text-blue-500" />,
    },
    {
      title: "Secure by Design",
      description:
        "End-to-end encryption for attendee data and secure payment processing you can trust.",
      icon: <ShieldCheck className="h-6 w-6 text-green-500" />,
    },
    {
      title: "Global Reach",
      description:
        "Multi-currency support and automated time-zone conversion for your international guests.",
      icon: <Globe className="h-6 w-6 text-purple-500" />,
    },
    {
      title: "Community Driven",
      description:
        "Built with feedback from over 500+ event organizers to ensure we solve real-world problems.",
      icon: <Heart className="h-6 w-6 text-red-500" />,
    },
  ];

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Delay between each card appearance
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section className="overflow-hidden bg-white py-24 transition-colors duration-300 dark:bg-slate-950">
      <div className="container mx-auto px-6">
        {/* Header with Fade-in Up */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          <h2 className="mb-3 text-sm font-semibold tracking-wide text-blue-600 uppercase dark:text-blue-400">
            The Planora Advantage
          </h2>
          <p className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl dark:text-white">
            Why choose us for your next event?
          </p>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            We’ve stripped away the complexity of event management so you can
            focus on what matters: the experience.
          </p>
        </motion.div>

        {/* Benefits Grid with Staggered Animation */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4"
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="group relative rounded-2xl border border-slate-100 bg-slate-50 p-8 transition-colors duration-300 hover:border-blue-500 dark:border-slate-800 dark:bg-slate-900/50 dark:hover:border-blue-400"
            >
              {/* Decorative background glow on hover */}
              <div className="absolute inset-0 rounded-2xl bg-blue-500/5 opacity-0 transition-opacity group-hover:opacity-100 dark:bg-blue-400/5" />

              <div className="relative z-10">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-white shadow-sm transition-colors group-hover:bg-blue-50 dark:bg-slate-800 dark:group-hover:bg-slate-700">
                  {benefit.icon}
                </div>
                <h3 className="mb-3 text-xl font-semibold text-slate-900 dark:text-white">
                  {benefit.title}
                </h3>
                <p className="leading-relaxed text-slate-600 dark:text-slate-400">
                  {benefit.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyPlanora;
