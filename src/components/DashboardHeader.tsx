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
        <p className="text-gray-300 text-center">
          Acá encontrarás todos tus tickets y podras buscar individualmente tus
          productos.
        </p>
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
