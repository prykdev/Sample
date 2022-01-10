const express = require("express");
const router = express.Router();
var bcrypt = require("bcryptjs");
const passport = require('passport');
//User models
const User = require("../modules/user");
//Login page
router.get("/login", (req, res) => res.render("Login"));

//Signup
router.get("/register", (req, res) => res.render("Register"));

//register Handel
router.post("/register", (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  //check required feilds
  if (!name || !email || !password || !password2) {
    errors.push({ msg: "please fill all fields" });
  }
  if (password !== password2) {
    errors.push({ msg: "Password do not match" });
  }
  if (password.length < 6) {
    errors.push({ msg: "password should be atleast 6 characters" });
  }
  if (errors.length > 0) {
    res.render("register", {
      errors,
      name,
      email,
      password,
      password2,
    });
  } else {
    // res.send('pass');
    //Validation passes

    User.findOne({ email: email }).then(
      (user) => {
        if (user) {
          //user exist
          res.render("register", {
            errors,
            name,
            email,
            password,
            password2,
          });
        } else {
          const newUser = new User({
            name,
            email,
            password,
          });
          // console.log(newUser);
          // res.send("hello");
          bcrypt.genSalt(10, (err, salt) =>
            bcrypt.hash(newUser.password, salt, (err,hash) => {
              if (err) throw err;
              //set password to hashed
              newUser.password = hash;
              //save the user
              newUser
                .save()
                .then((user) => {
                  req.flash('success_msg','you are now registerd and can login');
                  res.redirect("/users/login");
                })
                .catch((err) => console.log(err));
            })
          );
        }
      }
      //Hash password
    );
  }
});

//Login Handel 

router.post('./login',(req,res,next)=>{
 passport.authenticate('local',{
  successRedirect:'./dashboard',
  failureRedirect: './users/login',
  successFlash:true
 })(req,res,next);

 })

module.exports = router;
