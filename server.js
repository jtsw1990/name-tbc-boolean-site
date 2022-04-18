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
const port = process.env.PORT || 3000;
const methodOverride = require("method-override");
let { IPinfoWrapper } = require("node-ipinfo");
const requestIp = require('request-ip');
const { nextTick } = require('process');

let ipinfo = new IPinfoWrapper(process.env.ipinfoToken);


// Middleware and static file config
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride("_method"))


app.use(requestIp.mw())





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
    question: "Do guns make society safer?" ,
}).then((res) => {
    console.log("document inserted");
}).catch((err) => {
    console.log(err);
})
*/


// Routes
// Randomize the order of questions
app.get("/", async (req, res) => {
    var ip = req.clientIp || null;
    res.send(ip)
    /*
    client_country = await ipinfo.lookupIp(ip).then((response) => {
        if (response.bogon) {
            return "Unknown"
        } else {
            return response.country
        }
    })
    var questions = await Poll.find({});
    questions = shuffle(questions);
    res.render("pages/index", {
        questions: questions,
        country: client_country
    });
    */
})


app.get("/about", (req, res) => {
    res.render("pages/about");
})


app.get("/share_results/:qid/:country/:question", (req, res) => {
    Score.find({ "question_id": req.params.qid })
                .then((result) => {
                    console.log(result)
                    res.render("pages/share_results", {
                        question: req.params.question,
                        result: result
                    })
                }).catch((err) => {
                    console.log(err);
                })
})


app.get("/terms", (req, res) => {
    res.render("pages/terms")
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
        Score.find({ "question_id": score.question_id })
                .then((result) => {
                    res.render("pages/results", {
                        question: req.params.question,
                        question_id: score.question_id,
                        result: result
                    })
                }).catch((err) => {
                    console.log(err);
                })
    }).catch((err) => {
        console.log(err);
    })
})


app.post("/voteno/:qid/:country/:question", (req, res) => {
    console.log("THIS IS CALLED")
    const score = new Score({
        question_id: req.params.qid,
        country: req.params.country
    })
    Score.findOneAndUpdate(
        { $and: [{ "question_id": score.question_id }, { "country": score.country }] },
        { $inc: { "n_count": 1 } },
        { upsert: true, returnNewDocument: true, new: true },
    ).then((result) => {
        Score.find({ "question_id": score.question_id })
                .then((result) => {
                    res.render("pages/results", {
                        question: req.params.question,
                        question_id: score.question_id,
                        result: result
                    })
                }).catch((err) => {
                    console.log(err);
                })
    }).catch((err) => {
        console.log(err);
    })
})


// Fisher-yates shuffling algorithm 
// https://bost.ocks.org/mike/shuffle/
function shuffle(array) {
    var m = array.length, t, i;
    while (m) {
      i = Math.floor(Math.random() * m--);
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
    return array;
  }