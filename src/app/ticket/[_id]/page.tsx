import { getTicketDetails } from "@/utils/getTicketDetail";
import React from "react";

const Ticket = async ({ params }: { params: { _id: string } }) => {
  const response = await getTicketDetails(params._id as string);

  console.log(response);

  return (
    <main className="bg-red-500">
      <section className="min-h-screen w-full pt-4">
        <div className="p-4">
          <p className="text-2xl text-white">Ticket {params._id}</p>
        </div>
      </section>
    </main>
  );
};

export default Ticket;
