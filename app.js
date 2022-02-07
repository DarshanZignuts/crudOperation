const express = require('express');
const bodyParser = require('body-parser');
const path = require("path");
const app = express();
const PORT = 3000;
const router = require("./routes/route"); 
const sequelize = require('./src/database/connection');

app.set("view engine", 'ejs');
require("./src/database/connection");
require("./src/bootstrap");

app.use("/", router);


app.listen(PORT, () => {
    console.log(`post connected:: http://localhost:${PORT}`);
});

// sequelize.sync().then(() => {
//     app.listen(PORT, () => {
//         console.log(`post connected:: http://localhost:${PORT}`);
//     });
// });