import { cookies } from "next/headers";
import Link from "next/link";
import React from "react";

const LoginLink = () => {
  const isLogged = cookies().has("token");

  return (
    <Link
      href="/login"
      className="text-gray-200 font-semibold"
    >
      {isLogged ? "Mis tickets" : "Ingresar"}
    </Link>
  );
};

export default LoginLink;
