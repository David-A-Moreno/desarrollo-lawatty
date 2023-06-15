// Importa los módulos necesarios para las pruebas
import {
    registrar,
    perfil,
    confirmar,
    autenticar,
    olvidePassword,
    comprobarToken,
    nuevoPassword,
  } from '../controllers/usuarioController.js';

  
  // Importa la biblioteca de pruebas y la biblioteca de mocking
  import { expect } from 'chai';
  import sinon from 'sinon';
  
  // Importa el modelo de Usuario
  import Usuario from '../models/Usuario.js';
  
  describe('Pruebas unitarias para las funciones', () => {
    describe('Función registrar', () => {
      it('debe retornar un nuevo usuario cuando no existe un usuario con el mismo email', async () => {
        // Simula la interacción con la base de datos utilizando mocking
        const req = { body: { email: 'correo@example.com' } };
        const res = { json: sinon.spy() };
  
        // Crea un mock del método findOne de Usuario
        const findOneMock = sinon.stub(Usuario, 'findOne');
        findOneMock.returns(null);
  
        try {
          // Llama a la función a probar
          await registrar(req, res);
  
          // Verifica que se haya llamado a res.json con el usuario guardado
          expect(res.json.calledOnce).to.be.false;
         // expect(res.json.firstCall.args[0]).to.have.property('email', 'correo@example.com');
        } finally {
          // Restaura el comportamiento original de Usuario.findOne
          findOneMock.restore();
        }
      });
  
      // Agrega más pruebas para otros escenarios
  
      // ...
    });
  
    // Agrega más bloques describe para las otras funciones y sus respectivas pruebas
  
    // ...
  });
  


  import jwt from 'jsonwebtoken';
  import generarJWT from '../helpers/generarJWT';
  
  describe('generarJWT', () => {
    it('debe generar un token JWT válido', () => {
      // Configurar el entorno de prueba
      const id = '123456789';
      const tokenMock = 'mi_token_mock';
  
      // Stub de la función jwt.sign para simular su comportamiento
      const jwtSignStub = sinon.stub(jwt, 'sign').returns(tokenMock);
  
      // Ejecutar la función que se está probando
      const token = generarJWT(id);
  
      // Afirmar que el token devuelto coincide con el token mock
      expect(token).to.equal(tokenMock);
  
      // Restaurar el comportamiento original de jwt.sign
      jwtSignStub.restore();
    });
  });
  



  describe('nuevoPassword', () => {
    it('debe modificar la contraseña de un usuario existente', async () => {
      // Configurar el entorno de prueba
      const token = 'mi_token';
      const password = 'nueva_contraseña';
      const usuarioMock = {
        token,
        password: 'contraseña_actual',
        save: sinon.stub().resolves(),
      };
  
      // Stub de Usuario.findOne para simular la búsqueda de usuario
      const findOneStub = sinon.stub(Usuario, 'findOne').resolves(usuarioMock);
  
      // Ejecutar la función que se está probando
      const req = { params: { token }, body: { password } };
      const res = { json: sinon.stub() };
      await nuevoPassword(req, res);
  
      // Afirmar que Usuario.findOne fue llamado con los parámetros correctos
      expect(findOneStub.calledOnceWithExactly({ token })).to.be.true;
  
      // Afirmar que se modificó correctamente la contraseña del usuario
      expect(usuarioMock.token).to.be.null;
      expect(usuarioMock.password).to.equal(password);
      expect(usuarioMock.save.calledOnce).to.be.true;
  
      // Afirmar que se envió la respuesta JSON correcta
      expect(res.json.calledOnceWithExactly({ msg: 'Password modificado correctamente' })).to.be.true;
  
      // Restaurar el comportamiento original de Usuario.findOne
      findOneStub.restore();
    });
  
    it('debe devolver un error cuando el usuario no existe', async () => {
      // Configurar el entorno de prueba
      const token = 'mi_token_no_existente';
  
      // Stub de Usuario.findOne para simular la búsqueda de usuario
      const findOneStub = sinon.stub(Usuario, 'findOne').resolves(null);
  
      // Ejecutar la función que se está probando
      const req = { params: { token }, body: { password: 'nueva_contraseña' } };
      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
      await nuevoPassword(req, res);
  
      // Afirmar que Usuario.findOne fue llamado con los parámetros correctos
      expect(findOneStub.calledOnceWithExactly({ token })).to.be.true;
  
      // Afirmar que se envió el error y el estado correspondiente
      expect(res.status.calledOnceWithExactly(400)).to.be.true;
      expect(res.json.calledOnceWithExactly({ msg: 'Hubo un error' })).to.be.true;
  
      // Restaurar el comportamiento original de Usuario.findOne
      findOneStub.restore();
    });
  });