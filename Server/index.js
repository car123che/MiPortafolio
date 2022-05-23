//imports
const mysql = require("mysql2");
const cors = require("cors");
const { promisify } = require("util");
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require('morgan');
//settings
var app = express();
var port = 9000;
var corsOptions = { origin: true, optionsSuccessStatus: 200 };
app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: "10mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
app.use(morgan('dev'));
app.listen(port);
console.log("Listening on port", port);

//db settings
const db_credentials = require("./db_credentials");
var conn = mysql.createPool(db_credentials);
conn.query = promisify(conn.query);

/********************************** API*************************************/
//--prueba
app.get("/hi", async (req, res) => {
    res.send("hi world");
});


// obtener lista de proyectos
app.get("/proyectos", async (req, res) => {

    conn.query(
        "SELECT * FROM Proyecto",
        function (err, result) {
            const resultados = result;
            if (err) {
                console.log(err);
                res.send({
                    codigo: "4",
                    descripcion: "Error al obtener proyectos",
                    error: err.toString(),
                });
            } else {
                if (resultados.length == 0) {
                    res.send({
                        codigo: "2",
                        descripcion: "No existen proyectos",
                    });
                } else {
                    res.send({
                        codigo: "0",
                        descripcion: "Lista de Proyectos Obtenida con éxito",
                        datos: resultados
                    });
                }
            }
        }
    );

});

// obtener lista de conocimientos
app.get("/conocimientos", async (req, res) => {

    conn.query(
        "SELECT * FROM Conocimiento",
        function (err, result) {
            const resultados = result;
            if (err) {
                console.log(err);
                res.send({
                    codigo: "4",
                    descripcion: "Error al obtener conomientos",
                    error: err.toString(),
                });
            } else {
                if (resultados.length == 0) {
                    res.send({
                        codigo: "2",
                        descripcion: "No existen conocimientos",
                    });
                } else {
                    res.send({
                        codigo: "0",
                        descripcion: "Lista de Conocimientos Obtenida con éxito",
                        datos: resultados
                    });
                }
            }
        }
    );

});


// insertar proyecto
app.post("/proyecto", async (req, res) => {

    const body = req.body;

    conn.query(`INSERT INTO Proyecto (nombre_proyecto, descripcion_proyecto, 
               link_repositorio, imagen, link_deploy )
               VALUES (?, ?, ?, ?, ?)`,
        [body.nombre, body.descripcion, body.link, body.imagen, body.deploy],

        function (err, result) {
            const resultado = result;
            if (err) {
                res.send({
                    codigo: "4",
                    descripcion: "Error al insertar Proyecto",
                    error: err.toString()
                });
            } else {
                res.send({
                    codigo: "0",
                    descripcion: "Proyecto insertado correctamente"
                });
            }
        }
    );

});


// insertar conocimiento
app.post("/conocimiento", async (req, res) => {

    const body = req.body;

    conn.query(`INSERT INTO Conocimiento (nombre_conocimiento, 
                descripcion_conocimiento, imagen)  VALUES (?, ?, ?)`,
        [body.nombre, body.descripcion, body.imagen],

        function (err, result) {
            const resultado = result;
            if (err) {
                res.send({
                    codigo: "4",
                    descripcion: "Error al insertar Conocimiento",
                    error: err.toString()
                });
            } else {
                res.send({
                    codigo: "0",
                    descripcion: "Conocimiento insertado correctamente"
                });
            }
        }
    );
    
});