const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');

dotenv.config();

//db
mongoose.connect(process.env.MONGO_URI,{useNewUrlParser:true})
.then(()=> console.log('DB connected'));

mongoose.connection.on("error",err=>{
    console.log(`DB connection error: ${err.message}`)
})

//bring in route
const postRoutes = require('./routes/post');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

//middleware
app.use(morgan('dev'));
app.use(bodyParser.json())
app.use(cookieParser())
app.use(expressValidator())
app.use("/",postRoutes);
app.use("/",authRoutes);
app.use("/",userRoutes);
app.use(function(err, req, res, next){
    if(err.name==='UnauthorizedError')
        res.status(401).json({error:"Unathorized!"})
})

const port = process.env.PORT || 8080;

app.listen(port,()=> console.log(`server is listening on port : ${port}`))