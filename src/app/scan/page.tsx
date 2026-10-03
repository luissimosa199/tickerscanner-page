import Link from "next/link";
import React from "react";

const Page = () => {
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
        <div className="flex flex-col gap-4 items-center px-6 text-center">
          <span className="text-8xl grayscale opacity-60">📷</span>
          <span className="bg-red-900 text-white uppercase tracking-widest text-sm font-bold rounded-full px-4 py-1">
            Deprecated
          </span>
          <p className="text-white text-lg max-w-sm">
            El escaneo de tickets ya no está disponible. Esta es una demo de
            solo lectura con los tickets que ya fueron escaneados.
          </p>
        </div>
        <div className="flex justify-center w-full px-24">
          <Link
            href="/dashboard"
            className="bg-white rounded-full px-6 py-4 w-full sm:max-w-xs text-red-500 text-center text-lg font-bold"
          >
            Ver tickets
          </Link>
        </div>
        <p className="text-red-900 font-semibold text-sm">
          Desarrollado por Luis Simosa, {new Date().getFullYear()}
        </p>
      </div>
    </main>
  );
};

export default Page;
