import Usuario from "../models/Usuario.js";
import generarJWT from "../helpers/generarJWT.js";
import generarId from "../helpers/generarId.js";

//funcion para registrar
const registrar = async (req, res) => {
    const {email} = req.body

    //prevenir usuarios duplicados
    const existeUsuario = Usuario.findOne({email})

    if (await Promise.resolve(existeUsuario)) {
        const error = new Error('Usuario ya registrado');
        return res.status(400).json({msg: error.message});
    }

    try {
        //Guardar un nuevo Usuario
        const usuario = new Usuario(req.body);
        const usuarioGuardado = await usuario.save();

        res.json(usuarioGuardado);
    } catch (error) {
        console.log(error)
    }
};

const perfil = (req, res) => {

    const {usuario} = req;

    res.json({perfil: usuario}); 
}

const confirmar = async (req, res) => {
    const { token } = req.params;
  
    const usuarioConfirmar = await Promise.resolve(Usuario.findOne({ token }));
  
    if (!usuarioConfirmar) {
      const error = new Error('Token no válido');
      return res.status(404).json({ msg: error.message });
    }
  
    try {
      usuarioConfirmar.token = null;
      usuarioConfirmar.confirmado = true;
      await usuarioConfirmar.save();
  
      res.json({ msg: 'Usuario Confirmado Correctamente' });
    } catch (error) {
      console.log(error);
    }
  };
  
const autenticar = async (req, res) => {
    const { email, password } = req.body;
  
    // Comprobar si el usuario existe
    const usuario = await Promise.resolve(Usuario.findOne({ email }));
  
    if (!usuario) {
      const error = new Error('El usuario no existe');
      return res.status(404).json({ msg: error.message });
    }
  
    try {
      // Revisar Password
      const passwordCorrecto = await usuario.comprobarPassword(password);
      if (passwordCorrecto) {
        // Autenticar
        res.json({token: generarJWT(usuario.id)});
      } else {
        const error = new Error('El password es incorrecto');
        return res.status(403).json({ msg: error.message });
      }
    } catch (error) {
      console.log(error);
    }
  };
  

const olvidePassword = async (req, res) => {
    const { email } = req.body;
    const existeUsuario = await Promise.resolve(Usuario.findOne({ email }));
    if (!existeUsuario) {
      const error = new Error('El usuario no existe');
      return res.status(400).json({ msg: error.message });
    }
  
    try {
      existeUsuario.token = generarId();
      await existeUsuario.save();
      res.json({ msg: 'Hemos enviado un email con las instrucciones' });
    } catch (error) {
      console.log(error);
    }
  };
  
const comprobarToken = async (req, res) => {
    const { token } = req.params;
    const tokenValido = await Promise.resolve(Usuario.findOne({ token }));
    if (tokenValido) {
      // El token es válido y el usuario existe
      res.json({ msg: 'Token válido y el usuario existe' });
    } else {
      const error = new Error('Token no válido');
      return res.status(400).json({ msg: error.message });
    }
  };
  
const nuevoPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    try {
        const usuario = await Promise.resolve(Usuario.findOne({ token }));
        if (!usuario) {
            const error = new Error('Hubo un error');
            return res.status(400).json({ msg: error.message });
        }

        usuario.token = null;
        usuario.password = password;
        await usuario.save();
        res.json({ msg: 'Password modificado correctamente' });
        console.log(usuario);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Hubo un error al modificar la contraseña' });
    }
};


export {
    registrar,
    perfil,
    confirmar,
    autenticar,
    olvidePassword,
    comprobarToken,
    nuevoPassword
}