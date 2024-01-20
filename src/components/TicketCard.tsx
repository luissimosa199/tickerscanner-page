"use client";

import { Ticket } from "@/types";
import { useState } from "react";
import TicketCardMainSection from "./TicketCardMainSection";

const TicketComponent = ({ ticket }: { ticket: Ticket }) => {
  const [isOpen, toggleOpenCard] = useState<boolean>(false);

  return (
    <li
      className={`m-2 bg-gray-100 p-4 rounded-3xl  ${
        isOpen ? "md:w-full md:mx-10" : "md:min-w-[45%]"
      } `}
    >
      <TicketCardMainSection
        ticket={ticket}
        toggleOpenCard={toggleOpenCard}
      />
      {isOpen && (
        <div className="py-4">
          <ul className="flex flex-col gap-4">
            {ticket.ticket_items.map((e, idx) => {
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

          {ticket.discount.disc_items.length > 0 && (
            <ul className="mt-4">
              <p className="text-sm font-semibold">Descuentos</p>
              {ticket.discount.disc_items.map(
                (e: { desc_name: string; desc_amount: number }, idx) => {
                  return (
                    <li
                      key={idx}
                      className="flex gap-2"
                    >
                      <span className="text-sm text-gray-500 font-semibold">
                        {e.desc_name}:
                      </span>
                      <span className="text-sm text-gray-500 font-semibold">
                        ${e.desc_amount}
                      </span>
                    </li>
                  );
                }
              )}
            </ul>
          )}

          <div className="mt-4 text-center">
            <p className="text-base font-semibold">
              Total: ${ticket.total_amount}
            </p>
            <p className="text-base font-semibold">
              Descuento total: ${ticket.discount.disc_total}
            </p>
          </div>
        </div>
      )}
    </li>
  );
};

export default TicketComponent;
