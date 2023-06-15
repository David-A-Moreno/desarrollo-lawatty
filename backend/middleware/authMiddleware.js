import jwt from "jsonwebtoken";
import Usuario from "../models/Usuario.js";

//pruebas
const checkAuth = async (req, res, next) => {
    let token;
   if (req.headers.authorization?.startsWith('Bearer')) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario = await Usuario.findById(decoded.id).select(
        "-password -token -confirmado"
        );  


            return next();
        } catch (error) {
            const e = new Error("Token no válido o inexistente");
            res.status(403).json({ msg: e.message });
        }
    }

    if (!token) {
        const error = new Error("Token no válido o inexistente");
        res.status(403).json({ msg: error.message });
    }

    next();
}

export default checkAuth;