/**
 * @jest-environment jsdom
*/
import React from "react";
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useSelector } from 'react-redux';
import StudyPanel from '../src/app/StudyPanel/page.jsx';
import { useRouter } from "next/navigation";

import '@testing-library/jest-dom';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));



jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));

describe('StudyPanel component', () => {
  beforeEach(() => {
    useSelector.mockClear();
  });


  test("se cierra sesión al hacer clic en el botón 'Cerrar Sesión'", () => {
    const mockRouterPush = jest.fn();
    useRouter.mockReturnValue({
      push: mockRouterPush,
    });

    const { getByText } = render(<StudyPanel />);
    const closeButton = getByText("Cerrar Sesion");

    fireEvent.click(closeButton);

    expect(mockRouterPush).toHaveBeenCalledWith('/');
  });

  test('renders StudyPanel component', () => {
    render(<StudyPanel />);

    expect(screen.getByText('Estudiando...')).toBeInTheDocument();
    expect(screen.getByText('Descansar')).toBeInTheDocument();
  });


  test('changes inBreak state when break button is clicked', () => {
    render(<StudyPanel />);
    
    // Simula el clic en el botón de descanso
    fireEvent.click(screen.getByText('Descansar'));
    
    // Verifica que el estado inBreak cambie correctamente
    // Puedes acceder a los estados del componente utilizando técnicas de renderizado condicional
    // o mediante el uso de herramientas como react-testing-library
    expect(screen.getByText('Reanudar')).toBeInTheDocument();
  });


  test('clicking on "Suspender Sesión" button triggers navigation', () => {
    const mockRouterPush = jest.fn();
    useRouter.mockReturnValue({
      push: mockRouterPush,
    });

    render(<StudyPanel />);

    const suspenderButton = screen.getByText('Suspender Sesión');
    fireEvent.click(suspenderButton);

    expect(mockRouterPush).toHaveBeenCalledWith('/home');
  });


  // Agrega más pruebas unitarias según sea necesario para cubrir todos los casos y funcionalidades del componente
});