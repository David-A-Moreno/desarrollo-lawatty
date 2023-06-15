"use client";
    import React from "react";
    import ButtonBack from "../components/buttonBack";
    import { useRouter } from "next/navigation";

export default function PTime({children,estado,cambioEstado}) {
    const router = useRouter();
    //ponerle de fondo la pestaña anterior de seleccionar tiempo
  return (
    <>
    {estado && 
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" >
            <div className="bg-white rounded-lg shadow-lg p-6 space-y-6" >
                <div className="flex items-center justify-between pb-6 border-b border-gray-300" >
                    <h6 className="font-bold text-2xl">Los tiempos asignados son</h6>
                    <button data-testid="overlay" className="text-blue-600 hover:bg-gray-200 rounded-lg px-3 py-1 transition duration-300 ease-in-out" onClick={() => cambioEstado(false)}>Cancelar</button>
                </div>
                <div className="flex flex-col items-center justify-center space-y-6">
                    {children}
                </div>
                <ButtonBack texto="Continuar" onClick={() => router.push('/StudyPanel')} />
            </div>
        </div>
    }
    </>
  );
}