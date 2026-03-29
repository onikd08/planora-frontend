import EventSlider from "./_components/page/home/EventSlider";
import HeroSection from "./_components/page/home/HeroSection";
import CallToAction from "./_components/page/home/CallToAction";
import EventCategory from "./_components/page/home/EventCategory";

export const metadata = {
  title: "Home | Planora",
  description:
    "Planora is a comprehensive event management platform that helps you create, manage, and promote events of all sizes.",
};

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
  const [upcomingRes, featuredRes, categoriesRes] = await Promise.all([
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/events?page=1&limit=9&eventStatus=UPCOMING&sortBy=startTime&sortOrder=asc`
    ),
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/events?isFeatured=true&page=1&limit=5`
    ),
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/event-categories`),
  ]);

  const [upcomingEvents, featuredEvents, eventCategories] = await Promise.all([
    upcomingRes.json(),
    featuredRes.json(),
    categoriesRes.json(),
  ]);
  return (
    <div>
      <HeroSection />
      <EventCategory categories={eventCategories?.data || []} />
      <EventSlider
        events={featuredEvents?.data?.data || []}
        status="Featured"
      />
      <EventSlider
        events={upcomingEvents?.data?.data || []}
        status="Upcoming"
      />
      <CallToAction />
    </div>
  );
};

export default HomePage;
