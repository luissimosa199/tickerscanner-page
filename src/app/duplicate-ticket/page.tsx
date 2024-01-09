import Link from "next/link";
import React from "react";

const DuplicateTicket = ({
  searchParams,
}: {
  searchParams: { _id: string };
}) => {
  const { _id } = searchParams;

  return (
    <main className="bg-red-500 h-screen px-2 py-4">
      <div className="my-auto flex flex-col gap-12 justify-center mt-24">
        <h1 className="font-bold text-2xl text-white text-center">
          Ya has escaneado este ticket
        </h1>
        <div className="flex flex-col gap-4 mx-auto">
          <Link
            href={`/ticket/${_id}`}
            className="bg-white rounded-full px-6 py-4 w-full sm:max-w-xs text-red-500 text-center text-lg font-bold"
          >
            Ir al Ticket
          </Link>
          <Link
            href={`/scan`}
            className="bg-white rounded-full px-6 py-4 w-full sm:max-w-xs text-red-500 text-center text-lg font-bold"
          >
            Volver a escanear
          </Link>
        </div>
      </div>
    </main>
  );
};

export default DuplicateTicket;
