'use client';
/*
import ButtonBack from "../components/buttonBack";
import { useRouter } from "next/navigation";
import styled from "styled-components";

export default function PTime({children,estado,cambioEstado}) {
    const router = useRouter();
    //ponerle de fondo la pestaña anterior de seleccionar tiempo
  return (
    <>
    {estado && 
        <Overlay>
            <Contenedor>
                    <Encabezado>
                        <h6>Los tiempos asignados son</h6>
                    </Encabezado>
                    <B>Cancelar</B>
                    <Enca>
                       {children} 
                    </Enca>
                        
                    
                    
                    <ButtonBack  texto="Continuar" onClick={() => {
                                                        router.push('/StudyPanel');
                                                             }}
                    />
            </Contenedor>
        </Overlay>
    }
    </>
  );
}


    const Overlay = styled.div`
        
        height: 100vh;
        width: 100vw;
        position: fixed;
        top:0;
        left: 0;
        background: rgba(0,0,0,.5);

        padding: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
    `;

    const Contenedor = styled.div`
        width: 500px;
        min-height: 300px;
        background: #fff;
        position: relative;        
        border-radius: 5px;
        box-shadow: rgba(100,100,111,0.2) 0px 7px 29px 0px;
        padding:20px;


    `;

    const Encabezado = styled.div`
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20px;
        padding-bottom:20px;
        border-bottom: 1px solid #E8E8E8;
        
        font-weight:bold;
        font-size:20px;
        font-family:Helvetica,Futura,Arial,Verdana,sans-serif;
        
       
    `;

    const B  = styled.button`
    position: absolute;
    background: #fff;
    top: 20px;
    right: 20px;

    width: 70px;
    height: 30px;
    border: none;
    background: none;
    cursor: pointer;
    transition: .3s ease all;
    border-radius: 5px;
    color: #1766DC;

    &:hover {
        background: #f2f;
    }

    
   
`;


const Enca = styled.div`
       display: flex;
        align-items: center;
        justify-content: center;
        align: center;
        width: 600px;
        height: 200px;
        
       
    `;*/
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