import DashboardBody from "@/components/DashboardBody";
import FloatingButton from "@/components/FloatingButton";
import { Ticket } from "@/types";
import { getTickets } from "@/utils/getTickets";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

const Dashboard = async () => {
  const useCookies = cookies();
  const token = useCookies.get("token");

  if (!token) {
    redirect("/login");
  }

  // TODO: GET USER DATA
  const tickets = (await getTickets()) as Ticket[];

  return (
    <main className="bg-red-500 relative">
      <DashboardBody tickets={tickets} />
      <div className="fixed bottom-5 right-5 w-16 h-16 bg-red-500 rounded-full shadow-md  flex justify-center items-center">
        <FloatingButton />
      </div>
    </main>
  );
};

export default Dashboard;
