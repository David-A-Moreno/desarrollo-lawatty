import sinon from 'sinon';
import jwt from 'jsonwebtoken';
import generarJWT from '../helpers/generarJWT';
import { expect } from 'chai';

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