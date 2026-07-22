const express = require("express");

const {
  createDiscoveryCall,
  getAllDiscoveryCalls,
} = require("../controllers/discoveryController");

const router = express.Router();

router.post("/", createDiscoveryCall);

router.get("/", getAllDiscoveryCalls);

module.exports = router;