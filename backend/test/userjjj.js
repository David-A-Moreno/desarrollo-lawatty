/*const request = require('supertest');
const express = require('express');
const {  registrar } = require('../controllers/usuarioController.js');
const {MongoClient} = require('mongodb');
const mongoose = require('mongoose');
const mongooseMock = require('mongoose-mock');


///express app
const app = express();
app.use(express.json());
app.post('/registrar',registrar);
///




///Mongoose mock Mockear el modelo Usuario
mongoose.models = {};
mongoose.modelSchemas = {};
mongoose.Model = mongooseMock.Model;
////

const Usuario=mongooseMock.model('Usuario', { email: String , password: String, nombre:String});

//jest.mock('../models/Usuario', () => ({
  //findOne: jest.fn(),
//}));*/
/** 
test('registrarV2',async ()=>{
  const req = { body: { nombre:'Fal', email: 'usuario@example.com',password:'1111' } };
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  Usuario.findOne = jest.fn().mockResolvedValue(null);
  
  
  await registrar(req,res);
  expect(res.status).toHaveBeenCalledWith(200);

})
*/
/*
describe( ' prueba de la funcion registrar', ()=>{

    let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(globalThis.__MONGO_URI__, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = await connection.db(globalThis.__MONGO_DB_NAME__);
  });

  afterAll(async () => {
    await connection.close();
  });


    test('Deberia retornar un usuario guardado si el usuario no existe', async ()=>{
        const data = {
            nombre:"auu",
            email: 'test@example.com',
            password: '123456',
          }
        
        const response = await request(app).post('/').send(data).expect(404)




        },10000)







})

*/