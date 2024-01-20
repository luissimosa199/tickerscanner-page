"use client";
import { handleUserSubmit } from "@/utils/handleUserSubmit";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef } from "react";
import { useFormState, useFormStatus } from "react-dom";

const Register = () => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const router = useRouter();
  const initialState = {
    success: false,
    message: "",
  };

  const { pending } = useFormStatus();
  const [state, formAction] = useFormState(handleUserSubmit, initialState);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;

    if (state.success) {
      formRef.current?.reset();
      timeoutId = setTimeout(() => {
        router.push("/login");
      }, 2000);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [state, router]);

  return (
    <main className="bg-red-500">
      <section className="h-screen w-screen pt-4">
        <h1 className="font-bold text-2xl text-white text-center">
          ¡Bienvenido!
        </h1>
        <form
          className="flex flex-col gap-2 justify-center items-center mt-6"
          action={formAction}
        >
          <label
            htmlFor="name"
            className="text-white capitalize"
          >
            nombre
          </label>
          <input
            name="name"
            id="name"
            type="name"
            className="rounded-full px-4 py-2"
          />
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
            contraseña
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
            {pending ? "Verificando..." : "Registrarme"}
          </button>
        </form>

        <div className="mt-4">
          <p className="text-white text-2xl text-center">{state.message}</p>
        </div>
      </section>
    </main>
  );
};

export default Register;
