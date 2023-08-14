import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
const app = express()

app.use(cors());

app.use(bodyParser.json())

app.post('/register', function (req, res) {
    console.log("req", req.body);

    res.json({});
  })

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(3000)


console.log("auth 服务");
