import OneTicketButtons from "@/components/OneTicketButtons";
import OneTicketView from "@/components/OneTicketCard";
import { getTicketDetails } from "@/utils/getTicketDetail";
import React from "react";

const Ticket = async ({ params }: { params: { _id: string } }) => {
  const ticket = await getTicketDetails(params._id as string);

  if (ticket instanceof Error)
    return (
      <main className="bg-red-500">
        <section className="min-h-screen w-full pt-4">
          <div className="min-h-screen flex flex-col pt-4 px-4 justify-between items-center">
            <h1 className="text-2xl font-bold text-white">Error</h1>
            <p className="text-white">{ticket.message}</p>
          </div>
        </section>
      </main>
    );

  return (
    <main className="bg-red-500">
      <section className="min-h-screen w-full pt-4">
        <div className="min-h-screen flex flex-col pt-4 px-4 justify-between items-center">
          <OneTicketView ticket={ticket} />
          <OneTicketButtons />
        </div>
      </section>
    </main>
  );
};

export default Ticket;
