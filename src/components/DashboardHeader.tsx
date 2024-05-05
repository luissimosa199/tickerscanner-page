import Link from "next/link";
import React from "react";

const DashboardHeader = ({
  setTab,
  tab,
}: {
  setTab: React.Dispatch<React.SetStateAction<"TICKETS" | "ARTICULOS">>;
  tab: "TICKETS" | "ARTICULOS";
}) => {
  return (
    <section className="flex flex-col gap-4 shadow-md">
      <div className="p-4 flex flex-col gap-4">
        <h1 className="text-4xl font-bold text-white text-center">Tickets</h1>
        <div className="text-gray-800 text-center">
          <ul className="flex flex-col gap-4 items-center">
            <li className="hover:text-white hover:bg-red-500 hover:outline-2 hover:outline-white hover:outline bg-white w-1/3 transition-all rounded-md ">
              <Link href="/stats">Estadísticas</Link>
            </li>
            <li className="hover:text-white hover:bg-red-500 hover:outline-2 hover:outline-white hover:outline bg-white w-1/3 transition-all rounded-md ">
              <Link href="#">Perfil</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex justify-around text-xl text-white uppercase">
        <button
          onClick={() => {
            setTab("TICKETS");
          }}
          className={`w-full py-4  md:max-w-xs ${
            tab === "TICKETS" ? "border-black border-b-4" : ""
          }`}
        >
          Tickets
        </button>
        <button
          onClick={() => {
            setTab("ARTICULOS");
          }}
          className={`w-full py-4  md:max-w-xs ${
            tab === "ARTICULOS" ? "border-black border-b-4" : ""
          }`}
        >
          Artículos
        </button>
      </div>
    </section>
  );
};

export default DashboardHeader;
