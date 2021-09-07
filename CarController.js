const dbConnection = require('./db');
const Car = require('./Entitites/Car');
const PATH = "/car"

async function addCar(req, res) {
    const datos = req.body;
    
    try {

        const car = await Car.create(datos)
        res.status(201).send(car + "\n\nSe ha añadido correctamente.");
        console.log("Se ha añadido un nuevo coche: " + JSON.stringify(datos));

    }
    catch (err) {
        res.status(501).send("Error al añadir el coche: " + err.message);
    }
}


async function getCarById(req, res) {
    try {
        const car = await Car.findById(req.params.id);
        if (car)
            res.status(200).send(car);
        else
            res.status(404).send("No se ha encontrado ningún coche con el ID: " + req.params.id);
    }

    catch (err) {
        res.status(501).send("Error al obtener el coche: " + err.message);
    }
}


async function updateCar(req, res) {

    try {
        const newRegistry = req.body
        const result = await Car.findByIdAndUpdate(req.params.id, newRegistry);
        if (result) {
            const actualizado = { _id: req.params.id };
            actualizado.updated = req.body;
            console.log("Se ha actualizado correctamente el ID: " + req.params.id);
            res.status(200).send(result + "\n\nSe ha actualizado correctamente.");
        }
        else
            res.status(404).send("No se ha encontrado la ID: " + req.params.id);
    }

    catch (err) {
        res.status(501).send("Error al actualizar: " + err.message);
    }
}

async function deleteCar(req, res) {
    try {
        const result = await Car.deleteOne({ "_id": req.params.id });

        if (result.deletedCount == 1){
            res.status(200).send(`Se ha eliminado el registro con el ID: ${req.params.id}`);
            console.log("Eliminación correcta");
        }
            
        else{
            res.status(404).send("No se ha encontrado ese ID: " + req.params.id);
        }
            
    }

    catch (err) {
        res.status(501).send("Error al eliminar: " + err.message);
    }
}


async function getCar(req, res) {
    try {
        let condiciones = req.body;

        const coches = await Car.find(condiciones);
        res.status(200).send(coches);
    }
    
    catch (err) {
        res.status(501).send("Error al obtener el coche: " + err.message);
    }
}


exports.addControllers = (app) => {
    dbConnection().then(() => {
        app.route(PATH).post(addCar);
        app.get(PATH, getCar);
        app.get(`${PATH}/:id`, getCarById)
        app.put(`${PATH}/:id`, updateCar)
        app.delete(`${PATH}/:id`, deleteCar)
    })
}