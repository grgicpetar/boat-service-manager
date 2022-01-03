require("dotenv").config();

const { Pool } = require("pg");

const pool = new Pool({
    user: "postgres",
    password: process.env.DB_PASSWORD,
    database: "boat-service-manager",
    host: "localhost",
    port: 5432,
});

module.exports = pool;
