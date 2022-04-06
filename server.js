
if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require("express");
var path = require("path");
const mongoose = require("mongoose");
const { MongoClient, ServerApiVersion } = require('mongodb');
const Poll = require("./models/polls");
const Score = require("./models/scores")
const app = express();
const dbURI = process.env.dbURI;
const port = 3000;
const methodOverride = require("method-override");
let { IPinfoWrapper } = require("node-ipinfo");

let ipinfo = new IPinfoWrapper(process.env.ipinfoToken);

// Middleware and static file config
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride("_method"))



// Connect to mongoDB and listen to port
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 })
    .then((result) => app.listen(port, () => {
        console.log(`Listening on port ${port}`);
    }))
    .catch((err) =>
        console.log(err)
    );


// Manual snippet to insert new questions
/*
Poll.create({
    question: "Can people change?" ,
}).then((res) => {
    console.log("document inserted");
}).catch((err) => {
    console.log(err);
})
*/


// Routes
// Randomize the order of questions
app.get("/", async (req, res) => {
    var ip = req.headers['x-forwarded-for'] ||
        req.socket.remoteAddress ||
        null;
    client_country = await ipinfo.lookupIp(ip).then((response) => {
        if (response.bogon) {
            return "Local"
        } else {
            return response.country
        }
    })
    const questions = await Poll.find({})
    res.render("pages/index", {
        questions: questions,
        country: client_country
    });
})



app.post("/voteyes/:qid/:country/:question", (req, res) => {
    const score = new Score({
        question_id: req.params.qid,
        country: req.params.country
    })
    Score.findOneAndUpdate(
        { $and: [{ "question_id": score.question_id }, { "country": score.country }] },
        { $inc: { "y_count": 1 } },
        { upsert: true, returnNewDocument: true, new: true },
    ).then((result) => {
        console.log(result)
        res.render("pages/results", {
            question: req.params.question,
            result: result
        })
    }).catch((err) => {
        console.log(err)
    })
})


app.post("/voteno/:qid/:country/:question", (req, res) => {
    const score = new Score({
        question_id: req.params.qid,
        country: req.params.country
    })
    Score.findOneAndUpdate(
        { $and: [{ "question_id": score.question_id }, { "country": score.country }] },
        { $inc: { "n_count": 1 } },
        { upsert: true, returnNewDocument: true, new: true },
    ).then((result) => {
        console.log(result)
        res.render("pages/results", {
            question: req.params.question,
            result: result
        })
    }).catch((err) => {
        console.log(err)
    })
})


