const express = require("express");
const { createPaci, getAllCivil } = require("./paci.controllers");

const router = express.Router();

router.post("/", createPaci);
router.get("/", getAllCivil);

module.exports = router;
