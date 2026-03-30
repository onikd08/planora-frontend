import { getAllCategories } from "@/actions/admin/category.action";
import CategoryManagement from "../../_components/CategoryManagement";

export const metadata = {
  title: "Category Management | Planora",
  description: "Category Management | Planora",
};

const CategoriesPage = async () => {
  const { data } = (await getAllCategories()) || [];
  return <div>{<CategoryManagement categories={data} />}</div>;
};

export default CategoriesPage;
