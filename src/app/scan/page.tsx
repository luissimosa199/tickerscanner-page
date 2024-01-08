"use client";
import React, { useState } from "react";
import OneTicketView from "@/components/OneTicketCard";
import Link from "next/link";
import OneTicketButtons from "@/components/OneTicketButtons";
import useTicketParser from "@/hooks/useTicketParser";

const Page = () => {
  const [showTextInput, setShowTextInput] = useState<boolean>(false);
  const { ticket, handleSubmit, previewRef } = useTicketParser();

  // const fakeTicket: Ticket = {
  //   _id: "1234abc",
  //   ticketItems: [
  //     {
  //       name: "Apples",
  //       quantity: 2,
  //       price: 1.99,
  //       total: 3.98,
  //     },
  //     {
  //       name: "Milk",
  //       quantity: 1,
  //       price: 2.49,
  //       total: 2.49,
  //     },
  //   ],
  //   totalAmount: 6.47,
  //   logoLink: "",
  //   address: "123 Main St, Anytown, USA",
  //   date: "2023-01-06T12:30:00.000Z",
  //   discounts: {
  //     disc_items: [
  //       {
  //         desc_name: "New Customer Discount",
  //         desc_amount: 0.5,
  //       },
  //     ],
  //     disc_total: 0.5,
  //   },
  //   paymentMethod: "Credit Card",
  //   ogTicketUrl: "https://examplesupermarket.com/receipts/1234abc",
  //   supermarket: "JUMBO",
  // };

  return (
    <main className="bg-red-500">
      {/* stage 1 */}
      {!ticket && (
        <div className="min-h-screen flex flex-col gap-6 pt-4 justify-between items-center">
          <div className="w-full relative">
            <h1 className="font-bold text-2xl text-white text-center">
              Ticker Scanner
            </h1>
            <div className="w-8 h-8 bg-white absolute right-2 top-0 rounded-full flex justify-center items-center">
              <Link href="/dashboard">
                <span>🙆‍♂️</span>
              </Link>
            </div>
          </div>
          <div className="w-full h-72 md:h-96 mx-auto overflow-hidden flex justify-center items-center">
            <div
              ref={previewRef}
              id="qr-container"
              className="w-full h-full"
            ></div>
          </div>
          <div className="flex justify-center w-full px-24">
            {showTextInput ? (
              <form onSubmit={handleSubmit}>
                <input
                  name="url"
                  className="bg-white rounded-full px-6 py-4 w-full sm:max-w-xs text-red-500 text-center text-lg font-bold"
                  type="text"
                />
              </form>
            ) : (
              <button
                onClick={() => {
                  setShowTextInput(true);
                }}
                className="bg-white rounded-full px-6 py-4 w-full sm:max-w-xs text-red-500 text-center text-lg font-bold"
              >
                Introducir URL
              </button>
            )}
          </div>
          <p className="text-red-900 font-semibold text-sm">
            Desarrollado por Luis Simosa, 2023
          </p>
        </div>
      )}

      {/* stage 2 */}

      {ticket && (
        <div className="min-h-screen flex flex-col pt-4 px-4 justify-between items-center">
          <OneTicketView ticket={ticket} />
          <OneTicketButtons />
        </div>
      )}
    </main>
  );
};

export default Page;
