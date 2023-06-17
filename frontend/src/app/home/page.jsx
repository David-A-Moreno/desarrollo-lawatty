"use client";

import Button from "../components/button.jsx";
import ButtonBack from "../components/buttonBack.jsx";
import React, { useEffect } from "react";
import { INFORMATION } from "../utilities/interfaceInformation.js";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import {
  setLastInterface,
  setSessionTime,
  setCurrentInfoPrincipalPage,
  setTimeSystem,
} from "../features/answers/answersSlice.js";

export default function Home() {
  const dispatch = useDispatch();

  const router = useRouter();

  const currentInfo = useSelector(
    (state) => state.answers.currentInfoPrincipalPage
  );

  const oldInterface = useSelector((state) => state.answers.lastInterface);

  const title = INFORMATION[currentInfo].title;

  const buttons = INFORMATION[currentInfo].buttons;

  const goBackButton = INFORMATION[currentInfo].goBackButton;

  useEffect(() => {
    dispatch(setLastInterface(INFORMATION[currentInfo].lastInteface));
  });

  const setGoBackButton = () => {
    if (goBackButton) {
      return (
        <ButtonBack
          texto={"Volver"}
          onClick={() => {
            changeInterface(oldInterface, false);
          }}
        />
      );
    }
    return <div className="ml-8 w-32 h-12"></div>;
  };

  const changeInterface = (nextInterface, isNewPage) => {
    if (isNewPage) {
      router.push(nextInterface);
    } else {
      dispatch(setCurrentInfoPrincipalPage(nextInterface));
    }
  };

  /*
    Define el tipo el sistema de tiempos de estudio y descanso que se va a utilizar
    dependiendo de lo que se respondio en las preguntas iniciales:

    1) 10 minutos de descanso en una hora donde el usuario elige cuando los toma (ESTÁ EL BOTON DESCANSO), este tiempo descanso no es acumulable con otras horas (ESTA EL BOTÓN DE PAUSA NECESARIA). Se puede tomar una pausa de emergencia que exceda los 10 minutos tomando los tiempos de descanso de las horas de estudio siguientes.
    2) 15 minutos fijos de descanso cada 45 minutos, cada dos horas ese descanso aumenta 5 minutos (NO HAY BOTON DESCANSO, NO HAY BOTON PAUSA NECESARIA)
    3) 5 minutos de descanso iniciales cada 25 minutos, este tiempo de descanso aumenta 5 minutos cada ronda de estudio hasta un maximo de 20 minutos (NO HAY BOTON DESCANSO, NO HAY BOTON PAUSA NECESARIA)
  */

  const updateInformation = (indexButton, nextInterface) => {
    if (currentInfo == 0) {
      //Si estamos en la interfaz 0
      if (indexButton == 1) {
        //Si pulsamos en los botones 1 o 2
        changeInterface(nextInterface, true);
        dispatch(setTimeSystem(4)); //Se usara el sistema de tiempos 4
      } else {
        changeInterface(nextInterface, false);
      }
    } else if (currentInfo == 1) {
      changeInterface(nextInterface, false);
    } else if (currentInfo == 2) {
      if (indexButton == 0) {
        dispatch(setTimeSystem(2));
      } else {
        dispatch(setTimeSystem(3));
      }
      changeInterface(nextInterface, true);
    } else {
      if (indexButton == 0) {
        dispatch(setTimeSystem(1));
      } else {
        dispatch(setTimeSystem(2));
      }
      changeInterface(nextInterface, true);
    }
  };

  return (
    <>
      <div className="flex justify-start mt-10 ml-8">{setGoBackButton()}</div>
      <section className="flex flex-col items-center ">
        <h1 className="mt-15 mb-7 font-bold w-auto text-5xl">{title} </h1>
        <div className="w-96 mb-12 h-px border border-t border-solid border-gray-line p-0 mx-auto"></div>
        <div className="flex flex-col gap-5 mb-5">
          {buttons.map((button, index) => (
            <Button
              key={index}
              texto={button.optionTitle}
              widht={80}
              onClick={() => {
                updateInformation(index, button.nextInterface);
              }}
            />
          ))}
        </div>
      </section>
    </>
  );
}
