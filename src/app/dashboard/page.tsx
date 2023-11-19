import FloatingButton from "@/component/FloatingButton";
import OpenCardButton from "@/component/OpenCardButton";
import TicketCard from "@/component/TicketCard";
import { Ticket } from "@/types";
import { getTickets } from "@/utils/getTickets";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
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
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque magni
            excepturi quod voluptatibus! Eligendi dolores qui cupiditate
            mollitia suscipit quidem!
          </p>
        </div>

        <div className="flex justify-around text-xl text-white uppercase">
          <button className="w-full py-4 border-black border-b-4">Todos</button>
          <button className="w-full py-4 border-gray-400 border-b-4">
            Monto
          </button>
        </div>
      </section>

      <section className="min-h-screen w-full pt-4 bg-white">
        <ul className="p-4 mx-auto">
          {tickets.map((ticket) => {
            return (
              // <TicketCard
              //   key={ticket._id}
              //   ticket={ticket}
              // />

              <li
                key={ticket._id}
                className="bg-gray-100 m-2 p-4 rounded-3xl"
              >
                <div className="flex gap-2">
                  <div className="h-24 w-24 rounded-3xl bg-white overflow-hidden">
                    <Image
                      alt={`${ticket.supermarket} logo`}
                      src={ticket.logoLink}
                      width={96}
                      height={96}
                    />
                  </div>
                  <div className="">
                    <p className="font-bold">
                      {ticket.supermarket} {ticket.date}
                    </p>

                    <p className="text-gray-400 font-semibold text-sm">
                      ${ticket.totalAmount}
                    </p>
                    <p className="text-gray-400 font-semibold text-sm">
                      {ticket.ticketItems.length} artículos
                    </p>
                  </div>
                  <div className="w-6 h-6 ml-auto self-center flex justify-center items-center rounded-full bg-white p-4 shadow-md">
                    {/* <OpenCardButton setState={toggleOpenCard} /> */}
                  </div>
                </div>
              </li>
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
