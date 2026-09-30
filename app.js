require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
require("./src/models/index")
const { dbcon } = require('./src/config/dbcon');
const cookieParser = require("cookie-parser");
const indexrouter = require('./src/router/index')
dbcon();



app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.set("view engine","ejs");
app.set('views',path.join(__dirname,'src','views'));
app.use(cookieParser())

app.use(indexrouter);

const homerouter = require('./src/router/homerouter');
app.use(homerouter);


const port = process.env.PORT;
app.listen(port,()=>{
    console.log(`run this application in ${port} port`);
})