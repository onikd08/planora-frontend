import { getMyEvents } from "@/actions/user/event.action";
import MyEvents from "../../_components/MyCreatedEvents";

const MyEventsPage = async () => {
  const result = await getMyEvents();
  const events = result.data || [];
  return <MyEvents events={events} />;
};

export default MyEventsPage;
