const { JSON } = require('sequelize');

module.exports = async () => {
    const Course = require('./models/course');
        const errHandler = (err) => {
            console.log("error ::", err);
        }

    const course = await Course.create({
        name: "nodejs",
        duration : 100,
        fees: 10000
    }).catch(errHandler);
    const courses = await Course.findAll({
        where:{name: "nodejs"}
    }).catch(errHandler);
    
    console.log("course_name ::", JSON.stringify(courses));
    
};