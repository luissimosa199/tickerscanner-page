import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const term = request.nextUrl.searchParams.get("term");

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_TICKER_APP_URL}/items?term=${term}`
    );
    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.log(error);
    return Response.json({ error });
  }
}
