import { getMyParticipations } from "@/actions/user/participation.action";
import MyParticipations from "../../_components/MyParticipations";

export const metadata = {
  title: "My Participations",
  description: "My Participations",
};

const MyParticipationsPage = async () => {
  const result = await getMyParticipations();
  const participations = result.data || [];
  return <MyParticipations participations={participations} />;
};

export default MyParticipationsPage;
