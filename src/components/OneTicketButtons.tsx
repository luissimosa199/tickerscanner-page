"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const OneTicketButtons = ({ ticketReset }: { ticketReset?: () => void }) => {
  const router = useRouter();
  return (
    <div className="mb-4 flex flex-col sm:flex-row gap-2 w-2/3 ">
      <button
        onClick={() => {
          if (ticketReset) {
            ticketReset();
          } else {
            router.push("/scan");
          }
          router.refresh();
        }}
        className="bg-white rounded-full px-6 py-4 w-full sm:max-w-xs text-red-500 text-center text-lg font-bold"
      >
        🔄 Escanear Otro
      </button>
      <Link
        href="/dashboard"
        className="bg-white rounded-full px-6 py-4 w-full sm:max-w-xs text-red-500 text-center text-lg font-bold"
      >
        ✅ Mis tickets
      </Link>
    </div>
  );
};

export default OneTicketButtons;
