const pool = require("../dbconfig");

const ordersController = {
  getOrders: async (req, res) => {
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
  },
  getOrderById: async (req, res) => {
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
  },
  postOrder: async (req, res) => {
    const order = req.body;
    if (!(order.price && order.date && order.user_id)) {
      res.status(400).send("bad request");
      return;
    }
    try {
      const response = await pool.query(
        "INSERT INTO orders(price,date,user_id) VALUES($1,$2,$3) RETURNING *;",
        [order.price, order.date, order.user_id]
      );
      res.send(response.rows[0]);
    } catch (e) {
      console.error(e);
      res.status(400).send("something broke");
    }
  },
};
module.exports = ordersController;
