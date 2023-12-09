import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const term = request.nextUrl.searchParams.get("term");
  const useCookies = cookies();
  const cookie = useCookies.get("token");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_TICKER_APP_URL}/items?term=${term}`,
    {
      headers: {
        Authorization: `Bearer ${cookie?.value}`,
      },
    }
  );

  const data = await response.json();

  return Response.json(data);
}
