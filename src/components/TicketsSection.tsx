import { Ticket } from "@/types";
import React, { Suspense } from "react";
import TicketComponent from "./TicketCard";
import InfiniteScrollTickets from "./InfiniteScrollTickets";

const TicketsSection = ({ tickets }: { tickets: Ticket[] }) => {
  return (
    <div>
      <ul className="p-4 mx-auto md:flex md:flex-wrap md:justify-center">
        <Suspense
          fallback={[...Array(5)].map((_, idx) => {
            return (
              <div
                key={`ticket_skeleton_${idx}`}
                className="m-2 bg-gray-100 p-4 rounded-3xl md:min-w-[45%] h-28 animate-pulse"
              >
                <p className="text-center">Cargando...</p>
              </div>
            );
          })}
        >
          {tickets.map((ticket, idx) => {
            return (
              <TicketComponent
                key={`ticket_card_${ticket.id}_${idx}`}
                ticket={ticket}
              />
            );
          })}
        </Suspense>

        <InfiniteScrollTickets />
      </ul>
    </div>
  );
};

export default TicketsSection;
