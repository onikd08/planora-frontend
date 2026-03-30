import { getProfile } from "@/actions/admin/users.action";
import UserProfile from "../../_components/UserProfile";

export const metadata = {
  title: "Profile | Planora",
  description: "Profile | Planora",
};

const ProfilePage = async () => {
  const userData = await getProfile();
  return <UserProfile userData={userData} />;
};

export default ProfilePage;
