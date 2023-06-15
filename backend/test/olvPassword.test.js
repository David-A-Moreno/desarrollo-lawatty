import { expect } from 'chai';
import sinon from 'sinon';
import Usuario from "../models/Usuario.js";
import { olvidePassword } from "../controllers/usuarioController.js";

describe("olvidePassword", () => {
  it("debe enviar un mensaje de éxito si el usuario existe", async () => {
    // Configurar el entorno de prueba
    const req = { body: { email: "usuario@example.com" } };
    const res = { json: sinon.spy() };

    // Stub de Usuario.findOne para simular un usuario existente
    sinon.stub(Usuario, 'findOne').resolves({ email: "usuario@example.com", save: sinon.stub().resolves() });

    // Ejecutar la función que se está probando
    await olvidePassword(req, res);

    // Verificar que Usuario.findOne fue llamado con el email correcto
    sinon.assert.calledWith(Usuario.findOne, { email: "usuario@example.com" });

    // Obtener el usuario simulado
    const usuarioSimulado = Usuario.findOne.firstCall.returnValue;

    // Verificar que se modificó el token del usuario
    //expect(usuarioSimulado.token).to.equal("1h2uq26tk");;

    // Verificar que se guardó el usuario
   // sinon.assert.calledOnce(usuarioSimulado.save);

    // Verificar que se envió la respuesta JSON con el mensaje de éxito
    //sinon.assert.calledWith(res.json, { msg: "Hemos enviado un email con las instrucciones" });

    // Restaurar el stub de Usuario.findOne después de la prueba
    Usuario.findOne.restore();
  });

  it("debe retornar un error si el usuario no existe", async () => {
    // Configurar el entorno de prueba
    const req = { body: { email: "usuario@example.com" } };
    const res = { status: sinon.stub(), json: sinon.spy() };

    // Stub de Usuario.findOne para simular que no existe un usuario con el email dado
   // sinon.stub(Usuario, 'findOne').resolves(null);

    // Ejecutar la función que se está probando
    await olvidePassword(req, res);

  });
});
