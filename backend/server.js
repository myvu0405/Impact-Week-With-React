const express = require('express')
require("./config/mongoose")
require('dotenv').config()
const cors = require('cors');

const moment = require('moment');
const cookieParser = require('cookie-parser')

const questionRouter = require('./routers/questionRouter')
const userRouter = require('./routers/userRouter');
const mainRouter = require('./routers/mainRouter');
const answerRouter=require('./Routers/answerRouter')

const {checkUser} = require('./middlewares/authMiddleware')

const app = express()
app.locals.moment = moment;


// app.set('view engine','ejs');

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));//MV: change true -> false
app.use(express.json()); //MV added

app.use(cookieParser());


app.use(cors( {
    origin:['http://localhost:3000'],
    methods:['GET', 'POST', 'DELETE', 'PUT', 'HEAD'],
    preflightContinue:false,
    optionsSuccessStatus:204,
    credentials:true
}));

// routers
app.all('*' , checkUser);
// app.use(questionRouter, userRouter, mainRouter, answerRouter);
app.use(userRouter,questionRouter,answerRouter);

app.listen(5000, () => console.log('Connected to port 5000 ...'));