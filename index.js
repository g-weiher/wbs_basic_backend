const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const usersRoutes = require("./routes/users");
const ordersRoutes = require("./routes/orders");

app.use("/users/", usersRoutes);
app.use("/orders/", ordersRoutes);

app.listen(port, () => console.log(`server listening to port ${port}...`));
