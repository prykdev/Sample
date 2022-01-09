const express = require("express");
const path = require('path')
// const temp = path.join(__dirname,'../views/welcome.ejs')

const router = express.Router();

router.get("/", (req, res) => res.render('welcome'));
module.exports = router;