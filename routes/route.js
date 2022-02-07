const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const Course = require("../src/models/course");

const urlencodedParser = bodyParser.urlencoded({extended : false});

// router.get("/", urlencodedParser, async function home(req,res){
//     res.render('home.ejs')
// });

router.get("/get", urlencodedParser, async function find_All(req,res){
    try{
        let data = await Course.findAll();
        console.log('data :::: ', data)
        if(data){
            res.render('home', {data: data});
        }
        else{
            res.render('home');
        }
    }catch(err){
        res.status(400).send({
            status: "Fail Get All Courses Get",
            err: err
        })
    }
});

router.get("/add", urlencodedParser, async function addCourseShow(req,res){
    try {
        res.render("add.ejs");
    } catch(err) {
        res.status(400).send({
            status : "fail",
            err : err
        });
    }
});

router.post("/add", urlencodedParser, async function addCourse(req,res){
    try {
        let obj = JSON.parse(JSON.stringify(req.body));
        console.log("obj ::::", obj);
        console.log("req,body ::::",req.body)
        if(Object.keys(req.body).length == 0) {
            res.status(400).send({
                msg : "Content can not be empty!"
            });
        }
        const newCourse = {
            name : obj.name,
            duration : obj.duration,
            fees : obj.fees
        };
        await Course.create(newCourse);
        res.status(200).render("home.ejs")

    } catch(err) {
        console.log("err : ", err);
        res.status(400).send({
            status : "process fail in add fucntion..!",
            err : err
        });
    } 
});

router.get("/update", urlencodedParser, async function updateCourseShow(req,res){
    try {
        let course = await Course.findOne({ where : { id : req.query.id }});
        if(course) {
            res.render("update.ejs", { course : course });
        } else {
            res.send("Something went wrong!");
        }
    } catch(err) {
        res.status(400).send({
            status : "fail in update method",
            err : err
        });
    }
});

router.patch("/update/:id", urlencodedParser, async function updateCourse(req, res){
    try {
        if (!req.body) {
            return res.status(400).send({
                msg : "Data to update can not be empty"
            })
        };
        let data = await Course.findOne({ where :
            {
                id : req.body.id
            }
        });
        if (data) {
            Course.update({
                name : req.body.name,
                duration : req.body.duration,
                fees : req.body.fees
            }, { where : { id : req.body.id }});
            res.redirect("/get");
        } else {
            res.status(200).send({
                status : "processs can't be complete..!",
                msg : "Error Update From Course Information!",
                data : data
            });
        }
    } catch (err) {
        res.status(400).send({
            status : "fail",
            err : "updateCourse err : " + err
        });
    }
});

router.delete("/:id", urlencodedParser, async function remove_course(){
    try {
        console.log("req.params : ", req.params);
        let data = await Course.findOne({ where : { id : req.params.id }});
        if (data) {
            let data = await Course.destroy({ where : { id : req.params.id }});
            res.redirect("/");
        } else {
            res.status(200).send({
                status : "success",
                msg : "There is no data available like this!"
            });
        }
    } catch (err) {
        res.status(400).send({
            status : "false",
            err : err
        });
    }
});




module.exports= router ;