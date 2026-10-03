import { redirect } from "next/navigation";

// Accounts are disabled in the read-only demo.
const Page = () => {
  redirect("/dashboard");
};

export default Page;
