"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Html5QrcodeError, QrcodeResult } from "html5-qrcode/esm/core";
import useScanner from "@/hooks/useScanner";
import { scanTicket } from "@/utils/scanTicket";
import { Ticket } from "@/types";
import OneTicketView from "@/component/OneTicketCard";
import Link from "next/link";

const Page = () => {
  const [ticket, setTicket] = useState<Ticket | null>(null);

  const onSuccess = useCallback(async (result: QrcodeResult) => {
    const rawHtml = await fetch(result.text);
    const ticketHtml = await rawHtml.text();

    const response = await scanTicket(result.text, ticketHtml);

    console.log({ response });

    setTicket(response);
  }, []);

  const onError = useCallback((error: Html5QrcodeError) => {
    return;
  }, []);

  const previewRef = useScanner(onSuccess, onError);

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
            <button
              onClick={() => console.log("hey")}
              className="bg-white rounded-full px-6 py-4 w-full text-red-500 text-center text-lg font-bold"
            >
              Escanea
            </button>
          </div>
          <p className="text-red-900 font-semibold text-sm">
            Desarrollado por Luis Simosa, 2023
          </p>
        </div>
      )}

      {/* stage 2 */}

      {ticket && (
        <div className="min-h-screen flex flex-col gap-6 pt-4 justify-between items-center">
          <OneTicketView ticket={ticket} />
        </div>
      )}
    </main>
  );
};

export default Page;
