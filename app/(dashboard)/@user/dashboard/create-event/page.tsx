import { getAllCategories } from "@/actions/admin/category.action";
import { CreateEventForm } from "../../_components/CreateEvent";

export const metadata = {
  title: "Create Event",
  description: "Create Event",
};

const CreateEventPage = async () => {
  const { data } = (await getAllCategories()) || [];

  return <CreateEventForm categories={data} />;
};

export default CreateEventPage;
