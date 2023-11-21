"use client";

import { Ticket } from "@/types";
import React, { useState } from "react";
import TicketCardMainSection from "./TicketCardMainSection";

const TicketCard = ({ ticket }: { ticket: Ticket }) => {
  const [isOpen, toggleOpenCard] = useState<boolean>(false);

  return (
    <li className="bg-gray-100 m-2 p-4 rounded-3xl">
      <TicketCardMainSection
        ticket={ticket}
        toggleOpenCard={toggleOpenCard}
      />
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
