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
  

  
  describe('nuevoPassword', () => {
    it('debe modificar la contraseña de un usuario existente', async () => {
      // Configurar el entorno de prueba
      const token = 'mi_token';
      const password = 'nueva_contraseña';
      const usuarioMock = {
        token,
        password: 'contraseña_actual',
        save: sinon.stub().resolves(),
      };
  
      // Stub de Usuario.findOne para simular la búsqueda de usuario
      const findOneStub = sinon.stub(Usuario, 'findOne').resolves(usuarioMock);
  
      // Ejecutar la función que se está probando
      const req = { params: { token }, body: { password } };
      const res = { json: sinon.stub() };
      await nuevoPassword(req, res);
  
      // Afirmar que Usuario.findOne fue llamado con los parámetros correctos
      expect(findOneStub.calledOnceWithExactly({ token })).to.be.true;
  
      // Afirmar que se modificó correctamente la contraseña del usuario
      expect(usuarioMock.token).to.be.null;
      expect(usuarioMock.password).to.equal(password);
      expect(usuarioMock.save.calledOnce).to.be.true;
  
      // Afirmar que se envió la respuesta JSON correcta
      expect(res.json.calledOnceWithExactly({ msg: 'Password modificado correctamente' })).to.be.true;
  
      // Restaurar el comportamiento original de Usuario.findOne
      findOneStub.restore();
    });
  
    it('debe devolver un error cuando el usuario no existe', async () => {
      // Configurar el entorno de prueba
      const token = 'mi_token_no_existente';
  
      // Stub de Usuario.findOne para simular la búsqueda de usuario
      const findOneStub = sinon.stub(Usuario, 'findOne').resolves(null);
  
      // Ejecutar la función que se está probando
      const req = { params: { token }, body: { password: 'nueva_contraseña' } };
      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
      await nuevoPassword(req, res);
  
      // Afirmar que Usuario.findOne fue llamado con los parámetros correctos
      expect(findOneStub.calledOnceWithExactly({ token })).to.be.true;
  
      // Afirmar que se envió el error y el estado correspondiente
      expect(res.status.calledOnceWithExactly(400)).to.be.true;
      expect(res.json.calledOnceWithExactly({ msg: 'Hubo un error' })).to.be.true;
  
      // Restaurar el comportamiento original de Usuario.findOne
      findOneStub.restore();
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
  