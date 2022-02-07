const express = require("express");
const router = express.Router();
const controller = require("./controller/controllers");

// router.get("/", urlencodedParser, async function home(req,res){
//     res.render('home.ejs')
// });

router.get("/", controller.find_All);

router.get("/add", controller.addCourseShow);

router.post("/add", controller.addCourse);

router.get("/update", controller.updateCourseShow);

router.patch("/update/:id", controller.updateCourse);

router.get("/:id", controller.remove_course);




module.exports= router ;