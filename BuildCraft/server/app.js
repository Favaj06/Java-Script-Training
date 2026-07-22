const express = require("express");
const cors = require("cors");
require("dotenv").config();

const sequelize = require("./config/database");

const app = express();
const { PlanRequest, DiscoveryCall } = require("./models");
const planRoutes = require("./routes/planRoutes");
const discoveryRoutes = require("./routes/discoveryRoutes");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: " Welcome to BuildCraft API"
    });
});

sequelize
  .authenticate()
  .then(async () => {
    console.log(" MySQL Connected Successfully");

    await sequelize.sync({ alter: true });

    console.log(" All Tables Synced Successfully");
  })
  .catch((err) => {
    console.log(" Database Connection Failed");
    console.log(err.message);
  });

const PORT = process.env.PORT || 5000;
app.use("/api/plan", planRoutes);
app.use("/api/discovery", discoveryRoutes);
app.listen(PORT, () => {
    console.log(` Server running on http://localhost:${PORT}`);
});