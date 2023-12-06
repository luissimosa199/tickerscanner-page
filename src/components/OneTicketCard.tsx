import { Ticket } from "@/types";
import Image from "next/image";

const OneTicketView = ({ ticket }: { ticket: Ticket }) => {
  return (
    <div className={`m-2 bg-gray-100 p-4 rounded-3xl w-full max-w-xl `}>
      <div className="flex gap-2">
        <div className="h-36 w-36 rounded-3xl bg-white overflow-hidden">
          <Image
            alt={`${ticket.supermarket} logo`}
            src={ticket.logoLink}
            width={144}
            height={144}
          />
        </div>
        <div className="">
          <p className="font-bold text-xl">
            {ticket.supermarket} {ticket.date}
          </p>

          <p className="text-gray-400 font-semibold text-lg">
            ${ticket.totalAmount}
          </p>
          <p className="text-gray-400 font-semibold text-lg">
            {ticket.ticketItems.length} artículos
          </p>
        </div>
      </div>

      <div className="py-4">
        <ul className="flex flex-col gap-4">
          {ticket.ticketItems.map((e, idx) => {
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

        {ticket.discounts.disc_items.length > 0 && (
          <ul className="mt-4">
            <p className="text-lg font-semibold">Descuentos</p>
            {ticket.discounts.disc_items.map(
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
          <p className="text-xl font-semibold">Total: ${ticket.totalAmount}</p>
          <p className="text-xl font-semibold">
            Descuento total: ${ticket.discounts.disc_total}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OneTicketView;
