import { Ticket } from "@/types";
import Image from "next/image";

const OneTicketView = ({ ticket }: { ticket: Ticket }) => {
  return (
    <div className="flex flex-col px-2 justify-around w-full h-full">
      <div className="flex flex-col justify-center">
        <Image
          src={ticket.logoLink}
          width={200}
          height={200}
          alt=""
          className="mx-auto"
        />
        <h1 className="font-bold text-2xl text-white text-center">
          Tu compra del {ticket.date} en {ticket.supermarket}
        </h1>
      </div>

      <div className="">
        <h3 className="font-bold text-lg text-white">Artículos:</h3>
        <ul className="text-white">
          {ticket.ticketItems.map((item) => (
            <li
              key={item.name}
              className="item"
            >
              <span>{item.name}</span>
              <span>{item.quantity}</span>
              <span>{item.price}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="text-2xl text-white font-bold text-center">
        Total: {ticket.totalAmount}
      </p>

      <div className="text-center text-sm ">
        <p className="text-red-800">{ticket.address}</p>
        <p className="text-red-800">Paid by {ticket.paymentMethod}</p>
      </div>
    </div>
  );
};

export default OneTicketView;
