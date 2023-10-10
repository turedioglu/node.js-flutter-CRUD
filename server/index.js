//imports
const express = require("express");
const mongoose = require("mongoose");

//imports from other files
const productRouter = require("./routes/product");
//init
const app = express();
const PORT = 3000;
const DB =
  "YOUR DB ADDRESS";
//middleware
app.use(express.json());


// Connections
mongoose
  .connect(DB)
  .then(() => {
    console.log("Connection Successful");
  })
  .catch((e) => {
    console.log(e);
  });

app.listen(PORT, ()=> {
    console.log("Connected to Server" + PORT)
});
