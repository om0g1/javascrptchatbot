const path = require("path");
const express = require("express");
const ejs = require("ejs");
const natural = require("natural");
const { copyFileSync } = require("fs");
const rules = require("./rules.js").rules;

const wordTokenizer = new natural.WordTokenizer();

const app = express();

//serve static files from the public directory
app.use(express.static(__dirname + "/public"))

//Parse url and json body
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

function generateResponse(input) {
    for (const rule of rules) {
        const tokens = wordTokenizer.tokenize(rule.pattern);
        if (natural.JaroWinklerDistance(input, tokens.join(' ')) > 0.8) {
            return rule.response;
        }
    }
    return "I'm not sure how to respond to that";
}

app.get("/", (request, response) => {
    response.render("index");
})

app.post("/chat", (request, response) => {
    const userMessage = request.body.message;
    console.log(userMessage);
    const botResponse = generateResponse(userMessage);
    response.json({response : botResponse});
})

app.listen(process.env.PORT || 8080, ()=> {
    console.log(`App is available at "http://127.0.0.1"`);
})