const express = require("express");
const router = express.Router();
const controller = require("./controller/controllers");

router.get("/", controller.find_All);

router.get("/add", controller.addCourseShow);

router.post("/add", controller.addCourse);

router.get("/update", controller.updateCourseShow);

router.post("/update", controller.updateCourse);

router.get("/:id", controller.remove_course);

module.exports= router ;