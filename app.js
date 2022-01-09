const express = require("express");
const expressLayouts = require('express');
const path = require('path');
const app = express();

app.use(expressLayouts)

app.set('view engine ','ejs');
app.set('views', path.join(__dirname, './views'));
//Routes
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/user"));

const PORT =  5000;
app.listen(PORT, console.log(`server started on ${PORT}`));
