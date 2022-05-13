const express = require("express");
const app = express();

app.enginer('hmtl', require('ejs').renderFile);
app.set('view enginer', 'ejs');
var path = require('path');
app.set('views'. path.join(__dirname, '/view/'));


bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.list(8081, function() {
    console.log("Servidor funcionando");
})

var consign = require('consign');
consign().include('controller/routes', ).into(app);

