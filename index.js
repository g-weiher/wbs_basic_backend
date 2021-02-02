const express = require("express");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
const port = process.env.PORT;

const pool = require("./dbconfig");

app.get("/", async (req, res) => {
  try {
    const response = await pool.query("SELECT * FROM orders");
    res.send(response);
  } catch (e) {
    console.error(e);
    res.status(400).send();
  }
});
app.listen(port, () => console.log(`server listening to port ${port}...`));
