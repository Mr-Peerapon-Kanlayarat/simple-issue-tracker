const express = require("express");
const { Sequelize, DataTypes } = require("sequelize");

const app = express();
app.use(express.json());

const cors = require('cors');
app.use(cors());

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
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {},
);

const Project = sequelize.define(
  "projects",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
  },
  {},
);

User.hasMany(Project);
Project.belongsTo(User);

const Issue = sequelize.define(
  "issues",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "open",
    },
  },
  {},
);

Project.hasMany(Issue);
Issue.belongsTo(Project);

//--------------------------------------

// Users

// POST users register
app.post("/api/users/register", async (req, res) => {
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

// GET all users
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    console.error(err);
  }
});

app.get("/api/users/:id/projects", async (req, res) => {
  try {
    const userId = req.params.id;

    const result = await User.findOne({
      where: { id: userId },
      include: {
        model: Project,
      },
      raw: true,
    });

    res.json(result);
  } catch (err) {
    console.error(err);
    res.json(err);
  }
});

// Projects

// POST create projects
app.post("/api/projects", async (req, res) => {
  try {
    const data = req.body;

    const project = await Project.create(data);
    res.json(project);
  } catch (err) {
    console.error(err);
    res.json({
      message: "something went wrong",
      error: err.errors.map((e) => e.message),
    });
  }
});

// GET projects by userId
app.get("/api/projects/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;
    
        const projects = await Project.findAll({
        where: { userId: userId },
        });
    
        res.json(projects);
    } catch (err) {
        console.error(err);
        res.json(err);
    }
});

// Issues
// POST create issues
app.post("/api/projects/:projectId/issues", async (req, res) => {
  try {
    const data = req.body;
    const projectId = req.params.projectId;
    const issue = await Issue.create({ ...data, projectId });
    res.json(issue);
  } catch (err) {
    console.error(err);
    res.json({
      message: "something went wrong",
      error: err.errors.map((e) => e.message),
    });
  }
});

// GET issues by projectId
app.get("/api/projects/:projectId/issues", async (req, res) => {
  try {
    const projectId = req.params.projectId;

    const issues = await Issue.findAll({
      where: { projectId: projectId },
    });

    res.json(issues);
  } catch (err) {
    console.error(err);
    res.json(err);
  }
});

// PUT update issue status
app.put("/api/issues/:issueId", async (req, res) => {
  try {
    const id = req.params.issueId;
    const { status } = req.body;
    const issue = await Issue.findByPk(id);
    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }
    issue.status = status;
    await issue.save();
    res.json(issue);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong", error: err.message });
  }
});

app.listen(port, async () => {

  await sequelize.sync();

  console.log("Server started at port", port);
});