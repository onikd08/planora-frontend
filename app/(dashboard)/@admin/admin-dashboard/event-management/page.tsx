import { EventManagement } from "../../_components/EventManagement";

export const metadata = {
  title: "Event Management",
  description: "Event Management",
};
const EventManagementPage = ({
  searchParams,
}: {
  searchParams: Promise<any>;
}) => {
  return <EventManagement searchParams={searchParams} />;
};

export default EventManagementPage;
