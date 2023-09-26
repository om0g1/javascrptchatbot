const path = require("path");
const express = require("express");
const ejs = require("ejs");
const natural = require("natural");

const wordTokenizer = new natural.WordTokenizer();

const app = express();

//serve static files from the public directory
app.use(express.static(__dirname + "/public"))

//Parse url and json body
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (request, response) => {
    response.render("index");
})

app.post("/chat", (request, response) => {
    response.send();
})

app.listen(process.env.PORT || 8080, ()=> {
    console.log(`App is available at "http://127.0.0.1"`);
})