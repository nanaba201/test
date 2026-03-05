const express = require("express");
const router = express.Router();

const controller = require('../controller/auth');//Requiring Controllers

router.post("/register_bulk", controller.registerBulk);
router.post("/remove_class", controller.removeClass);
router.post("/register", controller.register);

router.post("/login", controller.login);


module.exports = router
