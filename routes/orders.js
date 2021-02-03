const express = require("express");
const router = express.Router();

const pool = require("../dbconfig");

router.get("/", async (req, res) => {
  console.log("request on all orders");
  try {
    const data = await pool.query(
      "SELECT orders.id, orders.price, orders.date, row_to_json(users.*) AS user FROM orders, users WHERE orders.user_id = users.id"
    );
    res.json({
      operation: "success",
      description: "fetched orders by id",
      data: data.rows,
    });
  } catch (e) {
    console.error(e);
    res.status(400).send();
  }
});

router.get("/:id", async (req, res) => {
  const orderId = req.params.id;
  console.log(`request on orders with id = ${orderId}`);
  if (!(orderId && /^\d+$/.test(orderId))) {
    res.status(400).send();
  } else {
    try {
      const data = await pool.query(
        "SELECT orders.id, orders.price, orders.date, row_to_json(users.*) AS user FROM orders, users WHERE orders.user_id = users.id AND orders.id = $1",
        [orderId]
      );
      if (data.rows.length === 0) {
        res.status(404).send();
      } else {
        res.send({
          operation: "success",
          description: "fetched order by id",
          data: data.rows[0],
        });
      }
    } catch (e) {
      console.error(e);
      res.status(400).send("something went wrong");
    }
  }
});

module.exports = router;
