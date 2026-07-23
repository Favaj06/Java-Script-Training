const express = require("express");

const {
  createPlanRequest,
  getAllPlanRequests,
} = require("../controllers/planController");

const router = express.Router();

router.post("/", createPlanRequest);

router.get("/", getAllPlanRequests);

module.exports = router;