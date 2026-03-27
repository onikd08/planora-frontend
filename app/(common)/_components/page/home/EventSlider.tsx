"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock } from "lucide-react";
import { Event } from "@/app/(common)/page";
import { Button } from "@/components/ui/button";

/*
Featured: Event title - date - description - Join button
Upcoming: Event title - Date - Organizer - Fee badge (Free / Paid)
*/

const getVisibleCount = (width: number): number => {
  if (width >= 1280) return 3;
  if (width >= 768) return 2;
  return 1;
};

const EventSlider = ({
  events,
  status,
}: {
  events: Event[];
  status: "Featured" | "Upcoming";
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(1024);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const [direction, setDirection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Sync width on hydration
    setWindowWidth(window.innerWidth);

    const handleResize = () => {
      const newWidth = window.innerWidth;
      setWindowWidth(newWidth);

      const oldVisibleCount = getVisibleCount(windowWidth);
      const newVisibleCount = getVisibleCount(newWidth);

      if (oldVisibleCount !== newVisibleCount) {
        const maxIndexForNewWidth = events.length - newVisibleCount;
        if (currentIndex > maxIndexForNewWidth) {
          setCurrentIndex(Math.max(0, maxIndexForNewWidth));
        }
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [windowWidth, currentIndex]);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const startAutoPlay = () => {
      autoPlayRef.current = setInterval(() => {
        const visibleCount = getVisibleCount(windowWidth);
        const maxIndex = events.length - visibleCount;

        if (currentIndex >= maxIndex) {
          setDirection(-1);
          setCurrentIndex((prev) => prev - 1);
        } else if (currentIndex <= 0) {
          setDirection(1);
          setCurrentIndex((prev) => prev + 1);
        } else {
          setCurrentIndex((prev) => prev + direction);
        }
      }, 4000);
    };

    startAutoPlay();

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, currentIndex, windowWidth, direction]);

  const visibleCount = getVisibleCount(windowWidth);
  const maxIndex = events.length - visibleCount;
  const canGoNext = currentIndex < maxIndex;
  const canGoPrev = currentIndex > 0;

  const goNext = () => {
    if (canGoNext) {
      setDirection(1);
      setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
      pauseAutoPlay();
    }
  };

  const goPrev = () => {
    if (canGoPrev) {
      setDirection(-1);
      setCurrentIndex((prev) => Math.max(prev - 1, 0));
      pauseAutoPlay();
    }
  };

  const pauseAutoPlay = () => {
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  const handleDragEnd = (event: any, info: any) => {
    const { offset } = info;
    const swipeThreshold = 30;

    if (offset.x < -swipeThreshold && canGoNext) {
      goNext();
    } else if (offset.x > swipeThreshold && canGoPrev) {
      goPrev();
    }
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    pauseAutoPlay();
  };

  return (
    <div className="overflow-hidden px-4 py-8 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center sm:mb-12 md:mb-16"
        >
          <span className="dark:text-primary-light inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium tracking-wider text-primary uppercase sm:text-sm dark:bg-primary/20">
            {status} Events
          </span>
          <h3 className="dark:from-primary-light mt-3 bg-linear-to-r from-primary to-primary/70 bg-clip-text px-4 text-2xl font-bold text-transparent sm:mt-4 sm:text-3xl md:text-4xl dark:to-primary">
            {status === "Featured" ? "Featured Events" : "Upcoming Events"}
          </h3>
          <div className="dark:from-primary-light mx-auto mt-4 h-1 w-16 bg-linear-to-r from-primary to-primary/70 sm:mt-6 sm:w-24 dark:to-primary"></div>
        </motion.div>

        <div className="relative" ref={containerRef}>
          <div className="right-0 mb-4 flex justify-center space-x-2 sm:absolute sm:-top-16 sm:mb-0 sm:justify-end">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={goPrev}
              disabled={!canGoPrev}
              className={`rounded-full p-2 ${
                canGoPrev
                  ? "dark:text-primary-light bg-white text-primary shadow-md hover:bg-gray-50 dark:bg-gray-300 dark:hover:bg-gray-600"
                  : "cursor-not-allowed bg-gray-100 text-gray-400 dark:bg-gray-800"
              } transition-all duration-300`}
              aria-label="Previous"
            >
              <ChevronLeft size={20} className="h-4 w-4 sm:h-5 sm:w-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={goNext}
              disabled={!canGoNext}
              className={`rounded-full p-2 ${
                canGoNext
                  ? "dark:text-primary-light bg-white text-primary shadow-md hover:bg-gray-50 dark:bg-gray-300 dark:hover:bg-gray-600"
                  : "cursor-not-allowed bg-gray-100 text-gray-400 dark:bg-gray-800"
              } transition-all duration-300`}
              aria-label="Next"
            >
              <ChevronRight size={20} className="h-4 w-4 sm:h-5 sm:w-5" />
            </motion.button>
          </div>

          <div className="relative overflow-hidden px-2 sm:px-0">
            <motion.div
              className="flex"
              animate={{ x: `-${currentIndex * (100 / visibleCount)}%` }}
              transition={{
                type: "spring",
                stiffness: 70,
                damping: 20,
              }}
            >
              {events.map((item) => (
                <motion.div
                  key={item.id}
                  className={`w-full shrink-0 ${
                    visibleCount === 3
                      ? "md:w-1/3"
                      : visibleCount === 2
                        ? "md:w-1/2"
                        : "w-full"
                  } p-2`}
                  initial={{ opacity: 0.5, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={handleDragEnd}
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.98, cursor: "grabbing" }}
                  style={{ cursor: "grab" }}
                >
                  <motion.div
                    className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl transition-all hover:shadow-2xl dark:border-gray-800 dark:bg-gray-900"
                    whileHover={{
                      y: -4,
                    }}
                  >
                    <div className="relative h-48 w-full overflow-hidden bg-linear-to-br from-primary/20 to-primary/40">
                      {item.imageURL ? (
                        <img
                          src={item.imageURL}
                          alt={item.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-primary/40">
                          <CalendarIcon size={48} />
                        </div>
                      )}
                      {status === "Upcoming" && (
                        <div className="absolute top-4 right-4 rounded-full bg-white/95 px-3 py-1 text-sm font-bold text-gray-900 shadow-sm backdrop-blur-sm dark:bg-black/90 dark:text-white">
                          {item.fee === 0 ? "Free" : `$${item.fee}`}
                        </div>
                      )}
                    </div>

                    <div className="relative z-10 flex flex-1 flex-col p-6">
                      <div className="mb-3 flex flex-wrap items-center gap-4 text-sm font-medium text-primary">
                        <div className="flex items-center gap-1.5">
                          <CalendarIcon size={16} />
                          <span>
                            {new Date(item.startTime).toLocaleDateString(
                              undefined,
                              { month: "short", day: "numeric", year: "numeric" }
                            )}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
                          <Clock size={16} />
                          <span>
                            {new Date(item.startTime).toLocaleTimeString(
                              undefined,
                              { hour: "2-digit", minute: "2-digit" }
                            )}
                          </span>
                        </div>
                      </div>

                      <h3 className="mb-3 line-clamp-2 text-xl font-bold leading-tight text-gray-900 dark:text-white">
                        {item.title}
                      </h3>

                      {status === "Featured" ? (
                        <p className="mb-6 line-clamp-3 text-sm text-gray-600 dark:text-gray-300">
                          {item.description}
                        </p>
                      ) : (
                        <div className="mb-6 flex items-center gap-3 rounded-xl bg-gray-50 p-3 dark:bg-gray-800/50">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 font-bold text-primary">
                            {item.creator?.firstName?.[0]}
                            {item.creator?.lastName?.[0]}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Organized by
                            </p>
                            <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">
                              {item.creator?.firstName} {item.creator?.lastName}
                            </p>
                          </div>
                        </div>
                      )}

                      <div className="mt-auto border-t border-gray-100 pt-5 dark:border-gray-800">
                        {status === "Featured" ? (
                          <Button
                            className="w-full bg-primary text-white shadow-md transition-transform hover:-translate-y-0.5"
                            size="lg"
                          >
                            Join Event
                          </Button>
                        ) : (
                          <Button
                            variant="outline"
                            className="w-full border-primary/20 transition-colors hover:bg-primary/5 dark:border-primary/30"
                            size="lg"
                          >
                            View Details
                          </Button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <div className="mt-6 flex justify-center sm:mt-8">
            {Array.from(
              { length: events.length - visibleCount + 1 },
              (_: any, index: any) => (
                <motion.button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className="relative mx-1 focus:outline-none"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={`Go to testimonial ${index + 1}`}
                >
                  <motion.div
                    className={`h-2 w-2 rounded-full ${
                      index === currentIndex
                        ? "dark:bg-primary-light bg-primary"
                        : "bg-gray-300 dark:bg-gray-600"
                    }`}
                    animate={{
                      scale: index === currentIndex ? [1, 1.2, 1] : 1,
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: index === currentIndex ? Infinity : 0,
                      repeatDelay: 1,
                    }}
                  />
                  {index === currentIndex && (
                    <motion.div
                      className="dark:bg-primary-light/30 absolute inset-0 rounded-full bg-primary/30"
                      animate={{
                        scale: [1, 1.8],
                        opacity: [1, 0],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                      }}
                    />
                  )}
                </motion.button>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventSlider;
