import Link from "next/link";
import React from "react";

const OneTicketButtons = () => {
  return (
    <div className="mb-4 flex flex-col sm:flex-row gap-2 w-2/3 ">
      <Link
        href="/scan"
        className="bg-white rounded-full px-6 py-4 w-full sm:max-w-xs text-red-500 text-center text-lg font-bold"
      >
        🔄 Escanear Otro
      </Link>
      <Link
        href=""
        className="bg-white rounded-full px-6 py-4 w-full sm:max-w-xs text-red-500 text-center text-lg font-bold"
      >
        ✅ Mis tickets
      </Link>
    </div>
  );
};

export default OneTicketButtons;
