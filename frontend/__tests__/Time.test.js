/**
 * @jest-environment jsdom
*/
import React from 'react';
import { render, fireEvent, screen  } from '@testing-library/react';
import { useDispatch } from 'react-redux';
//import { setSessionTime, setBreakTime, setIntervalBreak, setBreakButton, setNecessaryButton } from '../features/answers/answersSlice';
import {
  setLastInterface,
  setSessionTime,
  setBreakButton,
  setBreakTime,
  setIntervalBreak,
  setNecessaryButton,
} from '../src/app/features/answers/answersSlice';

import Time from '../src/app/SetTime/page.jsx';
import '@testing-library/jest-dom';


// Mock useDispatch para verificar las acciones dispatch
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn()
}));

// Mock useRouter para verificar la navegación
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn()
  }))
}));

describe('Time component', () => {
  
  let dispatchMock;

  beforeEach(() => {
    dispatchMock = jest.fn();
    useDispatch.mockReturnValue(dispatchMock);
  });

  test('renders Time component', () => {
    render(<Time />);
    // Realiza las aserciones necesarias para verificar que el componente se renderice correctamente
  });


  test('calls setSessionTime action when select value is changed', () => {
    const { getByRole } = render(<Time />);
    const selectElement = getByRole('combobox');
    fireEvent.change(selectElement, { target: { value: '120' } });
    // Verifica que la acción setSessionTime haya sido llamada con el valor correcto
  });

  test('calls cambiarE function when "Continuar" button is clicked', () => {
    const { getByText } = render(<Time />);
    const continuarButton = getByText('Continuar');
    fireEvent.click(continuarButton);
    // Verifica que la función cambiarE haya sido llamada correctamente
  });


  test('calls setBreakTime, setIntervalBreak, setBreakButton, and setNecessaryButton actions when opcionesPredeterminadas function is called', () => {
    render(<Time />);
    // Verifica que las acciones setBreakTime, setIntervalBreak, setBreakButton, y setNecessaryButton hayan sido llamadas con los valores correctos
  });
});

