"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MoveLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-6 py-24 sm:py-32 lg:px-8 dark:bg-gray-950">
      <motion.div 
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-base font-semibold text-primary">404</p>
        <h1 className="mt-4 text-5xl font-extrabold tracking-tight text-gray-900 sm:text-7xl dark:text-white">
          Page not found
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
          Sorry, we couldn’t find the page you’re looking for. It might have been moved or deleted.
        </p>
        
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button asChild size="lg" className="group">
            <Link href="/">
              <MoveLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Go back home
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/contact" className="gap-2">
              <Search className="h-4 w-4" />
              Contact support
            </Link>
          </Button>
        </div>
      </motion.div>

      <motion.div 
        className="mt-16 w-full max-w-2xl border-t border-gray-200 pt-10 dark:border-gray-800"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="text-sm font-semibold leading-6 text-gray-500 dark:text-gray-400 uppercase tracking-widest text-center">
          Popular pages
        </h2>
        <ul role="list" className="mt-6 flex justify-center gap-x-8 gap-y-4 flex-wrap text-sm leading-6 text-gray-600 dark:text-gray-400">
          <li>
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          </li>
          <li>
            <Link href="/about" className="hover:text-primary transition-colors">About Us</Link>
          </li>
          <li>
            <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
          </li>
          <li>
            <Link href="/login" className="hover:text-primary transition-colors">Sign in</Link>
          </li>
          <li>
            <Link href="/register" className="hover:text-primary transition-colors">Create account</Link>
          </li>
        </ul>
      </motion.div>
    </div>
  );
}
