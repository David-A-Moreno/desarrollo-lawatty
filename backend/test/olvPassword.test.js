import { expect } from 'chai';
import sinon from 'sinon';
import Usuario from "../models/Usuario.js";
import { olvidePassword } from "../controllers/usuarioController.js";

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
    expect(res.json.calledOnceWithExactly({ msg: 'Hemos enviado un email con las instrucciones' })).to.be.true;

    // Afirmar que se actualizó correctamente el token y se guardó el usuario
    expect(usuarioMock.token).to.exist;
    expect(usuarioMock.save.calledOnce).to.be.true;

    // Restaurar el comportamiento original de Usuario.findOne
    findOneStub.restore();
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

    expect(console.log.calledWithExactly(error)).to.be.true;

    sinon.restore();
  });
});


