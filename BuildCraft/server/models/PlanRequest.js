const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const PlanRequest = sequelize.define(
  "PlanRequest",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },

    business_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    industry: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: "plan_requests",
    timestamps: true,
  }
);

module.exports = PlanRequest;