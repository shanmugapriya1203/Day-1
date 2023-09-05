const fs = require("fs");
const express = require("express");
const app = express();
const PORT = 4000;



let title = () => {
  var timestamp = new Date().toISOString();
  return timestamp;
};

// current timestamp in milliseconds
let ts = Date.now();
let date_ob = new Date(ts);
let date = date_ob.getDate();
let month = date_ob.getMonth() + 1;
let year = date_ob.getFullYear();

let date_time = year + "-" + month + "-" + date;
let body = title();

 
fs.writeFile(`${date_time}.txt`, body, (err) => {
  console.log("Completed");
});


app.get("/getFile", function (request, response) {
  response.send(`Current Date and Time ${body}`);
});

app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));