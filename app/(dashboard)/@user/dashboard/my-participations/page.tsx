import { getMyParticipations } from "@/actions/user/participation.action";
import MyParticipations from "../../_components/MyParticipations";

const MyParticipationsPage = async () => {
  const result = await getMyParticipations();
  const participations = result.data || [];
  return <MyParticipations participations={participations} />;
};

export default MyParticipationsPage;
