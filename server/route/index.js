const express = require("express");
const router = express.Router();

const {valToken} = require("../middleware/auth");
const controller = require("../controller/index");

router.get("/", valToken, (req, res) => {
    res.status(200).json({page: "Home", user: req.userData});
});

router.get("/fetch_users", controller.fetchUser);
router.get("/fetch_user_by_class/:classId", controller.fetchUserByClass)

router.post("/add_news", controller.addNews)
router.get("/fetch_news", controller.fetchNews)


router.post("/add_class", controller.addClass)
router.get("/fetch_class", controller.fetchClass)
router.get("/fetch_class/:classId", controller.fetchClass)


router.post("/assign_to_class", controller.assignToClass)

router.post("/add_marks", controller.addMarks)

router.get("/search_fee/:userName", controller.searchStudentFee)
router.get("/total_due", controller.calculateOverallDueAmount)
router.post("/save_fee", controller.saveFee)


router.get("/search_result/:userName", controller.searchStudentResult)

router.post("/save_profile", controller.saveProfile)


router.post("/save_result", controller.saveResult)

module.exports = router
