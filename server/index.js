const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Napoleon",
    database: "crud_contact"
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/api/get", (req, res) => {
    const sqlGet = "SELECT * FROM contact_db";
    db.query(sqlGet, (error, result) => {
        res.send(result);
    });
});

app.post("/api/post", (req, res) => {
    const {nombre, email, contacto} = req.body;
    const sqlInsert = 
    "INSERT INTO contact_db (nombre, email, contacto) VALUES (?, ?, ?)";
    db.query(sqlInsert, [nombre, email, contacto], (error, result) => {
        if (error) {
            console.log(error);
        }
    });
});

app.delete("/api/remove/:id", (req, res) => {
    const { id } = req.params;

    const sqlRemove = "DELETE FROM contact_db WHERE id = ?";
    db.query(sqlRemove, id, (error, result) => {
        if (error) {
            console.log(error);
        }
    });
});

app.get("/api/get/:id", (req, res) => {
    const { id } = req.params;
    const sqlGet = "SELECT * FROM contact_db WHERE id = ?";
    db.query(sqlGet, id, (error, result) => {
        if (error) {
            console.log(error);
        }
        res.send(result);
    });
});

app.put("/api/update/:id", (req, res) => {
    const { id } = req.params;
    const {nombre, email, contacto} = req.body;
    const sqlUpdate = "UPDATE contact_db SET nombre = ?, email = ?, contacto = ? WHERE id = ?";
    db.query(sqlUpdate, [nombre, email, contacto, id], (error, result) => {
        if (error) {
            console.log(error);
        }
        res.send(result);
    });
});

app.get("/", (req, res) => {
   /* const sqlInsert = "INSERT INTO contact_db (nombre, email, contacto) VALUES ('Poli', 'policarp@gmail.com', '8345458')";
    db.query(sqlInsert, (error, result) => {
        console.log("error", error);
        console.log("result", result);
        res.send("Hola!!!");
    }); */
});

app.listen(5000, () => {
    console.log("Server esta corriendo en el puerto 5000");
})