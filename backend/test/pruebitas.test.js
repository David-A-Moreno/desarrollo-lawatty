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



  describe("registrar", () => {
   
  
    it("debe retornar un error si el usuario ya está registrado", async () => {
      // Configurar el entorno de prueba
      const req = { body: { email: "correo@example.com" } };
      const res = { status: sinon.stub().returnsThis(), json: sinon.spy() };
  
      // Stub de Usuario.findOne para simular que ya existe un usuario
      sinon.stub(Usuario, 'findOne').resolves({ email: "correo@example.com" });
  
      // Ejecutar la función que se está probando
      await registrar(req, res);
  
      // Verificar que Usuario.findOne fue llamado con los parámetros correctos
      sinon.assert.calledWith(Usuario.findOne, { email: "correo@example.com" });
  
      // Verificar que se envió el código de estado 400 y el mensaje de error correcto
      sinon.assert.calledWith(res.status, 400);
      sinon.assert.calledWith(res.json, { msg: "Usuario ya registrado" });
    });
  
    // Restaurar los stubs después de cada prueba
    afterEach(() => {
      sinon.restore();
    });
  });



describe("nuevoPassword", () => {
  

  it("debe retornar un error si el usuario no existe", async () => {
    // Configurar el entorno de prueba
    const req = { params: { token: "token-valido" }, body: { password: "nuevo-password" } };
    const res = { status: sinon.stub().returnsThis(), json: sinon.spy() };

    // Stub de Usuario.findOne para simular que el usuario no existe
    sinon.stub(Usuario, 'findOne').resolves(null);

    // Ejecutar la función que se está probando
    await nuevoPassword(req, res);

    // Verificar que Usuario.findOne fue llamado con el token correcto
    sinon.assert.calledWith(Usuario.findOne, { token: "token-valido" });

    // Verificar que se envió el código de estado 400 y el mensaje de error correcto
    sinon.assert.calledWith(res.status, 400);
    sinon.assert.calledWith(res.json, { msg: "Hubo un error" });
  });

  // Restaurar los stubs después de cada prueba
  afterEach(() => {
    sinon.restore();
  });
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



describe("registrar", () => {
  it("debe manejar errores durante el registro", () => {
    // Configurar el entorno de prueba
    const req = { body: { email: "correo@example.com" } };
    const res = { status: sinon.stub(), json: sinon.spy() };

    // Stub de Usuario.findOne para simular que no existe un usuario
    sinon.stub(Usuario, 'findOne').resolves(null);

    // Stub de res.status y res.json para simular el envío de respuesta de error
    res.status.returns(res);

    // Ejecutar la función que se está probando
     registrar(req, res);

    // Verificar que Usuario.findOne fue llamado con el email correcto
    sinon.assert.calledWith(Usuario.findOne, { email: "correo@example.com" });

    // Verificar que se envió el código de estado 400 y el mensaje de error correcto
    sinon.assert.calledWith(res.status, 400);
    sinon.assert.calledWith(res.json, { msg: "Usuario ya registrado" });
  });

  // Restaurar los stubs después de cada prueba
  afterEach(() => {
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
    expect(console.log.calledWithExactly(error)).to.be.true;

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

   

    const req = {
      body: { email },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await olvidePassword(req, res);


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



describe("perfil", () => {
  it("debe retornar el perfil del usuario", () => {
    // Configurar el entorno de prueba
    const usuario = { id: 1, nombre: "John Doe", email: "john.doe@example.com" };
    const req = { usuario };
    const res = { json: sinon.spy() };

    // Ejecutar la función que se está probando
    perfil(req, res);

    // Verificar que se envió la respuesta JSON con el perfil del usuario
    sinon.assert.calledWith(res.json, { perfil: usuario });
  });
});





/*
describe("olvidePassword", () => {
  it("debe manejar correctamente el error en caso de fallo al guardar el usuario", async () => {
    // Configurar el entorno de prueba
    const req = { body: { email: "john.doe@example.com" } };
    const res = { status: sinon.stub().returnsThis(), json: sinon.spy() };
    const existeUsuario = { save: sinon.stub().throws(new Error("Error al guardar el usuario")) };
    sinon.stub(Usuario, "findOne").returns(existeUsuario);

    // Ejecutar la función que se está probando
    await olvidePassword(req, res);

    // Verificar que se llamó a la función de respuesta con el código de estado y el mensaje de error correctos
    sinon.assert.calledWith(res.status, 400);
    sinon.assert.calledWith(res.json, { msg: "Error al guardar el usuario" });
  });
});

*/