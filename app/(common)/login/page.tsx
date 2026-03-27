import LoginComponent from "../_components/page/login/LoginComponent";

export const metadata = {
  title: "Login | Planora",
  description: "Login to your Planora account",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] bg-white dark:bg-gray-950">
      <LoginComponent />
    </div>
  );
}
