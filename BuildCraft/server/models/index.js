const sequelize = require("../config/database");

const PlanRequest = require("./PlanRequest");
const DiscoveryCall = require("./DiscoveryCall");

module.exports = {
  sequelize,
  PlanRequest,
  DiscoveryCall,
};