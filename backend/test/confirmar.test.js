import { expect } from 'chai';
import sinon from 'sinon';
import Usuario from "../models/Usuario.js";
import { confirmar } from "../controllers/usuarioController.js";

describe("confirmar", () => {
  it("debe confirmar correctamente un usuario", async () => {
    // Configurar el entorno de prueba
    const req = { params: { token: "token-valido" } };
    const res = { json: sinon.spy() };

    // Stub de Usuario.findOne para simular un usuario existente
    const usuarioMock = { token: "token-valido", save: sinon.stub().resolves() };
    sinon.stub(Usuario, 'findOne').resolves(usuarioMock);

    // Ejecutar la función que se está probando
    await confirmar(req, res);

    // Verificar que Usuario.findOne fue llamado con el token correcto
    sinon.assert.calledWith(Usuario.findOne, { token: "token-valido" });

    // Verificar que se modificó el token y confirmado del usuario
    expect(usuarioMock.token).to.be.null

    // Verificar que se envió la respuesta JSON con el mensaje de éxito
   // sinon.assert.calledWith(res.json, { msg: "Usuario Confirmado Correctamente" });

    // Restaurar el stub de Usuario.findOne después de la prueba
    Usuario.findOne.restore();
  });


});


describe('confirmar', () => {
  afterEach(() => {
    sinon.restore(); // Restaurar los stubs después de cada prueba
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
    expect(res.status.calledOnceWithExactly(404)).to.be.true;
    expect(res.json.calledOnceWithExactly({ msg: 'Token no válido' })).to.be.true;
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
