const express = require("express");
const router = express.Router();

const controller = require("../controller/form");

router.post("/submit", controller.submit);
router.get("/fetch", controller.fetch);

module.exports = router

