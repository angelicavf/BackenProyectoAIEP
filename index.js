const express = require("express");
const { Client } = require('pg')
const app = express();
const bodyParser = require("body-parser")
const port = 3000;
const bodyParser1 = bodyParser.json()
app.use(bodyParser.json())


const connectionData = {
    user: 'administrador',
    host: 'asignacionesdb.postgres.database.azure.com',
    database: 'ASIGNACIONES',
    password: 'Proyecto14122023',
    port: 5432,
    ssl: true,
}
const client = new Client(connectionData)


app.get("/", (req, res) => {

    client.connect()
    console.log("prueba")

    prueba_test().then(data => {
        console.log(data)
        res.send(data);
    }).catch(err => {
        console.log(err);
        return res.status(500).send("Error");
    })
});

app.post("/", (req, res) => {
    console.log(req.body.ACT_TELEFONO_SOLICITANTE)

    client.connect()
    let query = `INSERT INTO "ACTIVIDAD" ("ACT_NOMBRE", "ACT_DESCRIPCION", "ACT_ESTADO", "ACT_DIRECCION", "ACT_INICIO", "ACT_FIN", "ACT_COM_ID", "ACT_PRO_ID", "ACT_AGE_ID", "ACT_NOMBRE_SOLICITANTE", "ACT_TELEFONO_SOLICITANTE", "ACT_CORREO_SOLICITANTE") VALUES 
    ('REQ_1111', 'Realizar Cambio de Disco Duro y RAM', 'Pendiente', 'Huerfanos 1409', NULL, NULL, 1, 1, 3,'Carolina Cuevas',$1,'ccuevasp@pjud.cl')
    RETURNING "ACT_ID";`;

    // Creating queries 
    client.query(query, [req.body.ACT_TELEFONO_SOLICITANTE], (err, rows) => {
        if (err) throw err;
        console.log("Row inserted with id = "
            + rows);
        res.send(rows)
    });


});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

async function prueba_test() {
    const resultados = await client.query('SELECT array_to_json(array_agg(c.*)) FROM(SELECT * FROM "USUARIO") AS c;');
    return resultados.rows;
}

async function prueba_test1(ACT_TELEFONO_SOLICITANTE) {
    const resultados = await client.query(`INSERT INTO "ACTIVIDAD" ("ACT_NOMBRE", "ACT_DESCRIPCION", "ACT_ESTADO", "ACT_DIRECCION", "ACT_INICIO", "ACT_FIN", "ACT_COM_ID", "ACT_PRO_ID", "ACT_AGE_ID", “ACT_NOMBRE_SOLICITANTE”, “ACT_TELEFONO_SOLICITANTE”, “ACT_CORREO_SOLICITANTE”) VALUES 
    ('REQ_PJUD_767623', Realizar Cambio de Disco Duro y RAM', 'Pendiente', 'Huerfanos 1409', NULL, NULL, 1, 1, 3, 'Carolina Cuevas', $1, 'ccuevasp@pjud.cl’);`, [ACT_TELEFONO_SOLICITANTE]);
    return resultados.rows;
}

