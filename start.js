const express = require('express');
require('dotenv').config({ path: './dev.env' });
const cors = require("cors");
const app = express();
const port = process.env['PORT'];

app.use(express.json())

app.get('/', function(req, res) {
    res.send('Bienvenido siga esta guía para administrar sus coches, es recomendable usar postman.\n-Para obtener todos los coches use GET /car.\n-Para obtener un coche por id, actualizarlo o eliminarlo utilice /coche/id con sus métodos correspondientes.');
  });

const personaController = require('./CarController');
personaController.addControllers(app);

var corsOptions = {
    origin: "http://localhost:4200"
  };
  
app.use(cors(corsOptions));
app.listen(port, () => {
    console.log(`Escuchando: http://localhost:${port}`);
})