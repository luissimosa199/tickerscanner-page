"use client";
import { Ticket } from "@/types";
import Image from "next/image";
import React from "react";
import OpenCardButton from "./OpenCardButton";
import { calculateTotalQuantity } from "@/utils/calculateTotalQuantity";
import { formatDate } from "@/utils/formatDate";

const TicketCardMainSection = ({
  ticket,
  toggleOpenCard,
}: {
  ticket: Ticket;
  toggleOpenCard: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className="flex gap-2">
      <div className="h-24 w-24 rounded-3xl bg-white overflow-hidden">
        <Image
          alt={`${ticket.supermarket} logo`}
          src={ticket.logo_link}
          width={120}
          height={120}
        />
      </div>
      <div className="">
        <p className="font-bold">
          {ticket.supermarket.toString()} {formatDate(ticket.date)}
        </p>

        <p className="text-gray-400 font-semibold text-sm">
          ${ticket.total_amount}
        </p>
        <p className="text-gray-400 font-semibold text-sm">
          {calculateTotalQuantity(ticket.ticket_items)} artículos
        </p>
      </div>
      <div className="w-6 h-6 ml-auto self-center flex justify-center items-center rounded-full bg-white p-4 shadow-md">
        <OpenCardButton setState={toggleOpenCard} />
      </div>
    </div>
  );
};

export default TicketCardMainSection;
