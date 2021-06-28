const express = require("express");
const app = express();
const path = require("path");
var cons = require('consolidate');
const PORT = process.env.PORT ||8000;

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// view engine setup      Setting the template engine as html
app.engine('html', cons.swig)
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'html');


// Endpoints for the website
// Home page
app.get("/", (req,res)=>{
     res.status(200).render("home.html");
});

// About page
app.get("/about", (req,res)=>{
     res.status(200).render("about.html");
})

// weather page
app.get("/weather", (req,res)=>{
     res.status(200).render("weather.html");
});

// 404 error page 
app.get("*", (req,res)=>{
     res.status(404).render("404.html");
});

app.listen(PORT, ()=>{
     console.log(`listning to port http://localhost:${PORT}`);
})