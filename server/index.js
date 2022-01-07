const express = require("express");
const app = express();
const pool = require("./db");

const cors = require("cors");
app.use(cors());

app.use(express.json());

//ROUTES

//USER
app.get("/user", async (req, res) => {
    try {
        const user = await pool.query(`SELECT * FROM "boat-service-manager".user`);

        res.json(user.rows);
    } catch (error) {
        console.error(error);
    }
});

app.get("/user/:name", async (req, res) => {
    const { name } = req.params;
    try {
        const user = await pool.query(`SELECT * FROM "boat-service-manager".user WHERE name = '${name}'`);

        res.json(user.rows[0]);
    } catch (error) {
        console.error(error);
    }
});

app.post("/user", async (req, res) => {
    const { name, password } = req.body;
    try {
        const user = await pool.query(`INSERT INTO "boat-service-manager".user(name, password, role)
        VALUES ('${name}','${password}' 2);`);

        res.json(user);
    } catch (error) {
        console.error(error);
    }
});

//SHIP
app.get("/ship", async (req, res) => {
    try {
        const ships = await pool.query(`SELECT * FROM "boat-service-manager".ship  `);

        res.json(ships.rows);
    } catch (error) {
        console.error(error);
    }
});

app.get("/ship/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const ship = await pool.query(`SELECT * FROM "boat-service-manager".ship WHERE id = '${id}'`);

        if (ship.rows.length === 0) {
            res.sendStatus(404);
        } else {
            res.json(ship.rows[0]);
        }
    } catch (error) {
        console.error(error);
    }
});

//USER_SHIP
app.get("/user_ship/:userName", async (req, res) => {
    const { userName } = req.params;
    try {
        const userShip = await pool.query(
            `SELECT * FROM "boat-service-manager".user_ship WHERE user_name = '${userName}'`
        );

        res.json(userShip.rows);
    } catch (error) {
        console.error(error);
    }
});

//RECORDS
app.get("/record/user/:userName", async (req, res) => {
    const { userName } = req.params;
    try {
        const records = await pool.query(
            `SELECT * FROM "boat-service-manager".record WHERE user_name = '${userName}'  `
        );

        res.json(records.rows);
    } catch (error) {
        console.error(error);
    }
});

app.get("/record/ship/:ship", async (req, res) => {
    const { ship } = req.params;
    try {
        const records = await pool.query(`SELECT * FROM "boat-service-manager".record WHERE ship = '${ship}'  `);

        res.json(records.rows);
    } catch (error) {
        console.error(error);
    }
});

//LOGIN
app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await pool.query(`SELECT * FROM "boat-service-manager".user 
        WHERE
        name = '${username}'`);

        if (user.rows.length > 0) {
            if (user.rows[0].password === password) {
                res.json(user.rows);
            } else {
                res.sendStatus(401);
            }
        } else {
            res.sendStatus(404);
        }
    } catch (error) {
        console.error(error);
    }
});

app.listen(3000, () => {
    console.log("server is listening on port 3000");
});
