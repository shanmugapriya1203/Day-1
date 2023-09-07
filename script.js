const fs = require("fs");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = 4000;

// Middleware to parse JSON request body
app.use(bodyParser.json());

let fileName; // Define the file name globally

// Create a route for creating a file with inner text
app.post("/createFile", function (req, res) {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Text is required." });
  }

 
  const ts = Date.now();
  const date_ob = new Date(ts);
  const date = date_ob.getDate();
  const month = date_ob.getMonth() + 1;
  const year = date_ob.getFullYear();
  const hour = date_ob.getHours();
  const minute = date_ob.getMinutes();
  const second = date_ob.getSeconds();

  fileName = `${year}-${month}-${date}_${hour}-${minute}-${second}.txt`; 

  // Generate the content with current date and time
  const fileContent = `File created at: ${year}-${month}-${date} ${hour}:${minute}:${second}\n${text}`;

  fs.writeFile(fileName, fileContent, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "File creation failed." });
    }
    console.log(`File '${fileName}' created.`);
    res.status(200).json({ message: `File '${fileName}' created successfully.` });
  });
});

// Create a route for getting the content of the previously created file
app.get("/getFile", function (req, res) {

  if (!fileName) {
    return res.status(404).json({ error: "File not found." });
  }


  fs.readFile(fileName, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "File read failed." });
    }
    res.status(200).json({ content: data });
  });
});

app.listen(PORT, () => console.log(`The server started on port ${PORT}`));
