const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config()
const port = process.env.PORT || 8000;


//bringing router

const tradeRoutes = require('./routes/trade');


//app
const app = express();

//database

mongoose.connect(process.env.DATABASE, { 
        useNewUrlParser: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err))

//middlewares
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(express.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//route middlewares
app.use('/api', tradeRoutes);

//cors
if (process.env.NODE_ENV === 'development') {
    const corsOptions ={
        origin:'http://127.0.0.1:5501/', 
        credentials:true,            //access-control-allow-credentials:true
        optionSuccessStatus: 200,
        methods: ["GET", "POST", "PUT", "DELETE"]
    }
    app.use(cors(corsOptions));
}

//port
app.listen(port, () => {
    console.log(`Server started at ${port}`)
})