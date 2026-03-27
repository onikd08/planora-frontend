import EventSlider from "./_components/page/home/EventSlider";
import HeroSection from "./_components/page/home/HeroSection";
import CallToAction from "./_components/page/home/CallToAction";
import EventCategory from "./_components/page/home/EventCategory";

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

const HomePage = () => {
  const events: Event[] = [
    {
      id: "deafa1b1-1589-481a-b440-87d8705c3c17",
      title: "Automated Postman Event",
      description: "An event created by the automated postman collection flow",
      imageURL: null,
      isDeleted: false,
      eventStatus: "UPCOMING",
      startTime: "2026-12-01T10:00:00.794Z",
      endTime: "2026-12-01T12:00:00.794Z",
      country: "USA",
      city: "New York",
      address: "123 Tech Lane",
      postalCode: "10001",
      fee: 50,
      capacity: 100,
      categoryId: "20785a81-6e4c-4fd0-a961-f277b1e48049",
      creatorId: "05c0bbe6-c1c8-4b25-8f85-dd03d912b757",
      createdAt: "2026-03-26T04:06:18.297Z",
      updatedAt: "2026-03-26T04:06:18.297Z",
      category: {
        id: "20785a81-6e4c-4fd0-a961-f277b1e48049",
        name: "Music",
        createdAt: "2026-03-26T04:04:25.804Z",
        updatedAt: "2026-03-26T04:04:25.804Z",
      },
      creator: {
        id: "05c0bbe6-c1c8-4b25-8f85-dd03d912b757",
        firstName: "Organizer",
        lastName: "Test",
        email: "organizer@email.com",
        profilePhoto: null,
      },
    },
    {
      id: "deafa1b1-1589-481a-b440-87d8705c3c178",
      title: "Automated Postman Event",
      description: "An event created by the automated postman collection flow",
      imageURL: null,
      isDeleted: false,
      eventStatus: "UPCOMING",
      startTime: "2026-12-01T10:00:00.794Z",
      endTime: "2026-12-01T12:00:00.794Z",
      country: "USA",
      city: "New York",
      address: "123 Tech Lane",
      postalCode: "10001",
      fee: 50,
      capacity: 100,
      categoryId: "20785a81-6e4c-4fd0-a961-f277b1e48049",
      creatorId: "05c0bbe6-c1c8-4b25-8f85-dd03d912b757",
      createdAt: "2026-03-26T04:06:18.297Z",
      updatedAt: "2026-03-26T04:06:18.297Z",
      category: {
        id: "20785a81-6e4c-4fd0-a961-f277b1e48049",
        name: "Music",
        createdAt: "2026-03-26T04:04:25.804Z",
        updatedAt: "2026-03-26T04:04:25.804Z",
      },
      creator: {
        id: "05c0bbe6-c1c8-4b25-8f85-dd03d912b757",
        firstName: "Organizer",
        lastName: "Test",
        email: "organizer@email.com",
        profilePhoto: null,
      },
    },
    {
      id: "deafa1b1-1589-481a-b440-87d8705c3c179",
      title: "Automated Postman Event",
      description: "An event created by the automated postman collection flow",
      imageURL: null,
      isDeleted: false,
      eventStatus: "UPCOMING",
      startTime: "2026-12-01T10:00:00.794Z",
      endTime: "2026-12-01T12:00:00.794Z",
      country: "USA",
      city: "New York",
      address: "123 Tech Lane",
      postalCode: "10001",
      fee: 50,
      capacity: 100,
      categoryId: "20785a81-6e4c-4fd0-a961-f277b1e48049",
      creatorId: "05c0bbe6-c1c8-4b25-8f85-dd03d912b757",
      createdAt: "2026-03-26T04:06:18.297Z",
      updatedAt: "2026-03-26T04:06:18.297Z",
      category: {
        id: "20785a81-6e4c-4fd0-a961-f277b1e48049",
        name: "Music",
        createdAt: "2026-03-26T04:04:25.804Z",
        updatedAt: "2026-03-26T04:04:25.804Z",
      },
      creator: {
        id: "05c0bbe6-c1c8-4b25-8f85-dd03d912b757",
        firstName: "Organizer",
        lastName: "Test",
        email: "organizer@email.com",
        profilePhoto: null,
      },
    },
    {
      id: "deafa1b1-1589-481a-b440-87d8705c3c171",
      title: "Automated Postman Event",
      description: "An event created by the automated postman collection flow",
      imageURL: null,
      isDeleted: false,
      eventStatus: "UPCOMING",
      startTime: "2026-12-01T10:00:00.794Z",
      endTime: "2026-12-01T12:00:00.794Z",
      country: "USA",
      city: "New York",
      address: "123 Tech Lane",
      postalCode: "10001",
      fee: 50,
      capacity: 100,
      categoryId: "20785a81-6e4c-4fd0-a961-f277b1e48049",
      creatorId: "05c0bbe6-c1c8-4b25-8f85-dd03d912b757",
      createdAt: "2026-03-26T04:06:18.297Z",
      updatedAt: "2026-03-26T04:06:18.297Z",
      category: {
        id: "20785a81-6e4c-4fd0-a961-f277b1e48049",
        name: "Music",
        createdAt: "2026-03-26T04:04:25.804Z",
        updatedAt: "2026-03-26T04:04:25.804Z",
      },
      creator: {
        id: "05c0bbe6-c1c8-4b25-8f85-dd03d912b757",
        firstName: "Organizer",
        lastName: "Test",
        email: "organizer@email.com",
        profilePhoto: null,
      },
    },
    {
      id: "deafa1b1-1589-481a-b440-87d8705c3c172",
      title: "Automated Postman Event",
      description: "An event created by the automated postman collection flow",
      imageURL: null,
      isDeleted: false,
      eventStatus: "UPCOMING",
      startTime: "2026-12-01T10:00:00.794Z",
      endTime: "2026-12-01T12:00:00.794Z",
      country: "USA",
      city: "New York",
      address: "123 Tech Lane",
      postalCode: "10001",
      fee: 50,
      capacity: 100,
      categoryId: "20785a81-6e4c-4fd0-a961-f277b1e48049",
      creatorId: "05c0bbe6-c1c8-4b25-8f85-dd03d912b757",
      createdAt: "2026-03-26T04:06:18.297Z",
      updatedAt: "2026-03-26T04:06:18.297Z",
      category: {
        id: "20785a81-6e4c-4fd0-a961-f277b1e48049",
        name: "Music",
        createdAt: "2026-03-26T04:04:25.804Z",
        updatedAt: "2026-03-26T04:04:25.804Z",
      },
      creator: {
        id: "05c0bbe6-c1c8-4b25-8f85-dd03d912b757",
        firstName: "Organizer",
        lastName: "Test",
        email: "organizer@email.com",
        profilePhoto: null,
      },
    },
  ];
  return (
    <div>
      <HeroSection />
      <EventCategory />
      <EventSlider events={events} status="Featured" />
      <EventSlider events={events} status="Upcoming" />
      <CallToAction />
    </div>
  );
};

export default HomePage;
