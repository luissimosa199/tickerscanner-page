"use client";
import { login } from "@/utils/login";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { useFormStatus } from "react-dom";

const Login = () => {
  const [loginError, setLoginError] = useState<string | null>(null);
  const { pending } = useFormStatus();
  const formRef = useRef<HTMLFormElement | null>(null);
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    const response = await login(formData);

    if (!response.success && response.error) {
      setLoginError(response.error);
    } else {
      router.push("/dashboard");
    }

    formRef.current?.reset();
  };

  return (
    <main className="bg-red-500">
      <section className="h-screen w-screen pt-4">
        <h1 className="font-bold text-2xl text-white text-center">
          Ingresa tus datos
        </h1>
        <form
          ref={formRef}
          className="flex flex-col gap-2 justify-center items-center mt-6"
          action={handleSubmit}
        >
          <label
            htmlFor="email"
            className="text-white capitalize"
          >
            email
          </label>
          <input
            name="email"
            id="email"
            type="email"
            className="rounded-full px-4 py-2"
          />

          <label
            htmlFor="password"
            className="text-white capitalize"
          >
            password
          </label>
          <input
            name="password"
            id="password"
            type="password"
            className="rounded-full px-4 py-2"
          />

          <button
            className="bg-white rounded-full px-6 py-4 w-2/3 sm:max-w-xs text-red-500 text-center text-lg font-bold mt-12"
            type="submit"
            disabled={pending}
          >
            {pending ? "Verificando..." : "Ingresar"}
          </button>
        </form>

        <div className="mt-4">
          <p className="text-white text-2xl text-center">{loginError}</p>
        </div>
      </section>
    </main>
  );
};

export default Login;
