const express = require("express");
const app = express();
const pool = require("./db");

app.use(express.json());

//ROUTES
app.get("/role", async (req, res) => {
    try {
        const roles = await pool.query('SELECT * FROM "boat-service-manager".role');

        res.json(roles.rows);
    } catch (error) {
        console.error(error);
    }
});

app.listen(3000, () => {
    console.log("server is listening on port 3000");
});
