/*import { expect } from 'chai';
import sinon from 'sinon';
import Usuario from "../models/Usuario.js";
import { comprobarToken } from "../controllers/usuarioController.js";

describe("comprobarToken", () => {
  it("debe retornar un mensaje de éxito si el token es válido y el usuario existe", async () => {
    // Configurar el entorno de prueba
    const req = { params: { token: "token-valido" } };
    const res = { json: sinon.spy() };

    // Stub de Usuario.findOne para simular un usuario existente con el token dado
    sinon.stub(Usuario, 'findOne').resolves({ token: "token-valido" });

    // Ejecutar la función que se está probando
    await comprobarToken(req, res);

    // Verificar que Usuario.findOne fue llamado con el token correcto
    sinon.assert.calledWith(Usuario.findOne, { token: "token-valido" });

    // Verificar que se envió la respuesta JSON con el mensaje de éxito
    sinon.assert.calledWith(res.json, { msg: "Token válido y el usuario existe" });

    // Restaurar el stub de Usuario.findOne después de la prueba
    Usuario.findOne.restore();
  });

});
*/