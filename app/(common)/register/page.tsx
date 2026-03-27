import RegisterComponent from "../_components/page/register/RegisterComponent";

export const metadata = {
  title: "Register | Planora",
  description: "Register for a new account",
};

export default function RegisterPage() {
  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] bg-white dark:bg-gray-950">
      <RegisterComponent />
    </div>
  );
}
