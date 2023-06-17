/**
 * @jest-environment jsdom
 */


import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginPage from "../src/app/page";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toHaveValue } from "@testing-library/jest-dom";


jest.mock("axios");
jest.mock("next/navigation");

describe("LoginPage", () => {
  test("should initialize state correctly", () => {
  render(<LoginPage />);
  

  // Verificar que los estados se inicialicen correctamente
  expect(screen.getByPlaceholderText("Correo Electrónico")).toHaveValue("");
  expect(screen.getByPlaceholderText("Contraseña")).toHaveValue("");
});


  test("should update state on input change", () => {
    render(<LoginPage />);
    
    // Simular cambios en los campos de entrada
    fireEvent.change(screen.getByPlaceholderText("Correo Electrónico"), { target: { value: "test@example.com" } });
    fireEvent.change(screen.getByPlaceholderText("Contraseña"), { target: { value: "password" } });
    
    // Verificar que los estados se actualicen correctamente
    expect(screen.getByPlaceholderText("Correo Electrónico")).toHaveValue("test@example.com");
    expect(screen.getByPlaceholderText("Contraseña")).toHaveValue("password");
  });

});



describe("LoginPage", () => {
  test("should handle login successfully", async () => {
    // Configurar el mock del router
    const pushMock = jest.fn();
    useRouter.mockReturnValue({
      push: pushMock,
    });

    // Configurar el mock de axios
    axios.post.mockResolvedValueOnce(); // Mockear la llamada a axios.post

    // Renderizar el componente LoginPage
    render(<LoginPage />);

    // Obtener los elementos de input y el botón de envío
    const emailInput = screen.getByPlaceholderText("Correo Electrónico");
    const passwordInput = screen.getByPlaceholderText("Contraseña");
    const submitButton = screen.getByText("Iniciar sesión");

    // Simular el ingreso de datos en los campos de input
    fireEvent.change(emailInput, { target: { value: "mm@gmail.com" } });
    fireEvent.change(passwordInput, { target: { value: "1111" } });

    // Simular el envío del formulario
    fireEvent.click(submitButton);

    // Esperar a que se complete la llamada a axios.post y se redireccione
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        "https://desarrollo-lawatty-backend.vercel.app/api/usuarios/login",
        {
          email: "mm@gmail.com",
          password: "1111",
        }
      );
      expect(pushMock).toHaveBeenCalledWith("/home"); // Verificar la redirección al home
    });
  });

  // Agregar más pruebas según sea necesario
});


import swal from "sweetalert"; // Importa la biblioteca para simular la alerta


jest.mock("sweetalert"); // Mockear la biblioteca swal

describe("LoginPage3", () => {
  test("should display error message on login failure", async () => {
    

    // Configurar el mock de axios
    axios.post.mockRejectedValueOnce(); // Mockear la llamada a axios.post

    // Renderizar el componente LoginPage
    render(<LoginPage />);

    // Obtener los elementos de input y el botón de envío
    const emailInput = screen.getByPlaceholderText("Correo Electrónico");
    const passwordInput = screen.getByPlaceholderText("Contraseña");
    const submitButton = screen.getByText("Iniciar sesión");

    // Simular el ingreso de datos en los campos de input
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    // Simular el envío del formulario
    fireEvent.click(submitButton);

    // Esperar a que se complete la llamada a axios.post y se muestre la alerta de error
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        "https://desarrollo-lawatty-backend.vercel.app/api/usuarios/login",
        {
          email: "test@example.com",
          password: "password123",
        }
      );
      
    });

    /*await waitFor(() => {
      expect(swal).toHaveBeenCalledWith({
        title: 'Error',
        icon: 'warning',
        button: 'Aceptar',
      });
    });*/
  });

  // Agregar más pruebas según sea necesario
});