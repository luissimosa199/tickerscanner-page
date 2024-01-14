import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const page = request.nextUrl.searchParams.get("page");
  const useCookies = cookies();
  const cookie = useCookies.get("token");

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_TICKER_APP_URL}/tickets?page=${page}&limit=10`,
      {
        headers: {
          Authorization: `Bearer ${cookie?.value}`,
        },
      }
    );
    const data = await response.json();

    const totalTickets = data.total;

    const hasNextPage = Number(page || "2") * 10 < totalTickets;

    // Include the hasNextPage property in the response
    return Response.json({ ...data, hasNextPage });
  } catch (error) {
    console.log(error);
    return Response.json({ error });
  }
}
