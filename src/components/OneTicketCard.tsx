import { Ticket } from "@/types";
import { calculateTotalQuantity } from "@/utils/calculateTotalQuantity";
import { formatDate } from "@/utils/formatDate";
import Image from "next/image";

const OneTicketView = ({ ticket }: { ticket: Ticket }) => {
  return (
    <div className={`m-2 bg-gray-100 p-4 rounded-3xl w-full max-w-xl `}>
      <div className="flex gap-2">
        <div className="h-36 w-36 rounded-3xl bg-white overflow-hidden">
          <Image
            alt={`${ticket.supermarket} logo`}
            src={ticket.logo_link}
            width={144}
            height={144}
          />
        </div>
        <div className="">
          <p className="font-bold text-xl">
            {ticket.supermarket} {formatDate(ticket.date)}
          </p>

          <p className="text-gray-400 font-semibold text-lg">
            ${ticket.total_amount}
          </p>
          <p className="text-gray-400 font-semibold text-lg">
            {calculateTotalQuantity(ticket.ticket_items)} artículos
          </p>
        </div>
      </div>

      <div className="py-4">
        <ul className="flex flex-col gap-4">
          {ticket.ticket_items.map((e, idx) => {
            return (
              <li
                key={`${e.name}${idx}`}
                className=""
              >
                <p className="text-lg font-semibold">{e.name}</p>
                <p className="text-lg text-gray-600 font-semibold">
                  precio unitario: ${e.price}
                </p>
                <p className="text-lg text-gray-600 font-semibold">
                  cantidad: {e.quantity} {e.name.includes("x kg") && "kg"}
                </p>
                <p className="text-lg text-gray-600 font-semibold">
                  total: ${e.total}
                </p>
              </li>
            );
          })}
        </ul>

        {ticket.discount.disc_items.length > 0 && (
          <ul className="mt-4">
            <p className="text-lg font-semibold">Descuentos</p>
            {ticket.discount.disc_items.map(
              (e: { desc_name: string; desc_amount: number }, idx) => {
                return (
                  <li
                    key={idx}
                    className="flex gap-2"
                  >
                    <span className="text-lg text-gray-500 font-semibold">
                      {e.desc_name}:
                    </span>
                    <span className="text-lg text-gray-500 font-semibold">
                      ${e.desc_amount}
                    </span>
                  </li>
                );
              }
            )}
          </ul>
        )}

        <div className="mt-4 text-center">
          <p className="text-xl font-semibold">Total: ${ticket.total_amount}</p>
          <p className="text-xl font-semibold">
            Descuento total: ${ticket.discount.disc_total}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OneTicketView;
