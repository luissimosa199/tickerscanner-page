import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-red-500 relative">
      <div className="min-h-screen flex flex-col gap-6 justify-center items-center">
        <div className="w-32 h-32 border border-white mx-auto">LOGO</div>
        <div>
          <h1 className="font-bold text-4xl text-white text-center">
            Ticket Scanner
          </h1>
        </div>
        <div className="flex flex-col gap-4 justify-center items-center w-full px-24">
          <Link
            href="/scan"
            className="bg-white rounded-full px-6 py-4 w-full text-red-500 text-center text-lg font-bold"
          >
            Comenzar
          </Link>
          <Link
            href="/login"
            className="italic font-semibold"
          >
            o Ingresar...
          </Link>
        </div>
        <div className="flex justify-end absolute bottom-2">
          <p className="text-red-900 font-semibold text-sm">
            Desarrollado por Luis Simosa, 2023
          </p>
        </div>
      </div>
    </main>
  );
}
