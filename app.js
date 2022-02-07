const express = require('express');
const bodyParser = require('body-parser');
const path = require("path");
const app = express();
const PORT = 3000;
const router = require("./route"); 
var livereload = require("livereload");
var connectLiveReload = require("connect-livereload");
const sequelize = require('./src/database/connection');

app.set("view engine", 'ejs');
require("./src/database/connection");

app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
app.use("/", router);

app.use('/js', express.static(path.resolve(__dirname, "assets/js")));

const liveReloadServer = livereload.createServer();
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

app.use(connectLiveReload());

// app.listen(PORT, () => {
//     console.log(`post connected:: http://localhost:${PORT}`);
// });

sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`post connected:: http://localhost:${PORT}`);
    });
});