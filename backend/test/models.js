import { expect } from 'chai';
import sinon from 'sinon';
import bcrypt from 'bcrypt';
import Usuario from '../models/Usuario.js';

describe('Usuario Model - Pre Save Middleware', () => {
  let usuario;

  beforeEach(() => {
    usuario = new Usuario({
      nombre: 'John Doe',
      password: 'password123',
      email: 'johndoe@example.com',
    });
  });

  afterEach(() => {
    sinon.restore();
  });

  it('debe llamar a la función "next" si la contraseña no ha sido modificada', () => {
    const isModifiedStub = sinon.stub(usuario, 'isModified').withArgs('password').returns(false);
    const nextSpy = sinon.spy();

     usuario.save();

    expect(isModifiedStub.calledOnce).to.be.false;
    expect(nextSpy.calledOnce).to.be.false;
  });

 
});


describe('comprobarPassword', () => {
    it('debe comparar correctamente la contraseña proporcionada con la contraseña almacenada', async () => {
      const passwordFormulario = 'password123';
      const hashedPassword = await bcrypt.hash(passwordFormulario, 10);

      const usuario = new Usuario();
      usuario.password = hashedPassword;

      const result = await usuario.comprobarPassword(passwordFormulario);

      expect(result).to.be.true;
    });
  });
