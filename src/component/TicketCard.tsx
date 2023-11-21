"use client";

import { Ticket } from "@/types";
import Image from "next/image";
import React, { useState } from "react";
import OpenCardButton from "./OpenCardButton";

const TicketCard = ({ ticket }: { ticket: Ticket }) => {
  const [isOpen, toggleOpenCard] = useState<boolean>(false);

  return (
    <li className="bg-gray-100 m-2 p-4 rounded-3xl">
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
          <OpenCardButton setState={toggleOpenCard} />
        </div>
      </div>
      {isOpen && (
        <div className="py-4">
          <ul className="flex flex-col gap-4">
            {ticket.ticketItems.map((e, idx) => {
              return (
                <li
                  key={`${e.name}${idx}`}
                  className=""
                >
                  <p className="text-sm font-semibold">{e.name}</p>
                  <p className="text-sm text-gray-600 font-semibold">
                    precio unitario: ${e.price}
                  </p>
                  <p className="text-sm text-gray-600 font-semibold">
                    cantidad: {e.quantity} {e.name.includes("x kg") && "kg"}
                  </p>
                  <p className="text-sm text-gray-600 font-semibold">
                    total: ${e.total}
                  </p>
                </li>
              );
            })}
          </ul>

          <div className="mt-4">
            <p className="text-base text-gray-600 font-semibold">
              Total: ${ticket.totalAmount}
            </p>
            <p className="text-base text-gray-600 font-semibold">
              Descuento total: ${ticket.discounts.disc_total}
            </p>
            <ul>
              {ticket.discounts.disc_items.length > 0 &&
                ticket.discounts.disc_items.map(
                  (e: { desc_name: string; desc_amount: number }, idx) => {
                    return (
                      <li
                        key={idx}
                        className="flex gap-2 ml-2"
                      >
                        <span className="text-xs text-gray-500 font-semibold">
                          {e.desc_name}:
                        </span>
                        <span className="text-xs text-gray-500 font-semibold">
                          ${e.desc_amount}
                        </span>
                      </li>
                    );
                  }
                )}
            </ul>
          </div>
        </div>
      )}
    </li>
  );
};

export default TicketCard;
