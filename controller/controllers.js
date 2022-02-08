const Course = require("../src/models/course");

async function find_All(req,res){
    try{
        let data = await Course.findAll();
            console.log('data :::: ', data)
        if(data){
            res.render('./pages/home', {data: data});
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
};

async function addCourseShow(req,res){
    try {
        res.render("pages/add.ejs");
    }catch(err) {
        res.status(400).send({
            status : "fail",
            err : err
        });
    }
};

async function addCourse(req,res){
    try {
        let { name, duration, fees} = req.body;
            console.log("req,body ::::",req.body)
        if(Object.keys(req.body).length == 0) {
            res.status(400).send({
                msg : "Content can not be empty!"
            });
        }
        const newCourse = {
            name : name,
            duration : duration,
            fees : fees
        };
        await Course.create(newCourse);

        let data = await Course.findAll();
        res.status(200).render("pages/home.ejs" , {data : data});

    } catch(err) {
        console.log("err : ", err);
        res.status(400).send({
            status : "process fail in add fucntion..!",
            err : err
        });
    } 
};

async function updateCourseShow(req,res){
    try {
        let course = await Course.findOne({ where : { id : req.query.id }});
        if(course) {
            res.render("pages/update.ejs", { course : course });
        } else {
            res.send("Something went wrong!");
        }
    } catch(err) {
        res.status(400).send({
            status : "fail in update method",
            err : err
        });
    }
};

async function updateCourse(req, res){
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
           await Course.update({
                name : req.body.name,
                duration : req.body.duration,
                fees : req.body.fees
            }, { where : { id : req.body.id }});

            let data = await Course.findAll();
            // res.redirect('/')
            res.status(200).render("pages/home.ejs", { data : data });
            
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
};

async function remove_course(req,res){
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
};



module.exports = {
    find_All, 
    addCourseShow, 
    addCourse, 
    updateCourseShow,
    updateCourse,
    remove_course
}