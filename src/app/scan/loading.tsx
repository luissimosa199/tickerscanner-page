import React from "react";

const Loading = () => {
  return (
    <main className="bg-red-500">
      <div className="min-h-screen flex flex-col gap-6 pt-4 justify-between items-center">
        <div>
          <h1 className="font-bold text-2xl text-white text-center">
            Ticket Scanner
          </h1>
        </div>
        <div className="w-full h-48 bg-gray-200 mx-auto animate-pulse"></div>
        <div className="flex justify-center w-full px-24">
          <button
            disabled
            className="bg-white rounded-full px-6 py-4 w-full text-red-500 text-center text-lg font-bold sm:max-w-xs"
          >
            Escanea
          </button>
        </div>
        <p className="text-red-900 font-semibold text-sm">
          Desarrollado por Luis Simosa, 2023
        </p>
      </div>
    </main>
  );
};

export default Loading;
