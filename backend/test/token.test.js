import { expect } from 'chai';
import sinon from 'sinon';
import Usuario from "../models/Usuario.js";
import { comprobarToken } from "../controllers/usuarioController.js";


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
/*
  it("debe retornar un mensaje de éxito si el token es válido y el usuario existe", async () => {
    // Configurar el entorno de prueba
    const req = { params: { token: "token-valido" } };
    const res = { json: sinon.spy() }; // Stub de Usuario.findOne para simular un usuario existente con el token dado
    sinon.stub(Usuario, 'findOne').resolves({ token: "token-valido" });
    
    // Ejecutar la función que se está probando
    await comprobarToken(req, res);
    
    // Verificar que Usuario.findOne fue llamado con el token correcto
    sinon.assert.calledWith(Usuario.findOne, { token: "token-valido" });
    
    // Verificar que se envió la respuesta JSON con el mensaje de éxito
    sinon.assert.calledWith(res.json, { msg: "Token válido y el usuario existe" });

    // Restaurar el stub de Usuario.findOne después de la prueba
    Usuario.findOne.restore();
   });*/


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