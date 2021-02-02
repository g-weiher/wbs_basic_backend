const express = require("express");
const router = express.Router();

const pool = require("../dbconfig");

const populate = async (order) => {
  const userRequest = await pool.query("SELECT * FROM users WHERE id = $1", [
    order.user_id,
  ]);
  order.user = userRequest.rows[0];
  delete order.user_id;
  return order;
};

router.get("/", async (req, res) => {
  console.log("request on all posts");
  try {
    const data = await pool.query("SELECT * FROM orders");
    const populatedOrders = await Promise.all(
      data.rows.map((order) => populate(order))
    );
    res.json({
      operation: "success",
      description: "fetched orders by id",
      data: populatedOrders,
    });
  } catch (e) {
    console.error(e);
    res.status(400).send();
  }
});

module.exports = router;
