"use client";
import React, { useState } from "react";
import Register from "./components/registerModal";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
  
    axios.post("https://desarrollo-lawatty-backend-mionrlzdc-david-a-moreno.vercel.app", { email, password })
      .then(async () => {
        

         router.push('/home')
      })
      .catch(async (error) => {
        await swal({
          title: "Credenciales invalidas",
          icon: "warning",
          button: "Aceptar"
        });
      });
  };


  return (
    <div className="min-h-full flex items-center justify-center mt-32 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-6xl font-extrabold text-gray-900">
            Lawatty
          </h2>
        </div>
        <form className="mt-8 space-y-6" data-testid="login-form" onSubmit={handleLogin}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="none"
                required
                className="appearence-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500
                             text-gray-900 rounded-t-md mb-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Correo Electrónico"
              />
            </div>

            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="none"
                required
                className="appearence-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500
                            text-gray-900 rounded-t-md mb-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:<-10 sm:text-sm"
                placeholder="Contraseña"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-900">
                Recuerdame
              </label>
            </div>

            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Olvidé mi contraseña
              </a>
            </div>
          </div>

          <div>
            <button data-testid="login-button" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-text-button shadow-sm shadow-purple-text">
              Iniciar sesión
            </button>
          </div>
          <div>
            <button className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md border-gray bg-gray-line shadow-sm shadow-purple-text ">
              Iniciar sesión con Google
            </button>
          </div>
        </form>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <a
              href="#"
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-900">
              ¿No tienes cuenta?
            </label>
          </div>

          <Register/>
        </div>
      </div>
    </div>
  );
}