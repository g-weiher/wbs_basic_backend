const express = require("express");
const router = express.Router();

const pool = require("../dbconfig");

router.get("/", async (req, res) => {
  console.log("request on all users");
  try {
    const data = await pool.query("SELECT * FROM users");
    res.json({
      operation: "success",
      code: 200,
      description: "fetched user by id",
      data: data.rows,
    });
  } catch (e) {
    console.error(e);
    res.status(400).send();
  }
});

module.exports = router;
