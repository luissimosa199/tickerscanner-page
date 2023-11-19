"use server";
import { cookies } from "next/headers";
const TICKER_APP_URL = process.env.NEXT_PUBLIC_TICKER_APP_URL as string;
// import { redirect } from "next/navigation";

export const login = async (formData: FormData) => {
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const response = await fetch(`${TICKER_APP_URL}/auth/login`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return { success: false, error: "Error login in" };
    }

    const data = await response.json();
    const token = data.access_token;

    const oneMonth = 30 * 24 * 60 * 60 * 1000;

    cookies().set("token", token, { maxAge: oneMonth, httpOnly: true });

    // return redirect("/dashboard");

    return { success: true };
  } catch (error) {
    throw new Error(JSON.stringify(error));
  }
};
