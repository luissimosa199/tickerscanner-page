import Link from "next/link";
import React from "react";

const Loading = () => {
  return (
    <main className="bg-red-500">
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
        <div className="w-48 h-48 md:h-96 bg-gray-200 mx-auto animate-pulse"></div>
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
