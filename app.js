const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const path = require("path");
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

//Passprt config
require("./config/Passport")(passport);


const app = express();
//DB config
const db = require('./config/keys').MongoURI;
mongoose.connect(db,{useNewUrlParser : true})
.then(()=>console.log('mongoDB Connected ... '))
.catch(err => console.log(err));

//Ejs
app.use(expressLayouts);
app.set("view engine", "ejs");

//Bodyparser
app.use(express.urlencoded({extended:false}));

//Express session 
app.use(session({
    secret:'secret',
    resave:true,
    saveUninitialized:true
}));

//Passport middleware
app.use(passport.initialize())
app.use(passport.session())

//connect flash (difffercern color)
app.use(flash());

//global varaible colors
app.use((req,res ,next ) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();

})

//Routes
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/user"));

const PORT = 5000;
app.listen(PORT, console.log(`server started on ${PORT}`));
