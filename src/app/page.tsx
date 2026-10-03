import QrLogo from "@/components/QrLogo";
import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-red-500 relative">
      <div className="min-h-screen flex flex-col gap-6 justify-center items-center">
        <div className="w-32 h-32 text-white mx-auto">
          <QrLogo />
        </div>
        <div>
          <h1 className="font-bold text-4xl text-white text-center">
            Ticket Scanner
          </h1>
          <p className="text-red-100 text-center mt-2">
            Demo de solo lectura con datos reales
          </p>
        </div>
        <div className="flex flex-col gap-4 justify-center items-center w-full px-24">
          <Link
            href="/dashboard"
            className="bg-white rounded-full px-6 py-4 w-full sm:max-w-xs text-red-500 text-center text-lg font-bold"
          >
            Ver tickets
          </Link>
        </div>
        <div className="flex justify-end absolute bottom-2">
          <p className="text-red-900 font-semibold text-sm">
            Desarrollado por Luis Simosa, 2024
          </p>
        </div>
      </div>
    </main>
  );
}
