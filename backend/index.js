const express = require("express");
const { Sequelize, DataTypes } = require("sequelize");

const app = express();
app.use(express.json());

const port = 8000;

const sequelize = new Sequelize("issue_trackerDB", "postgres", "914524", {
  host: "localhost",
  dialect: "postgres",
});

const User = sequelize.define(
  "users",
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      valipublishDate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {},
);

// POST /users
app.post("/api/users", async (req, res) => {
  try {
    const data = req.body;

    const users = await User.create(data);
    res.json(users);
  } catch (err) {
    console.error(err);
    res.json({
      message: "something went wrong",
      error: err.errors.map((e) => e.message),
    });
  }
});

// GET /users
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    console.error(err);
  }
});



app.listen(port, async () => {

  await sequelize.sync()

  console.log("Server started at port", port);
});