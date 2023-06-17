/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PTime from '../src/app/PersonalTime/page';
import '@testing-library/jest-dom';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('PTime', () => {
  test('renders "Los tiempos asignados son" when estado is true', () => {
    render(<PTime estado={true} />);
    expect(screen.getByText('Los tiempos asignados son')).toBeInTheDocument();
  });
  
});

test('does not render children when estado is false', () => {
  render(<PTime estado={false} />);
  expect(screen.queryByText(/children/i)).not.toBeInTheDocument();
});

test('displays "Continuar" button when estado is true', () => {
  render(<PTime estado={true} />);
  expect(screen.getByText("Continuar")).toBeInTheDocument();
});

test('redirects to StudyPanel page when "Continuar" button is clicked', () => {
  const pushMock = jest.fn();
  jest.spyOn(require("next/navigation"), "useRouter").mockImplementation(() => ({
    push: pushMock,
  }));
  render(<PTime estado={true} />);
  const continuarButton = screen.getByText("Continuar");
  fireEvent.click(continuarButton);
  expect(pushMock).toHaveBeenCalledWith("/StudyPanel");
});

test('renders child components in modal when estado is true', () => {
  const child1Text = 'Child component 1';
  const child2Text = 'Child component 2';
  render(
    <PTime estado={true}>
      <div>{child1Text}</div>
      <div>{child2Text}</div>
    </PTime>
  );

  // encuentra los componentes secundarios dentro de la ventana modal
  const child1 = screen.getByText(child1Text);
  const child2 = screen.getByText(child2Text);

  // verifica que los componentes secundarios estén presentes
  expect(child1).toBeInTheDocument();
  expect(child2).toBeInTheDocument();
});

test('closes modal when clicking on overlay', () => {
  const cambioEstado = jest.fn();
  render(<PTime estado={true} cambioEstado={cambioEstado} />);
  const overlay = screen.getByTestId('overlay');
  fireEvent.click(overlay);
  
  expect(cambioEstado).toHaveBeenCalledWith(false);
  //expect(screen.queryByText(/Los tiempos asignados son/i)).not.toBeInTheDocument();
});



/*import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PTime from '../PersonalTime/page';

describe('PTime', () => {
  test('renders children when estado is true', () => {
    const mockCambioEstado = jest.fn();
    render(<PTime estado={true} cambioEstado={mockCambioEstado}><div>Child component</div></PTime>);
    const childComponent = screen.getByText('Child component');
    expect(childComponent).toBeInTheDocument();
  });

  test('does not render children when estado is false', () => {
    const mockCambioEstado = jest.fn();
    render(<PTime estado={false} cambioEstado={mockCambioEstado}><div>Child component</div></PTime>);
    const childComponent = screen.queryByText('Child component');
    expect(childComponent).toBeNull();
  });

  test('calls cambioEstado function when cancel button is clicked', () => {
    const mockCambioEstado = jest.fn();
    render(<PTime estado={true} cambioEstado={mockCambioEstado}><div>Child component</div></PTime>);
    const cancelButton = screen.getByText('Cancelar');
    userEvent.click(cancelButton);
    expect(mockCambioEstado).toHaveBeenCalled();
  });

  test('navigates to StudyPanel page when continue button is clicked', () => {
    const mockPush = jest.fn();
    const mockRouter = { push: mockPush };
    jest.spyOn(require('next/router'), 'useRouter').mockImplementation(() => mockRouter);
    render(<PTime estado={true}><div>Child component</div></PTime>);
    const continueButton = screen.getByText('Continuar');
    userEvent.click(continueButton);
    expect(mockPush).toHaveBeenCalledWith('/StudyPanel');
  });
});
*/