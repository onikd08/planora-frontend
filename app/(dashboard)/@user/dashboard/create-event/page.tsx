import { getAllCategories } from "@/actions/admin/category.action";
import { CreateEventForm } from "../../_components/CreateEvent";

const CreateEventPage = async () => {
  const { data } = (await getAllCategories()) || [];

  return <CreateEventForm categories={data} />;
};

export default CreateEventPage;
