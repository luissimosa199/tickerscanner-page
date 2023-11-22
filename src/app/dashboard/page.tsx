import FloatingButton from "@/components/FloatingButton";
import TicketComponent from "@/components/TicketCard";
import TicketCard from "@/components/TicketCard";
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
      <section className="flex flex-col gap-4 shadow-md">
        <div className="p-4 flex flex-col gap-4">
          <h1 className="text-4xl font-bold text-white text-center">Tickets</h1>
          <p className="text-gray-300 text-center">
            Acá encontrarás todos tus tickets organizados en base a la fecha que
            los escaneaste
          </p>
        </div>

        <div className="flex justify-around text-xl text-white uppercase">
          <button className="w-full py-4 border-black border-b-4 md:max-w-xs">
            Todos
          </button>
          {/* <button className="w-full py-4 border-gray-400 border-b-4">
                Monto
              </button> */}
        </div>
      </section>

      <section className="min-h-screen w-full pt-4 bg-white">
        <ul className="p-4 mx-auto md:flex md:flex-wrap md:justify-center">
          {tickets.map((ticket) => {
            return (
              <TicketComponent
                key={`ticketcard${ticket._id}`}
                ticket={ticket}
              />
            );
          })}
        </ul>
      </section>
      <div className="fixed bottom-5 right-5 w-16 h-16 bg-red-500 rounded-full shadow-md  flex justify-center items-center">
        <FloatingButton />
      </div>
    </main>
  );
};

export default Dashboard;
