import EventSlider from "./_components/page/home/EventSlider";
import HeroSection from "./_components/page/home/HeroSection";
import CallToAction from "./_components/page/home/CallToAction";
import EventCategory from "./_components/page/home/EventCategory";
import HowItWorksSection from "./_components/page/home/HowItWorksSection";
import TestimonialSection from "./_components/page/home/TestimonialSection";
import WhyPlanora from "./_components/page/home/WhyPlanora";
import EventSliderSkeleton from "./_components/page/home/EventSliderSkeleton";
import { Suspense } from "react";

export const metadata = {
  title: "Home | Planora",
  description:
    "Planora is a comprehensive event management platform that helps you create, manage, and promote events of all sizes.",
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;
export interface Event {
  id: string;
  title: string;
  description: string;
  imageURL: string | null;
  isDeleted: boolean;
  eventStatus: string;
  startTime: string;
  endTime: string;
  country: string;
  city: string;
  address: string;
  postalCode: string;
  fee: number;
  capacity: number;
  categoryId: string;
  creatorId: string;
  createdAt: string;
  updatedAt: string;
  category: {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
  creator: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    profilePhoto: string | null;
  };
}

const HomePage = async () => {
  const categoriesRes = await fetch(`${API_URL}/event-categories`);
  const eventCategories = await categoriesRes.json();

  return (
    <div>
      <HeroSection />
      <EventCategory categories={eventCategories?.data || []} />
      <HowItWorksSection />
      <Suspense fallback={<EventSliderSkeleton status="Featured" />}>
        <FeaturedEvents />
      </Suspense>
      <Suspense fallback={<EventSliderSkeleton status="Upcoming" />}>
        <UpcomingEvents />
      </Suspense>
      <TestimonialSection />
      <CallToAction />
      <WhyPlanora />
    </div>
  );
};

const FeaturedEvents = async () => {
  const featuredRes = await fetch(`${API_URL}/events?isFeatured=true&page=1&limit=5`);
  const featuredEvents = await featuredRes.json();
  return <EventSlider events={featuredEvents?.data?.data || []} status="Featured" />;
};

const UpcomingEvents = async () => {
  const upcomingRes = await fetch(
    `${API_URL}/events?page=1&limit=9&eventStatus=UPCOMING&sortBy=startTime&sortOrder=asc`
  );
  const upcomingEvents = await upcomingRes.json();
  return <EventSlider events={upcomingEvents?.data?.data || []} status="Upcoming" />;
};

export default HomePage;
