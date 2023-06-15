
const Usuario= require("../models/Usuario.js")
import checkAuth from "../middleware/authMiddleware";


describe('checkAuth', () => {
    test('Debería enviar una respuesta de error si el token es inválido', async () => {
        const req = { headers: { authorization: 'Bearer token-invalido' } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        const next = jest.fn();
      
        await checkAuth(req, res, next);
      
        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.json).toHaveBeenCalledWith({ msg: 'Token no válido o inexistente' });
      });
    });
  
jest.mock("../models/Usuario.js")

const fakeAuth = jest.fn();

fakeAuth.mockImplementation((req, res) => {
    const {email, password} = req.body


    if (req.body.email === 'holap@holap.com' && req.body.password === 'password123') {
      res.json({ token: 'mockedToken' });
    } else if(req.body.email === 'holap@holap.com' && req.body.password!= 'password123')  {
      res.status(403).json({ msg: 'Credenciales inválidas' });
    }else {
        res.status(404).json({msg: 'Usuario no encontrado'})
    }   
  });


test ("Si el usuario no existe", async ()=>{
    const request ={
        body:{
            nombre:"Lain",
            email: 'Lain@holap.com',
            password:"holap1234567890"
            }
        };
        const response={
        status: jest.fn((x) => ({ 
            json: jest.fn()
         }))
      
        };
        await fakeAuth(request,response);
    expect(response.status).toHaveBeenCalledWith(404);
});




test("si el usuario existe, pero las contraseña no es correcta",async ()=>{
    const request ={
        body:{
            nombre:"holap",
            email: 'holap@holap.com',
            password:"wrongpassword"
    
            },
        };
        const response={
        status: jest.fn().mockReturnThis(),
        json:jest.fn(),
        };


    await fakeAuth(request,response);
    expect(response.status).toHaveBeenCalledWith(403);
    expect(response.json).toHaveBeenCalledWith({ msg: 'Credenciales inválidas' });
})

test('Si se logea correctamente',async ()=>{
    const request ={
        body:{
            nombre:"holap",
            email: 'holap@holap.com',
            password:"password123"
    
            },
        };
        const response={
        status: jest.fn().mockReturnThis(),
        json:jest.fn(),
        };    
        await fakeAuth(request,response);
        expect(response.json).toHaveBeenCalledWith({ token: 'mockedToken' });

})


