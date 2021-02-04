const pool = require("../dbconfig");

const usersController = {
  getUsers: async (req, res) => {
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
  },
  getUserbyId: async (req, res) => {
    const userId = req.params.id;
    console.log(`request on user with id = ${userId}`);
    if (!(userId && /^\d+$/.test(userId))) {
      res.status(400).send();
    } else {
      try {
        const data = await pool.query("SELECT * FROM users WHERE id = $1", [
          userId,
        ]);
        if (data.rows.length === 0) {
          res.status(404).send();
        } else {
          res.send({
            operation: "success",
            code: 200,
            description: "fetched user by id",
            data: data.rows[0],
          });
        }
      } catch (e) {
        console.error(e);
        res.status(400).send("something went wrong");
      }
    }
  },
  addUser: async (req, res) => {},
  deleteUserById: async (req, res) => {},
  updateUserById: async (req, res) => {},
};

module.exports = usersController;
