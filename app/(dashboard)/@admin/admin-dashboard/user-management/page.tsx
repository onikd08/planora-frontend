import { UserManagement } from "../../_components/UserManagement";

export const metadata = {
  title: "User Management",
  description: "User Management",
};

const UserManagementPage = ({ searchParams }: any) => {
  return <UserManagement searchParams={searchParams} />;
};

export default UserManagementPage;
