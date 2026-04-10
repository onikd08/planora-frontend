import ShuffleGrid from "@/components/ui/suffle-grid";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="mx-auto grid min-h-[70vh] w-full max-w-6xl grid-cols-1 items-center gap-8 px-8 py-12 md:grid-cols-2">
      <div>
        <span className="mb-4 block text-xs font-medium text-indigo-500 md:text-sm">
          Feel the energy. Live the moment.
        </span>

        <h3 className="text-4xl font-semibold md:text-6xl">
          Discover events that move you
        </h3>

        <p className="my-4 text-base text-slate-700 md:my-6 md:text-lg">
          From electrifying concerts to thrilling sports and unforgettable
          festivals, find the hottest events happening near you. Grab your
          tickets and be part of the action.
        </p>

        <Link
          href="/events"
          className="rounded bg-indigo-500 px-4 py-2 font-medium text-white transition-all hover:bg-indigo-600 active:scale-95"
        >
          Explore Events
        </Link>
      </div>

      <ShuffleGrid />
    </section>
  );
};

export default HeroSection;
