const mongoose = require('mongoose');

const user = 'pruebas';
const password = 'VdU2wvNoD11A5Jlm';
const dbname = 'lawattyBD';
const uri = `mongodb+srv://${user}:${password}@lawatty.rtzdvdd.mongodb.net/${dbname}?retryWrites=true&w=majority`;

// Prueba para verificar la conexión a la base de datos
test('Prueba de conexión a la base de datos', async () => {
  expect.assertions(1); // Indica que se espera una aserción

  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Conexión exitosa');
    expect(mongoose.connection.readyState).toBe(1); // Verifica que la conexión esté abierta
  } catch (error) {
    console.log('Error en la conexión:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Conexión cerrada');
  }
});
