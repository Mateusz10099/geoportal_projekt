const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");
const app = express();
const port = 5000;

const pool = new Pool({
  user: "postgres", // lub inna nazwa użytkownika
  host: "localhost", // domyślnie localhost
  database: "geoportal", // nazwa Twojej bazy danych
  password: "Monika", // hasło użytkownika
  port: 5433, // domyślny port PostgreSQL
});

app.use(cors());

app.get("/api/employees", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, name, surname, birthdate, city, latitude, longitude, university FROM employees"
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
