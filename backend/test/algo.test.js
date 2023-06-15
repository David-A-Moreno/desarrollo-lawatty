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
    expect(usuarioMock.token).to.equal("token-valido");

    // Verificar que se envió la respuesta JSON con el mensaje de éxito
   // sinon.assert.calledWith(res.json, { msg: "Usuario Confirmado Correctamente" });

    // Restaurar el stub de Usuario.findOne después de la prueba
    Usuario.findOne.restore();
  });

  it("debe retornar un error si el token no es válido", async () => {
    // Configurar el entorno de prueba
    const req = { params: { token: "token-invalido" } };
    const res = { status: sinon.stub(), json: sinon.spy() };

    // Stub de Usuario.findOne para simular que no existe un usuario con el token dado
    sinon.stub(Usuario, 'findOne').resolves(null);

    // Ejecutar la función que se está probando
    await confirmar(req, res);

    // Verificar que Usuario.findOne fue llamado con el token correcto
    sinon.assert.calledWith(Usuario.findOne, { token: "token-invalido" });

    // Restaurar el stub de Usuario.findOne después de la prueba
    Usuario.findOne.restore();
  });
});
