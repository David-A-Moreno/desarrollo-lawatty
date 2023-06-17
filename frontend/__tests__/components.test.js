/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Button from '../src/app/components/button.jsx';
import ButtonBack from '../src/app/components/buttonBack';
import ExitButton from '../src/app/components/exitButton';

import Timer from '../src/app/components/timer.jsx';

//import Modal from '../components/registerModal';
import '@testing-library/jest-dom';
import axios from 'axios';
import swal from 'sweetalert';


test('Button component renders without crashing', () => {
  render(<Button texto="Click me" />);
  const buttonElement = screen.getByRole('button');
  expect(buttonElement).toBeInTheDocument();
});

test('Button component renders the correct text', () => {
  const text = 'Click me';
  render(<Button texto={text} />);
  const buttonElement = screen.getByRole('button');
  expect(buttonElement).toHaveTextContent(text);
});

test('Button component calls the onClick function when clicked', () => {
  const onClick = jest.fn();
  render(<Button texto="Click me" onClick={onClick} />);
  const buttonElement = screen.getByRole('button');
  fireEvent.click(buttonElement);
  expect(onClick).toHaveBeenCalledTimes(1);
});


test('renderiza correctamente el componente Timer', () => {
  // Configurar los datos de prueba
  const hour = 1;
  const min = 30;
  const sec = 45;
  const borderColor = 'green-500';
  const textColor = 'green-700';

  // Renderizar el componente
  render(
    <Timer
      hour={hour}
      min={min}
      sec={sec}
      borderColor={borderColor}
      textColor={textColor}
    />
  );

  // Verificar que los elementos de texto estén presentes
  expect(screen.getByText(hour)).toBeInTheDocument();
  expect(screen.getByText('Hora')).toBeInTheDocument();
  expect(screen.getByText(min)).toBeInTheDocument();
  expect(screen.getByText('Minutos')).toBeInTheDocument();
  expect(screen.getByText(sec)).toBeInTheDocument();
  expect(screen.getByText('Segundos')).toBeInTheDocument();

  // Verificar que los estilos de borde y texto sean los correctos
  const hourElement = screen.getByText(hour);
  expect(hourElement).toHaveClass(`border-${borderColor}`);
  expect(hourElement).toHaveClass('text-4xl');
  expect(hourElement).toHaveClass('rounded-xl');

  const minElement = screen.getByText(min);
  expect(minElement).toHaveClass(`border-${borderColor}`);
  expect(minElement).toHaveClass('text-4xl');
  expect(minElement).toHaveClass('rounded-xl');

  const secElement = screen.getByText(sec);
  expect(secElement).toHaveClass(`border-${borderColor}`);
  expect(secElement).toHaveClass('text-4xl');
  expect(secElement).toHaveClass('rounded-xl');

  // Verificar que los estilos de texto tengan el color correcto
  expect(screen.getByText('Hora')).toHaveClass(`text-${textColor}`);
  expect(screen.getByText('Minutos')).toHaveClass(`text-${textColor}`);
  expect(screen.getByText('Segundos')).toHaveClass(`text-${textColor}`);
});



//------------------------ButtonBack-----------------------------
test('ButtonBack component renders the correct text', () => {
    const text = 'Go Back';
    const onClick = jest.fn(); // Create a mock function for the onClick event
  
    render(<ButtonBack texto={text} onClick={onClick} />);
    const buttonElement = screen.getByRole('button');
  
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement.textContent).toBe(text);
  });
  
  test('ButtonBack component triggers onClick event', () => {
    const text = 'Go Back';
    const onClick = jest.fn();
  
    render(<ButtonBack texto={text} onClick={onClick} />);
    const buttonElement = screen.getByRole('button');
  
    fireEvent.click(buttonElement);
  
    expect(onClick).toHaveBeenCalledTimes(1);
  });



  //-----------------ExitButton-------------------

  describe('ExitButton', () => {
    test('renders button correctly', () => {
      const onClickMock = jest.fn();
      const { getByRole } = render(<ExitButton onClick={onClickMock} />);
      const buttonElement = getByRole('button');
  
      expect(buttonElement).toBeInTheDocument();
      expect(buttonElement).toHaveClass('bg-suspend-session-button-color');
      expect(buttonElement).toHaveClass('text-white');
      // ...
    });
  
    test('calls onClick callback when clicked', () => {
      const onClickMock = jest.fn();
      const { getByRole } = render(<ExitButton onClick={onClickMock} />);
      const buttonElement = getByRole('button');
  
      fireEvent.click(buttonElement);
  
      expect(onClickMock).toHaveBeenCalled();
    });
  });
  

  //--------------------Modal-------------------


 //describe('Modal', () => {
    /*test('renders register modal correctly', () => {
      const { queryAllByText, getByRole } = render(<Modal />);
      expect(queryAllByText('Registrarse')).toHaveLength(0);
  
      fireEvent.click(getByRole('link', { name: 'Registrate' }));
  
      expect(queryAllByText('Registrarse')).toHaveLength(1);

      const modalTitle = getByText('Registrarse');
      const nombreInput = getByRole('textbox', { name: 'Nombre' });
      const emailInput = getByRole('textbox', { name: 'Correo electrónico' });
      const passwordInput = getByRole('textbox', { name: 'Contraseña' });
      const confirmPasswordInput = getByRole('textbox', { name: 'Confirmar Contraseña' });
      const registerButton = getByRole('button', { name: 'Registrarse' });
  
      expect(modalTitle).toBeInTheDocument();
      expect(nombreInput).toBeInTheDocument();
      expect(emailInput).toBeInTheDocument();
      expect(passwordInput).toBeInTheDocument();
      expect(confirmPasswordInput).toBeInTheDocument();
      expect(registerButton).toBeInTheDocument();
    });
  */
  /*   test('shows error message when form fields are empty', () => {
      const { getByText, getByRole } = render(<Modal />);
      const registerLink = getByText('Registrate');
  
      fireEvent.click(registerLink);
  
      const registerButton = getByRole('button', { name: 'Registrarse' });
  
      fireEvent.click(registerButton);
  
      const errorMessage = getByText('Por favor llene todos los campos');
      expect(errorMessage).toBeInTheDocument();
    });

    test('opens and closes the modal', () => {
        const { getByText, queryByText } = render(<Modal />);
      
        // Verifica que el modal esté cerrado inicialmente
        expect(queryByText('Registrarse')).toBeNull();
      
        // Haz clic en el enlace "Registrate" para abrir el modal
        fireEvent.click(getByText('Registrate'));
      
        // Verifica que el modal esté abierto
        expect(getByText('Registrarse')).toBeInTheDocument();
      
        // Haz clic en el botón de cierre para cerrar el modal
        fireEvent.click(getByRole('button', { name: 'Cerrar' }));
      
        // Verifica que el modal esté cerrado nuevamente
        expect(queryByText('Registrarse')).toBeNull();
      });

      test('submits the registration form', () => {
        const { getByText, getByRole, getByLabelText } = render(<Modal />);
      
        // Haz clic en el enlace "Registrate" para abrir el modal
        fireEvent.click(getByText('Registrate'));
      
        // Completa los campos del formulario
        const nombreInput = getByLabelText('Nombre');
        const emailInput = getByLabelText('Correo electrónico');
        const passwordInput = getByLabelText('Contraseña');
        const confirmPasswordInput = getByLabelText('Confirmar Contraseña');
        fireEvent.change(nombreInput, { target: { value: 'John Doe' } });
        fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });
      
        // Haz clic en el botón de registro para enviar el formulario
        fireEvent.click(getByRole('button', { name: 'Registrarse' }));
      
        // Realiza las comprobaciones necesarias para verificar el éxito del registro
        // por ejemplo, puedes verificar si aparece un mensaje de éxito en la pantalla
        expect(getByText('¡Registro exitoso!')).toBeInTheDocument();
      });
      

    test('verifies password input in Modal component', () => {
        const { getByRole } = render(<Modal />);
      
        // Busca el elemento de contraseña por el atributo role y nombre
        const passwordInput = getByRole('textbox', { name: 'Contraseña' });
      
        // Verifica que se encuentre el elemento de contraseña correctamente
        expect(passwordInput).toBeInTheDocument();
      });

    test('registers successfully', async () => {
        const { getByText, getByRole } = render(<Modal />);
        const registerLink = getByText('Registrate');
      
        fireEvent.click(registerLink);
      
        const nombreInput = getByRole('textbox', { name: 'Nombre' });
        const emailInput = getByRole('textbox', { name: 'Correo electrónico' });
        const passwordInput = getByRole('textbox', { name: 'Contraseña' });
        const confirmPasswordInput = getByRole('textbox', { name: 'Confirmar Contraseña' });
        const registerButton = getByRole('button', { name: 'Registrarse' });
        fireEvent.change(nombreInput, { target: { value: 'John Doe' } });
        fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });
       
        axios.post.mockResolvedValue({ data: { msg: 'Registro exitoso' } });
       
        fireEvent.click(registerButton);
       
        await waitFor(() => {
          expect(swal).toHaveBeenCalledWith({
            title: 'Registro exitoso',
            icon: 'success',
          });
        });
    });

    test('shows error message when registration fails', async () => {
    const { getByText, getByRole } = render(<Modal />);
    const registerLink = getByText('Registrate');
    fireEvent.click(registerLink);

    

    const nombreInput = getByRole('textbox', { name: 'Nombre' });
    const emailInput = getByRole('textbox', { name: 'Correo electrónico' });
    const passwordInput = getByLabelText('Contraseña');
    const confirmPasswordInput = getByRole('textbox', { name: 'Confirmar Contraseña' });
    const registerButton = getByRole('button', { name: 'Registrarse' });
   
    fireEvent.change(nombreInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });
   
    axios.post.mockRejectedValue({ response: { data: { msg: 'Error' } } });
   
    fireEvent.click(registerButton);
   
    await waitFor(() => {
      expect(swal).toHaveBeenCalledWith({
        title: 'Error',
        icon: 'warning',
        button: 'Aceptar',
      });
    });
  });
      
  
    // ...
  });*/
  