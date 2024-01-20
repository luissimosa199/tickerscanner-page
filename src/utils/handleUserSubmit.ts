"use server";

export const handleUserSubmit = async (
  prevState: {
    success: boolean;
    message: string;
  },
  formData: FormData
): Promise<{
  success: boolean;
  message: string;
}> => {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    if (name && email && password) {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_TICKER_APP_URL}/auth/register`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        return {
          success: true,
          message: "Usuario registrado con éxito",
        };
      } else {
        return {
          success: false,
          message: data.error || "Error",
        };
      }
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        success: false,
        message: error.message || "Error",
      };
    } else {
      return {
        success: false,
        message: `${error}`,
      };
    }
  }

  throw new Error("Invalid form data");
};
