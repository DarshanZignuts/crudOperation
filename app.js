const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;
const router = require("./route"); 
const sequelize = require('./src/database/connection');

app.set("view engine", 'ejs');
require("./src/database/connection");

app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
app.use("/", router);

// app.listen(PORT, () => {
//     console.log(`post connected:: http://localhost:${PORT}`);
// });

sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`post connected:: http://localhost:${PORT}`);
    });
});