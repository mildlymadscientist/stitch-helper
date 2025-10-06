//Takes PDF and sends it alongside instructions to OpenAI API
import dotenv from 'dotenv';
dotenv.config();
import OpenAI from 'openai';
import http from 'http';
import express from "express";
import cors from "cors";

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post("/upload", (req, res) => {
    handlePost(req, res);
    console.log("post")
})

const handlePost = function (req, res) {
    // do something that sends data to AI API and then sends info back
    res.end(JSON.stringify("It worked!"))
}

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})