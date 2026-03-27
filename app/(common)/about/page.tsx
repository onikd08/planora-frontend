import { Anchor, Shield, Users } from "lucide-react";
import HeroSection from "../_components/page/home/HeroSection";

export const metadata = {
  title: "About Us | Planora",
  description:
    "Learn more about Planora and our mission to simplify event management.",
};

export default function AboutPage() {
  return (
    <div className="bg-white py-16 sm:py-24 dark:bg-black/5">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base leading-7 font-semibold text-primary">
            About Us
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
            Everything you need to host unforgettable events
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
            Planora was founded with a simple mission: to make event management
            as seamless and enjoyable as the events themselves. Whether you're a
            seasoned organizer or hosting your first gathering, our platform is
            designed to give you all the tools you need.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {[
              {
                name: "Community First",
                description:
                  "We believe in the power of bringing people together. Every feature we build is focused on enhancing connection and simplifying coordination.",
                icon: Users,
              },
              {
                name: "Trust & Security",
                description:
                  "Your data and your attendees' data are our top priority. We employ industry-leading security measures to ensure your peace of mind.",
                icon: Shield,
              },
              {
                name: "Reliability",
                description:
                  "When you're running an event, you need tools you can depend on. Planora is built on robust infrastructure that scales with your needs.",
                icon: Anchor,
              },
            ].map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base leading-7 font-semibold text-gray-900 dark:text-white">
                  <feature.icon
                    className="h-5 w-5 flex-none text-primary"
                    aria-hidden="true"
                  />
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-400">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
      <hr className="mx-auto mt-20 mb-5 w-1/3 border-gray-200 dark:border-gray-800" />
      <HeroSection />
    </div>
  );
}
