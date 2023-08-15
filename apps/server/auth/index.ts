import express from "express";
import cors from "cors";
import dayjs from "dayjs";
import mysql from "mysql";
import { createHash } from "crypto";
import bodyParser from "body-parser";
// @ts-ignore
import Crypt from "node-jsencrypt";
import { PrivateKey } from "../common";

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'MysqlRoot',
  database : 'mmodb'
});
 
connection.connect();

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

    const hash = createHash('md5');
    hash.update(password);
    const passwordHash = hash.digest('hex')

    connection.query('insert into user (account, password, created_time) VALUES (?,?,?)',
     [account, passwordHash, dayjs().format('YYYY-MM-DD HH:mm:ss')], 
     function (error, results, fields) {
        if (error) {
          console.log(error);
          return
        }

        console.log(results);
    });

    res.json({});
  })

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(3000)


console.log("auth 服务");
