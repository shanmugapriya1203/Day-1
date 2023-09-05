const express = require("express")
const app = express()
app.use(express.json())

//current date and time
const dt = Date.now();
const date_obj = new Date(dt);
const date = date_obj.getDate();
const month = date_obj.getMonth() + 1;
const year = date_obj.getFullYear();
const time = date_obj.getTime();
const fileName = year + "-" + month + "-" + date + "-" + time;
//content
const timestamp = new Date().toISOString();

//file
const fs = require("fs");
fs.writeFile(`${fileName}.txt`, timestamp, function (err) { console.log("success") });

//read file
let files = [];
fs.readdir("./", function (err, list) { files.push(list) })

//api endpoint
app.get("/", (req, res) => {
    res.json({ Files: { files } });
});

app.listen(3000);