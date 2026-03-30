import { EventManagement } from "../../_components/EventManagement";

const EventManagementPage = ({
  searchParams,
}: {
  searchParams: Promise<any>;
}) => {
  return <EventManagement searchParams={searchParams} />;
};

export default EventManagementPage;
