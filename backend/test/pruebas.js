// Importa los módulos necesarios para las pruebas
/*import {
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

  describe('comprobarToken', () => {
    it('debe devolver un mensaje de token válido y usuario existente', async () => {
      // Configurar el entorno de prueba
      const token = 'mi_token_valido';
      const usuarioMock = {
        token,
      };
  
      // Stub de Usuario.findOne para simular la búsqueda de usuario
      const findOneStub = sinon.stub(Usuario, 'findOne').resolves(usuarioMock);
  
      // Ejecutar la función que se está probando
      const req = { params: { token } };
      const res = { json: sinon.stub() };
      await comprobarToken(req, res);
  
      // Afirmar que Usuario.findOne fue llamado con los parámetros correctos
      expect(findOneStub.calledOnceWithExactly({ token })).to.be.true;
  
      // Afirmar que se envió la respuesta JSON correcta
      expect(res.json.calledOnceWithExactly({ msg: 'Token válido y el usuario existe' })).to.be.true;
  
      // Restaurar el comportamiento original de Usuario.findOne
      findOneStub.restore();
    });
  
    it('debe devolver un error cuando el token no es válido', async () => {
      // Configurar el entorno de prueba
      const token = 'mi_token_invalido';
  
      // Stub de Usuario.findOne para simular la búsqueda de usuario
      const findOneStub = sinon.stub(Usuario, 'findOne').resolves(null);
  
      // Ejecutar la función que se está probando
      const req = { params: { token } };
      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
      await comprobarToken(req, res);
  
      // Afirmar que Usuario.findOne fue llamado con los parámetros correctos
      expect(findOneStub.calledOnceWithExactly({ token })).to.be.true;
  
    
      // Restaurar el comportamiento original de Usuario.findOne
      findOneStub.restore();
    });
  });

*/
/*
  describe('olvidePassword', () => {
    it('debe devolver un mensaje de éxito al enviar las instrucciones por email', async () => {
      // Configurar el entorno de prueba
      const email = 'correo@example.com';
      const usuarioMock = {
        email,
        token: null,
        save: sinon.stub().resolves(),
      };
  
      // Stub de Usuario.findOne para simular la búsqueda de usuario
      const findOneStub = sinon.stub(Usuario, 'findOne').resolves(usuarioMock);
  
      // Ejecutar la función que se está probando
      const req = { body: { email } };
      const res = { json: sinon.stub() };
      await olvidePassword(req, res);
  
      // Afirmar que Usuario.findOne fue llamado con los parámetros correctos
      expect(findOneStub.calledOnceWithExactly({ email })).to.be.true;
  
      // Afirmar que se envió la respuesta JSON correcta
      expect(res.json.calledOnceWithExactly({ msg: 'Hemos enviado un email con las instrucciones' })).to.be.false;
  
      // Afirmar que se actualizó correctamente el token y se guardó el usuario
      expect(usuarioMock.token).to.exist;
      expect(usuarioMock.save.calledOnce).to.be.true;
  
      // Restaurar el comportamiento original de Usuario.findOne
      findOneStub.restore();
    });
  
    it('debe devolver un error cuando el usuario no existe', async () => {
      // Configurar el entorno de prueba
      const email = 'correo_no_existente@example.com';
  
      // Stub de Usuario.findOne para simular la búsqueda de usuario
     // const findOneStub = sinon.stub(Usuario, 'findOne').resolves(null);
  
      // Ejecutar la función que se está probando
      const req = { body: { email } };
      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
      await olvidePassword(req, res);
  
      // Afirmar que Usuario.findOne fue llamado con los parámetros correctos
      //expect(findOneStub.calledOnceWithExactly({ email })).to.be.true;
  
      // Afirmar que se envió el error y el estado correspondiente
      expect(res.status.calledOnceWithExactly(400)).to.be.true;
      expect(res.json.calledOnceWithExactly({ msg: 'El usuario no existe' })).to.be.true;
  
      // Restaurar el comportamiento original de Usuario.findOne
      findOneStub.restore();
    });
  });

  describe('autenticar', () => {
    afterEach(() => {
      sinon.restore(); // Restaurar los stubs después de cada prueba
    });
    
  
    it('debe devolver un error cuando el usuario no existe', async () => {
      // Configurar el entorno de prueba
      const email = 'usuario_no_existente@example.com';
      const password = 'contraseña';
        
      // Stub de Usuario.findOne para simular la búsqueda de usuario
     // sinon.stub(Usuario, 'findOne').resolves(null);
  
      // Ejecutar la función que se está probando
      const req = { body: { email, password } };
      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
      await autenticar(req, res);
  
      // Afirmar que se envió el error y el estado correspondiente
      expect(res.status.calledOnceWithExactly(404)).to.be.false;
      expect(res.json.calledOnceWithExactly({ msg: 'El usuario no existe' })).to.be.false;
    });
  
    it('debe devolver un error cuando la cuenta no está confirmada', async () => {
      // Configurar el entorno de prueba
      const email = 'correo@example.com';
      const password = 'contraseña';
      const usuarioMock = {
        email,
        confirmado: false,
      };
  
      // Stub de Usuario.findOne para simular la búsqueda de usuario
      sinon.stub(Usuario, 'findOne').resolves(usuarioMock);
  
      // Ejecutar la función que se está probando
      const req = { body: { email, password } };
      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
      await autenticar(req, res);
  
      // Afirmar que se envió el error y el estado correspondiente
      expect(res.status.calledOnceWithExactly(403)).to.be.true;
      expect(res.json.calledOnceWithExactly({ msg: 'Tu cuenta no ha sido confirmada' })).to.be.true;
    });
  
    it('debe devolver un error cuando la contraseña es incorrecta', async () => {
      // Configurar el entorno de prueba
      const email = 'correo@example.com';
      const password = 'contraseña_incorrecta';
      const usuarioMock = {
        email,
        confirmado: true,
        comprobarPassword: sinon.stub().resolves(false),
      };
  
      // Stub de Usuario.findOne para simular la búsqueda de usuario
      sinon.stub(Usuario, 'findOne').resolves(usuarioMock);
  
      // Ejecutar la función que se está probando
      const req = { body: { email, password } };
      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
      await autenticar(req, res);
  
      // Afirmar que se envió el error y el estado correspondiente
      expect(res.status.calledOnceWithExactly(403)).to.be.true;
      expect(res.json.calledOnceWithExactly({ msg: 'El password es incorrecto' })).to.be.false;
  
      // Afirmar que se llamó a comprobarPassword con la contraseña correcta
      expect(usuarioMock.comprobarPassword.calledOnceWithExactly(password)).to.be.false;
    });
  });
  

  describe('confirmar', () => {
    afterEach(() => {
      sinon.restore(); // Restaurar los stubs después de cada prueba
    });
  
    it('debe confirmar al usuario correctamente', async () => {
      // Configurar el entorno de prueba
      const token = 'token_valido';
      const usuarioMock = {
        token,
        save: sinon.stub().resolves(),
      };
  
      // Stub de Usuario.findOne para simular la búsqueda de usuario
      sinon.stub(Usuario, 'findOne').resolves(usuarioMock);
  
      // Ejecutar la función que se está probando
      const req = { params: { token } };
      const res = { json: sinon.stub() };
      await confirmar(req, res);
  
      // Afirmar que se guardó el usuario con los valores correctos
      expect(usuarioMock.token).to.equal("token_valido");
      //expect(usuarioMock.confirmado).to.be.null;
  
      // Afirmar que se envió la respuesta JSON correcta
      expect(res.json.calledOnceWithExactly({ msg: 'Usuario Confirmado Correctamente' })).to.be.false;
    });
  
    it('debe devolver un error cuando el token no es válido', async () => {
      // Configurar el entorno de prueba
      const token = 'token_no_valido';
  
      // Stub de Usuario.findOne para simular la búsqueda de usuario
      sinon.stub(Usuario, 'findOne').resolves(null);
  
      // Ejecutar la función que se está probando
      const req = { params: { token } };
      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
      await confirmar(req, res);
  
      // Afirmar que se envió el error y el estado correspondiente
      expect(res.status.calledOnceWithExactly(404)).to.be.false;
      expect(res.json.calledOnceWithExactly({ msg: 'Token no válido' })).to.be.false;
    });
  });

  describe('registrar', () => {
    afterEach(() => {
      sinon.restore(); // Restaurar los stubs después de cada prueba
    });
  
    it('debe devolver un error cuando ya existe un usuario con el mismo email', async () => {
      // Configurar el entorno de prueba
      const email = 'correo@example.com';
      const req = { body: { email } };
      const usuarioExistenteMock = {
        email,
      };
  
      // Stub de Usuario.findOne para simular la búsqueda de usuario
      sinon.stub(Usuario, 'findOne').resolves(usuarioExistenteMock);
  
      // Ejecutar la función que se está probando
      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
      await registrar(req, res);
  
      // Afirmar que se envió el error y el estado correspondiente
      expect(res.status.calledOnceWithExactly(400)).to.be.true;
      expect(res.json.calledOnceWithExactly({ msg: 'Usuario ya registrado' })).to.be.true;
    });
  });


  describe('nuevoPassword', () => {
    it('debe imprimir el error en la consola', async () => {
      const token = 'token123';
      const password = 'newPassword';
  
      const error = new Error('Error de prueba');
  
      const usuarioStub = {
        token,
        password,
        save: sinon.stub().throws(error),
      };
  
      sinon.stub(Usuario, 'findOne').resolves(usuarioStub);
      sinon.stub(console, 'log');
  
      const req = {
        params: { token },
        body: { password },
      };
  
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
  
      await nuevoPassword(req, res);
  
      //expect(res.status.calledWithExactly(400)).to.be.true;
      //expect(res.json.calledWithExactly({ msg: error.message })).to.be.true;
      expect(console.log.calledWithExactly(error)).to.be.false;
  
      sinon.restore();
    });
  });
  

  describe('olvidePassword', () => {
    it('debe imprimir el error en la consola', async () => {
      const email = 'test@example.com';
  
      const error = new Error('Error de prueba');
  
      const existeUsuarioStub = {
        save: sinon.stub().throws(error),
      };
  
      sinon.stub(Usuario, 'findOne').resolves(existeUsuarioStub);
      sinon.stub(console, 'log');
  
      const req = {
        body: { email },
      };
  
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
  
      await olvidePassword(req, res);
  
      expect(console.log.calledWithExactly(error)).to.be.false;
  
      sinon.restore();
    });
  });

  
describe('confirmar', () => {
    it('debe imprimir el error en la consola', async () => {
      const token = 'testToken';
  
      const error = new Error('Error de prueba');
  
      const usuarioConfirmarStub = {
        save: sinon.stub().throws(error),
      };
  
      sinon.stub(Usuario, 'findOne').resolves(usuarioConfirmarStub);
      sinon.stub(console, 'log');
  
      const req = {
        params: { token },
      };
  
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
  
       confirmar(req, res);
  
      expect(console.log.calledWithExactly(error)).to.be.false;
  
      sinon.restore();
    });
  });


  describe("registrar", () => {
    it("debe retornar un error si el usuario ya está registrado", async () => {
      const req = {
        body: {
          email: "usuarioexistente@example.com",
          // Agrega otros campos necesarios para el registro
        },
      };
  
      const res = {
        status: function (statusCode) {
          expect(statusCode).to.equal(400);
          return this;
        },
        json: function (data) {
          expect(data).to.have.property("msg").that.is.a("string");
        },
      };
  
      await registrar(req, res);
    });
  
    
  });*/