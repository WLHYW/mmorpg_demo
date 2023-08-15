import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
// @ts-ignore
import Crypt from "node-jsencrypt";
import { PrivateKey } from "../common";
const crypt = new Crypt()

crypt.setKey(PrivateKey)

const app = express()

app.use(cors());

app.use(bodyParser.json())

app.post('/register', function (req, res) {
    console.log("req", req.body);
    let { account, password } = req.body;
    account = crypt.decrypt(account);
    password = crypt.decrypt(password);

    console.log("account",account);
    console.log("password",password);

    res.json({});
  })

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(3000)


console.log("auth 服务");
