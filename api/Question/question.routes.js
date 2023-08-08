const express = require("express");
const router = express.Router();
const { createQuestion,getAllQuestion } = require("./question.comtrollers");

router.post( "/", createQuestion);
router.get("/",getAllQuestion);

module.exports = router;
