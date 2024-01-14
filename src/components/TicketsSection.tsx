import { Ticket } from "@/types";
import React from "react";
import TicketComponent from "./TicketCard";
import InfiniteScrollTickets from "./InfiniteScrollTickets";
import { HydrationBoundary } from "@tanstack/react-query";

const TicketsSection = ({ tickets }: { tickets: Ticket[] }) => {
  return (
    <div>
      <ul className="p-4 mx-auto md:flex md:flex-wrap md:justify-center">
        {tickets.map((ticket) => {
          return (
            <TicketComponent
              key={`ticketcard${ticket._id}`}
              ticket={ticket}
            />
          );
        })}

        <InfiniteScrollTickets />
      </ul>
    </div>
  );
};

export default TicketsSection;
