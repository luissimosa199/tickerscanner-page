import DashboardBody from "@/components/DashboardBody";
import FloatingButton from "@/components/FloatingButton";
import { TicketsRequest } from "@/types";
import { getTickets } from "@/utils/getTickets";
import React from "react";

export const dynamic = "force-dynamic";

const Dashboard = async () => {
  const { tickets, error } = (await getTickets(1, 10)) as TicketsRequest;

  if (error) {
    console.log(error);
  }

  return (
    <main className="bg-red-500 relative">
      <DashboardBody tickets={tickets} error={error} />
      <div className="fixed bottom-5 right-5 w-16 h-16 bg-red-500 rounded-full shadow-md  flex justify-center items-center">
        <FloatingButton />
      </div>
    </main>
  );
};

export default Dashboard;
