"use client";
import ButtonBack from "../components/buttonBack";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";

import { setLastInterface, setSessionTime, setBreakButton, setBreakTime, setIntervalBreak, setNecessaryButton } from "../features/answers/answersSlice";
import PTime from "../PersonalTime/page";
import styled from "styled-components";


export default function Time() {
  const router = useRouter();

  const dispatch = useDispatch();

  const oldInterface = useSelector((state) => state.answers.lastInterface);

  const timeSystem = useSelector((state) => state.answers.timeSystem);

  const changeInterface = () => {
    if (oldInterface != "/SetBook") {
      router.push("/home");
    } else {
      router.push(oldInterface);
    }
    dispatch(setLastInterface("/SetTime"));
  };

  const [estadoM, cambiarE] = useState(false);

  const [opciones, setOpciones] = useState(OpcionesPredeterminadas(timeSystem));

  function handleChange(e) {
    const { name, value } = e.target;
    setOpciones({
      ...opciones,
      [name]: value,
    });
  };

  function OpcionesPredeterminadas(sistema) {
    const myObj = {
      tiempoEstudio: 0,
      tiempoDescanso: 0,
      intervaloDescanso: 0,
      botonDescanso: true,
      botonPausa: true
    }
    myObj.tiempoEstudio = useSelector((state) => state.answers.sessionTime);
    if (sistema == 1) {

      
      myObj.tiempoDescanso = 10;
      myObj.intervaloDescanso = 50;
      myObj.botonDescanso = true;
      myObj.botonPausa = true;

    }
    else if (sistema == 2) {
      
      myObj.tiempoDescanso = 15;
      myObj.intervaloDescanso = 45;
      myObj.botonDescanso = false;
      myObj.botonPausa = false;

    }
    else {
      myObj.tiempoDescanso = 5;
      myObj.intervaloDescanso = 20;
      myObj.botonDescanso = false;
      myObj.botonPausa = false;

    }
    dispatch(setBreakTime(myObj.tiempoDescanso));
    dispatch(setIntervalBreak(myObj.intervaloDescanso));
    dispatch(setBreakButton(myObj.botonDescanso));
    dispatch(setNecessaryButton(myObj.botonPausa));
    return myObj;
  }

  function tiempoDeEstudio(e) {
    dispatch(setSessionTime(+e.target.value));
  }

  return (
    <>
      <div className="flex justify-start mt-10 ml-8">
        <ButtonBack
          texto={"Volver"}
          onClick={() => {
            changeInterface();
          }}
        />
      </div>
      <section className="flex flex-col items-center ">
        <h1 className="mt-15 mb-7 font-bold w-auto text-5xl">
          ¿Cuánto tiempo vas a estudiar?
        </h1>
        <div className="w-96 mb-12 h-px border border-t border-solid border-gray-line p-0 mx-auto"></div>
        <select
          className="mt-5 mb-10 bg-white focus:outline-none text-sky-blue font-bold py-2 px-4 rounded-xl text-xl border w-80 border-blue-text-button h-12 shadow-sm shadow-purple-text"
          onChange={(e) => tiempoDeEstudio(e)}
        >
          <option value="60">1 hora</option>
          <option value="120">2 horas</option>
          <option value="180">3 horas</option>
          <option value="240">4 horas</option>
          <option value="300">5 horas</option>
        </select>
        <ButtonBack texto='Continuar' onClick={() => { cambiarE(!estadoM); }} />
      </section>
      <PTime estado={estadoM}
        cambioEstado={cambiarE}>
        <Enca>
          {/*<div>
            <h1> Tiempo de estudio  </h1>
            <input type="text" value={opciones.tiempoEstudio} name="tiempoEstudio" onChange={handleChange}  ></input>
        </div>*/}
          <div>
            <h1> Tiempo de descanso  </h1>
            <input type="text" value={opciones.tiempoDescanso} name="tiempoDescanso" onChange={handleChange}  ></input>
          </div>
          <div>
            <h1> Intervalo de descansos  </h1>
            <input type="text" value={opciones.intervaloDescanso} name="intervaloDescanso" onChange={handleChange}  ></input>
          </div>
          <div>
            <h1> Botón descanso  </h1>
            <input type="checkbox" checked={opciones.botonDescanso} name="botonDescanso" onChange={handleChange}  ></input>
          </div>
          <div>
            <h1> Botón pausa necesaria  </h1>
            <input type="checkbox" checked={opciones.botonPausa} name="botonPausa" onChange={handleChange} ></input>
          </div>

        </Enca>
      </PTime>
    </>
  );
}

const Enca = styled.div`
        display: table;
        
        div
        {
          display: table-row
        }

        input
        {
          border: 1px solid #00b;
          display: table-cell ;
          width: 25%;
          padding: 1px 10px;
          margin: 0 0 5px 0;

        }

        h1
        {
          padding: 1px 10px;
          display: table-cell;
        }
       
    `;

