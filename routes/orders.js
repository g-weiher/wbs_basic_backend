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

router.get("/:id", async (req, res) => {
  const orderId = req.params.id;
  console.log(`request on orders with id = ${orderId}`);
  if (!(orderId && /^\d+$/.test(orderId))) {
    res.status(400).send();
  } else {
    try {
      const data = await pool.query("SELECT * FROM orders WHERE id = $1", [
        orderId,
      ]);
      if (data.rows.length === 0) {
        res.status(404).send();
      } else {
        const order = await populate(data.rows[0]);
        res.send({
          operation: "success",
          description: "fetched post by id",
          data: order,
        });
      }
    } catch (e) {
      console.error(e);
      res.status(400).send("something went wrong");
    }
  }
});

module.exports = router;
