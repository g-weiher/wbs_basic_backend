const express = require("express");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
const port = process.env.PORT;

const usersRoutes = require("./routes/users");
const ordersRoutes = require("./routes/orders");

app.use("/users/", usersRoutes);
app.use("/orders/", ordersRoutes);

app.listen(port, () => console.log(`server listening to port ${port}...`));
