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

  it('debe llamar a la función "next" si la contraseña no ha sido modificada',() => {
    const isModifiedStub = sinon.stub(usuario, 'isModified').withArgs('password').returns(false);
    const nextSpy = sinon.spy();
  
     usuario.save();
  
    expect(isModifiedStub.calledOnce).to.be.false;
    expect(nextSpy.calledOnce).to.be.false;
  });
  

 
});


describe('Usuario Model', () => {
  describe('comprobarPassword', () => {
    it('debe devolver true si la contraseña es correcta', async () => {
      const password = 'password123';
      const hashedPassword = await bcrypt.hash(password, 10);

      // Crea un nuevo usuario con la contraseña encriptada
      const usuario = new Usuario({
        password: hashedPassword,
      });

      // Comprueba si la contraseña ingresada coincide
      const result = await usuario.comprobarPassword(password);

      expect(result).to.be.true;
    });

    it('debe devolver false si la contraseña es incorrecta', async () => {
      const password = 'password123';
      const wrongPassword = 'wrongpassword';

      // Crea un nuevo usuario con la contraseña encriptada
      const hashedPassword = await bcrypt.hash(password, 10);
      const usuario = new Usuario({
        password: hashedPassword,
      });

      // Comprueba si la contraseña ingresada no coincide
      const result = await usuario.comprobarPassword(wrongPassword);

      expect(result).to.be.false;
    });
  });
});
/*
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


  
describe('Pre Save Middleware - usuarioSchema', () => {
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
  
     usuario.save(); // Elimina el argumento del callback
  
    expect(isModifiedStub.calledOnce).to.be.true;
    expect(nextSpy.calledOnce).to.be.true;
  });
  
  it('debe encriptar la contraseña si ha sido modificada', async () => {
    const isModifiedStub = sinon.stub(usuario, 'isModified').withArgs('password').returns(true);
    const genSaltStub = sinon.stub(bcrypt, 'genSalt').resolves('salt123');
    const hashStub = sinon.stub(bcrypt, 'hash').resolves('hashedPassword');
    const nextSpy = sinon.spy();
  
    await usuario.save(); // Elimina el argumento del callback
  
    expect(isModifiedStub.calledOnce).to.be.true;
    expect(genSaltStub.calledOnce).to.be.true;
    expect(hashStub.calledOnceWithExactly('password123', 'salt123')).to.be.true;
    expect(usuario.password).to.equal('hashedPassword');
    expect(nextSpy.calledOnce).to.be.true;
  });
  
});*/