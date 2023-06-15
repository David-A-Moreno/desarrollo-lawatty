/*import { expect } from 'chai';
import sinon from 'sinon';
import Usuario from "../models/Usuario.js";
import { autenticar } from "../controllers/usuarioController.js";

describe("autenticar", () => {
 

  it("debe retornar un error si el usuario no existe", async () => {
    // Configurar el entorno de prueba
    const req = { body: { email: "usuario@example.com", password: "password123" } };
    const res = { status: sinon.stub(), json: sinon.spy() };


    const usuarioMock = { token: "token-valido", save: sinon.stub().resolves() };
    sinon.stub(Usuario, 'findOne').resolves(usuarioMock);

    // Ejecutar la función que se está probando
    await autenticar(req, res);

    // Verificar que Usuario.findOne fue llamado con el email correcto
    sinon.assert.calledWith(Usuario.findOne, { email: "usuario@example.com" });

    // Verificar que se envió el código de estado 404 y el mensaje de error correcto
    sinon.assert.calledWith(res.status, 404);
    sinon.assert.calledWith(res.json, { msg: "El usuario no existe" });

    // Restaurar el stub de Usuario.findOne después de la prueba
    Usuario.findOne.restore();
  });

});
*/