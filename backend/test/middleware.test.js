import { expect } from 'chai';
import sinon from 'sinon';
import jwt from 'jsonwebtoken';
import Usuario from '../models/Usuario.js';
import checkAuth from '../middleware/authMiddleware.js';

describe('checkAuth', () => {
  it('debe agregar el usuario decodificado al objeto req y llamar a la siguiente función', async () => {
    // Configurar el entorno de prueba
    const usuarioMock = { id: '123', nombre: 'John Doe' };
    const token = jwt.sign({ id: usuarioMock.id }, 'tu_clave_secreta');
    const req = { headers: { authorization: `Bearer ${token}` } };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    const next = sinon.stub();

    sinon.stub(jwt, 'verify').returns({ id: usuarioMock.id });
    sinon.stub(Usuario, 'findById').returns({ select: sinon.stub().returns(usuarioMock) });

    // Ejecutar la función que se está probando
    await checkAuth(req, res, next);

    // Afirmar que el usuario decodificado se agregó al objeto req
    expect(req.usuario).to.deep.equal(usuarioMock);

    // Afirmar que se llamó a la siguiente función (next)
    expect(next.calledOnce).to.be.true;

    // Restaurar los stubs
    jwt.verify.restore();
    Usuario.findById.restore();
  });
  
  it('debe devolver un error si no se proporciona un token', async () => {
    // Configurar el entorno de prueba
    const req = { headers: {} };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    const next = sinon.stub();
  
    // Ejecutar la función que se está probando
    await checkAuth(req, res, next);
  
    // Afirmar que se devolvió un error con el mensaje correspondiente
    expect(res.status.calledWithExactly(403)).to.be.true;
    expect(res.json.calledWithExactly({ msg: 'Token no válido o inexistente' })).to.be.true;
  
  });
  

});

